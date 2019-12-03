var socket=io('http://localhost')
// var socket=io()
let local=new Local(socket);
let remote=new Remote(socket);
socket.on('start game',function(data){
    console.log(data)
    // alert('there is a player come in,game starts!')
    local.start();
    // remote.start();
    // remote.bindkeyEvent()
    socket.on('start',function(data){
        console.log(data)
        remote.start(data.type,data.dir);
    })
})