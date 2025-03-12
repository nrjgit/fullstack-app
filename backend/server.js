const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API Route Example
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// Serve React Static Files
// Ye code aapko add karna hai:
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
