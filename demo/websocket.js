var ws = require("nodejs-websocket")
var PORT= 3000
var clientCount=0
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection",conn);
    clientCount++;
    conn.nickname='user'+clientCount;
    var mes={
        type:'enter',
        data:conn.nickname+' comes in'
    }
    broadcast(JSON.stringify(mes))
    conn.on("text", function (str) {
        console.log("Received "+str)
        mes={
            type:'message',
            data:conn.nickname+' says:'+str
        }
        broadcast(JSON.stringify(mes))
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        mes={
            type:'leave',
            data:conn.nickname+' left'
        }
        broadcast(JSON.stringify(mes))
    })
    conn.on("error", function (err) {
        console.log("handle error")
        console.log(err)
    })
}).listen(PORT)
console.log('websocket server listeningon port'+PORT)

function broadcast(mes){
    server.connections.forEach(function(connection){
        connection.sendText(mes)
    })
}