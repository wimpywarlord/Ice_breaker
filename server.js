const express = require("express")
const app = express();
const server = require("http").Server(app)
const io = require("socket.io")(server)
const { v4:uuidV4 } =require('uuid');
const { Socket } = require("dgram");

app.set('view engine', 'ejs')
app.use(express.static('public'))

// console.log(uuidV4())


app.get("/",(req,res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room',(req,res) => {
    res.render('room', { roomId : req.params.room})
})


io.on("connection", socket => (
    socket.on("join-room",(roomId,userId) => {
        console.log(userId,roomId)
        socket.join(roomId)
        socket.to(roomId).broadcast.emit("user-connected")
    })
))


server.listen(5000, function () {
    console.log("SERVER 5000 HAS STARTED");
});
