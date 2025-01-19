const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const messagesRoute = require('./routes/messagesRoute');  // Routerni to'g'ri import qilish
const path = require('path');

const app = express();
const port = 3000;

// CORSni yoqish
app.use(cors());

// Static fayllarni ko'rsatish (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// JSON formatida so'rovlarni qabul qilish
app.use(bodyParser.json());

// Routerni qo'shish
app.use('/api/messages', messagesRoute);  // Routerni to'g'ri yo'naltirish

// Serverni ishga tushirish
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});