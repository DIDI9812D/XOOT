const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

let servers = [];

app.use(express.static('public'));

app.get('/servers', (req, res) => {
    res.json(servers);
});

io.on('connection', socket => {
    console.log('New client connected');

    socket.on('createServer', name => {
        servers.push({ id: socket.id, name: name });
        io.emit('serverList', servers);
    });

    socket.on('disconnect', () => {
        servers = servers.filter(server => server.id !== socket.id);
        io.emit('serverList', servers);
    });

    // Game logic here
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
