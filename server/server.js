import express from 'express'
import { Server } from 'socket.io';
import {createServer} from 'http'

const app = express();
const PORT = 8000;
const server = createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
        credentials:true
    }
})

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

let users=[]
io.on("connection",(socket)=>{

    console.log("Id", socket.id)

    socket.emit("current-users", users);

    socket.on("user-joined",userData=>{
        users.push({id:userData.id,name:userData.name})
        socket.broadcast.emit("new-user-joined", { id: userData.id, name: userData.name });
    })

    socket.on("disconnect",userData=>{
        users = users.filter(item => item.id !== userData.id); // Remove the disconnected user from the users array
        io.emit("user-disconnected", socket.id);
    })

})

server.listen(PORT,()=>{
    console.log(`server is running on localhost:${PORT}`)
})