const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.resolve(__dirname, 'user.json');
const CACHE_DURATION = 10 * 1000;
let cache = {};
if (fs.existsSync(CACHE_FILE)) {
    try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (error) {
    console.error('Failed to load cache:', error);
  }
}

function saveCacheToFile() {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.error('Failed to save cache:', error);
  }
     
  }

module.exports = {
  get(key) {
    const cached = cache[key];
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    return null;
  },
   set(key, data) {
    cache[key] = {
      data,
      timestamp: Date.now(),
    };
    saveCacheToFile();
    setTimeout(() => {
      if (cache[key] && Date.now() - cache[key].timestamp >= CACHE_DURATION) {
        delete cache[key];
        console.log(`Cache for key "${key}" cleared automatically.`);
        saveCacheToFile(); 
      }
    }, CACHE_DURATION);
  },
};
