const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.Promise = Promise; 
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));


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
