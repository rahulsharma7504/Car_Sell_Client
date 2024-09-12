const socket=require('socket.io');

const Io=(io)=>{
    io.on('connection',(socket)=>{
        console.log('New user connected');



        socket.on('disconnect',()=>{
            console.log('User disconnected');
        });
    });
    
}
module.exports={Io}