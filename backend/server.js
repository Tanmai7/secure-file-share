const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // to serve files

// Dummy user for login (replace with DB later)
const dummyUser = {
  email: 'test@example.com',
  password: '123456'
};

// ================== ROUTES ===================

// POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === dummyUser.email && password === dummyUser.password) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage });

// POST /upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileInfo = {
    originalName: req.file.originalname,
    uploadedName: req.file.filename,
    path: `/uploads/${req.file.filename}`,
    id: req.file.filename
  };

  res.status(200).json({
    message: 'File uploaded successfully',
    file: fileInfo
  });
});

// GET /download/:fileId
app.get('/download/:fileId', (req, res) => {
  const fileId = req.params.fileId;
  const filePath = path.join(__dirname, 'uploads', fileId);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

// Server listener
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
