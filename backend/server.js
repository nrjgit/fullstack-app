const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); 
const https = require('https');
const querystring = require('querystring');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function (req, res, next) {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.header("Access-Control-Allow-Origin", "https://google-signin-app.onrender.com http://localhost:3000"); // Update this
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.Promise = Promise; 
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));


// API Route Example
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});


const fromNumber = process.env.TWILIO_PHONE_NUMBER;

app.post('/send-text', (req, res) => {
  const { phoneNumber, name, address1 } = req.body;
  
  const postData = querystring.stringify({
    To: `+91${phoneNumber}`,
    From: `+1${fromNumber}`,
    Body: `Your parking Spot: ${name}, available at ${address1}`,
  });

  const options = {
    hostname: process.env.TWILIO_HOSTNAME,
    path: process.env.TWILIO_PATH,
    method: 'POST',
    auth: `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };

  const twilioReq = https.request(options, (twilioRes) => {
    twilioRes.on('data', (d) => res.send({ ok: true, response: JSON.parse(d) }));
  });

  twilioReq.on('error', () => res.status(500).send({ error: 'Failed to send SMS' }));
  twilioReq.write(postData);
  twilioReq.end();
});


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
