
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

// Express app yaratish
const app = express();

// HTTP serverni yaratish
const server = http.createServer(app);

// Socket.IO serverni ulash
const io = new Server(server);

// Klient ulanishni tinglash
io.on('connection', (socket) => {
    console.log('Foydalanuvchi ulandi:', socket.id);

    socket.on('disconnect', () => {
        console.log('Foydalanuvchi uzildi:', socket.id);
    });
});

// Serverni ishga tushirish
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} manzilida ishlamoqda`);
});

// const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const messagesRoute = require('./routes/messagesRoute');  // Routerni to'g'ri import qilish
const path = require('path');
// const { Server } = require('socket.io');

// const app = express();
// const port = 3000;
// const io = new Server(server);

const path = require('path'); // Path modulini import qilish
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('a user connected');
});

// // CORSni yoqish
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// // Static fayllarni ko'rsatish (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// // JSON formatida so'rovlarni qabul qilish
app.use(bodyParser.json());

// // Routerni qo'shish
app.use('/api/messages', messagesRoute);  // Routerni to'g'ri yo'naltirish


// // Serverni ishga tushirish
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

