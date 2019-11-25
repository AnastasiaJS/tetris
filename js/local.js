let Local=function(){
    let game;
    let INTERVAL=500;
    let time=0,score=0;
    // 绑定键盘事件
    let bindkeyEvent=function(){
        document.onkeydown=function(e){
            if(e.keyCode==38){//up
                game.rotate()
            }else if(e.keyCode==39){//right
                game.right()
            }else if(e.keyCode==40){//down
                game.down()
            }else if(e.keyCode==37){//left
                game.left()
            }else if(e.keyCode==32){//space
                game.fall()
            }
        }
    }
    
    let move=function(){
        time+=INTERVAL;
        game.setTime(time)
        if(!game.down()){
            game.fixed();
            const line=game.checkClear();
            game.setScore(line)
            if(game.checkGameOver()){
                stop()
            }
            game.performNext(generateType(),generateDir())
        }
        
    }
    // 随机生成方块种类
    let generateType=function(){
        return Math.ceil(Math.random()*7)-1
    }
    // 随机生成旋转次数
    let generateDir=function(){
        return Math.ceil(Math.random()*4)-1
    }

    let stop=function(){
        
        if(timer){
            clearInterval(timer);
            timer=null;
            alert('Game Over!')
        }
        return;
    }
    let start=function(){
        let doms={
            gameDiv:document.getElementById('game'),
            nextDiv:document.getElementById('next'),
            timeDiv:document.getElementById('time'),
            scoreDiv:document.getElementById('score'),
        }
        game= new Game();
        game.init(doms,generateType(),generateDir());
        bindkeyEvent();
        game.performNext(generateType(),generateDir())
        timer=setInterval(move,INTERVAL)
    }
    this.start=start;
}