require('dotenv').config();           // Load environment variables from .env
const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth'); // Adjust path if needed
const path = require('path');

const app = express();

app.use(express.json()); // for parsing application/json

// Multer config for storing uploads in /uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Upload route - only authorized users can upload
app.post('/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  res.status(200).json({
    message: "File uploaded successfully.",
    filename: req.file.filename
  });
});

// Start server on port from env or 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//