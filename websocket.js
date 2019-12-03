var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(80)


var playNum=0

// 设置跨域访问，方便开发

app.all('*', function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*'); //*代表可访问的地址，可以设置指定域名
  
    res.header('Access-Control-Allow-Methods:POST,GET');
  
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
    // next();
  
  });


// app.get('/', function (req, res) {
//     //   res.send('<h1>Hello world</h1>');
//     res.sendFile(__dirname + '/index.html');
//     // res.render('index.html');
// });

io.on('connection', function (socket) {
    playNum++;

    console.log('a user connected',playNum);
    if(playNum%2==0){
        socket.emit('start game','game starts')
    }
    socket.on('start',function(data){
        console.log(data)
        socket.emit('start',data)
    })
    socket.on('disconnect', function () {
        playNum--
        console.log('user disconnected',playNum);
    });
    socket.on('add line', function (lines) {
        console.log('add line: ' + lines);
        // io.emit('chat message',msg)
        socket.broadcast.emit('add line',lines);
    });
    socket.on('rotate',function(){
        socket.broadcast.emit('rotate','rotate')
    })
    socket.on('right',function(){
        socket.broadcast.emit('right','')
    })
    socket.on('down',function(){
        socket.broadcast.emit('down','')
    })
    socket.on('left',function(){
        socket.broadcast.emit('left','left')
    })
    socket.on('fall',function(){
        socket.broadcast.emit('fall','')
    })
    socket.on('fixed',function(){
        socket.broadcast.emit('fixed','')
    })
    socket.on('setScore',function(){
        socket.broadcast.emit('setScore','')
    })
    socket.on('stop',function(){
        socket.broadcast.emit('stop','')
    })
    socket.on('performNext',function(data){
        socket.broadcast.emit('performNext',data)
    })
    socket.on('addTailLines',function(data){
        socket.broadcast.emit('addTailLines',data)
    })
    socket.on('checkClear',function(data){
        socket.broadcast.emit('checkClear',data)
    })
    socket.on('checkGameOver',function(data){
        socket.broadcast.emit('checkGameOver',data)
    })
    socket.on('setScore',function(data){
        socket.broadcast.emit('setScore',data)
    })
    socket.on('setTime',function(data){
        socket.broadcast.emit('setTime',data)
    })

})
http.listen(3000, function () {
    console.log('listening on *:3000');
});