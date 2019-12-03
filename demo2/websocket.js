var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(80)

app.get('/', function (req, res) {
    //   res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected')
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        // io.emit('chat message',msg)
        socket.broadcast.emit('chat message',msg);
    });
})
var chat=io.of('/chat').on('connection',function(socket){
    console.log('chat can begin')
    socket.join('chatroom')
    socket.on('chat message',function(msg){
        chat.emit('chat message',msg)
    })
    
})
http.listen(3000, function () {
    console.log('listening on *:3000');
});