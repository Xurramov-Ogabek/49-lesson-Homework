// window.onload = function() {
// 	if (!localStorage.getItem('username')) {
// 	  const username = prompt('Iltimos, username kiriting:');
// 	  localStorage.setItem('username', username);
// 	}
// 	document.getElementById('username').innerText = localStorage.getItem('username');
// 	fetchMessages(); // Yangi xabar yuborilganda barcha xabarlarni yuklash
//   };
  
//   function sendMessage() {
// 	const username = localStorage.getItem('username');
// 	const message = document.getElementById('message').value;
  
// 	if (message === '') {
// 	  alert('Iltimos, xabarni kiriting!');
// 	  return;
// 	}
  
// 	fetch('http://localhost:3000/api/messages/send-message', {
// 	  method: 'POST',
// 	  headers: {
// 		'Content-Type': 'application/json',
// 	  },
// 	  body: JSON.stringify({ username, message }),
// 	})
// 	.then(response => response.json())
// 	.then(data => {
// 	  alert('Xabar muvaffaqiyatli yuborildi!');
// 	  document.getElementById('message').value = '';  // Xabarni yuborganidan so'ng, inputni tozalash
// 	  fetchMessages(); // Xabar yuborilgandan so'ng barcha xabarlarni yangilash
// 	})
// 	.catch(error => {
// 	  alert('Xatolik yuz berdi: ' + error.message);
// 	});
//   }
  
//   function fetchMessages() {
// 	fetch('http://localhost:3000/api/messages')
// 	  .then(response => response.json())
// 	  .then(data => {
// 		const messageContainer = document.getElementById('message-container');
// 		messageContainer.innerHTML = ''; // Eslatma: eski xabarlarni o'chirib, yangi xabarlarni ko'rsatish
// 		data.forEach(msg => {
// 		  const messageElement = document.createElement('div');
// 		  messageElement.classList.add('message');
// 		  if (msg.username === localStorage.getItem('username')) {
// 			messageElement.classList.add('username');
// 		  }
// 		  messageElement.innerHTML = `
// 			<strong>${msg.username}</strong>: ${msg.message}
// 			<div class="timestamp">Yuborilgan: ${new Date(msg.timestamp).toLocaleString()}</div>
// 		  `;
// 		  messageContainer.appendChild(messageElement);
// 		});
// 	  });
//   }

function sendMessage() {
	const username = localStorage.getItem('username');
	const message = document.getElementById('message').value;
  
	if (message === '') {
	  alert('Iltimos, xabarni kiriting!');
	  return;
	}
  
	fetch('http://localhost:3000/api/messages/send-message', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ username, message }),
	})
	.then(response => response.json())  // Javobni JSON formatida olish
	.then(data => {
	  if (data.message) {
		alert(data.message);  // Xabar muvaffaqiyatli saqlandi
		document.getElementById('message').value = '';  // Xabarni yuborganidan so'ng, inputni tozalash
		fetchMessages(); // Xabar yuborilgandan so'ng barcha xabarlarni yangilash
	  }
	})
	.catch(error => {
	  alert('Xatolik yuz berdi: ' + error.message);
	});
  }

  io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
	  console.log('user disconnected');
	});
  });

  io.on('connection', (socket) => {
	socket.on('chat message', (msg) => {
	  io.emit('chat message', msg);
	});
  });