const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors()); // Allow frontend to access the backend
app.use(express.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, "frontend")));

// Connect to SQLite database
const db = new sqlite3.Database("./items.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// API endpoint to get all items
app.get("/api/items", (req, res) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
