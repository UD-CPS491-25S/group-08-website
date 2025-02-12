const express = require("express");
const path = require("path");
const database = require("./database");  // Import the functions from database.js
const app = express();

// Serve static files (e.g., index.html, frontend.js)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch items from the database
app.get("/items", async (req, res) => {
  try {
    const items = await database.getItems();  // Get items from the database
    res.json(items);  // Send the data as JSON response
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Error fetching items from the database.");
  }
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
