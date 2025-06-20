const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  console.log('Received:', email, password);
  res.status(200).json({ message: 'User registered successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
