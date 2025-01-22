const fs = require('fs');

exports.sendMessage = (req, res) => {
  const { username, message } = req.body;
  const timestamp = new Date().toISOString(); 

  const newMessage = {
    username,
    message,
    timestamp
  };

  fs.readFile('user.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading the data.' });
    }

    let messages = JSON.parse(data);
    messages.push(newMessage);

    fs.writeFile('user.json', JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error writing the message.' });
      }
      res.status(200).json({ message: 'Message saved!' });
    });
  });
};

exports.getMessages = (req, res) => {
  fs.readFile('user.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading the data.' });
    }
    res.json(JSON.parse(data));
  });
}