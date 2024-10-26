import { Server } from 'socket.io';

const initSocket = (httpServer) => {
        
    const io = new Server(httpServer);

    io.on('connection', socket => {
        console.log(`Client connected, id ${socket.id} from ${socket.handshake.address}`);
        
        socket.on('disconnect', reason => {
            console.log(reason);
        });
    });

    return io;
}

export default initSocket;