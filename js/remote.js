let Remote=function(socket){
    let game;
    let bindkeyEvent=function(){
        socket.on('rotate',function(){
            game.rotate()
        })
        socket.on('right',function(){
            game.right()
        })
        socket.on('down',function(){
            game.down();
        })
        socket.on('left',function(){
            game.left()
        })
        socket.on('fall',function(){
            game.fall()
        })
        socket.on('performNext',function(data){
            game.performNext(data.type,data.dir)
        })
        socket.on('fixed',function(data){
            game.fixed()
        })
        socket.on('checkClear',function(data){
            game.checkClear()
        })
        socket.on('checkGameOver',function(data){
            game.checkGameOver()
        })
        socket.on('setTime',function(data){
            game.setTime(data)
        })
        socket.on('setScore',function(data){
            game.setScore(data)
        })
        socket.on('addTailLines',function(data){
            game.addTailLines()
        })
    }
    let start=function(type,dir){
        let doms={
            gameDiv:document.getElementById('remote_game'),
            nextDiv:document.getElementById('remote_next'),
            timeDiv:document.getElementById('remote_time'),
            scoreDiv:document.getElementById('remote_score'),
        }
        game= new Game();
        game.init(doms,type,dir);
        bindkeyEvent();
        // socket.on('move',function(){
        //     game.move()
        // })
        // game.performNext(type,dir)
        // timer=setInterval(move,INTERVAL)
    }
    this.start=start;
    this.bindkeyEvent=bindkeyEvent;
}