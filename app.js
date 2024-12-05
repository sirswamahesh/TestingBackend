const express = require("express");
const postsRoute = require("./routes/postsRoute");

const app = express();

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working",
  });
});
// Routes
app.use("/api", postsRoute);

// Error handling
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

module.exports = app;
