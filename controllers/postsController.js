const axios = require("axios");
const cacheService = require("../services/cacheService");

const getPosts = async (req, res) => {
  const cacheKey = "posts";

  // Check cache first
  const cachedData = cacheService.get(cacheKey);
  if (cachedData) {
    return res.status(200).json({
      success: true,
      source: "cache",
      data: cachedData,
    });
  }

  try {
    // Fetch data using Axios
    const { data: posts } = await axios.get("https://jsonplaceholder.typicode.com/posts");

    // Store fetched data in cache
    cacheService.set(cacheKey, posts);

    return res.status(200).json({
      success: true,
      source: "api",
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts.",
      error: error.message,
    });
  }
};

module.exports = { getPosts };