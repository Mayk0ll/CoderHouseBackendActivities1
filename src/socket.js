// socket.js

export default function socketHandler(socketServer) {
    socketServer.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.emit('welcome', `Bienvenido cliente, estás conectado con el id ${socket.id}`);

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
}
