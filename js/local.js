let Local=function(socket){
    let game;
    let INTERVAL=500;
    let time=0,score=0;
    // 绑定键盘事件
    let bindkeyEvent=function(){
        console.log('bindkeyEvent')
        document.onkeydown=function(e){
            if(e.keyCode==38){//up
                game.rotate();
                socket.emit('rotate')
            }else if(e.keyCode==39){//right
                game.right()
                socket.emit('right')

            }else if(e.keyCode==40){//down
                game.down()
                socket.emit('down')

            }else if(e.keyCode==37){//left
                socket.emit('left')
                game.left()

            }else if(e.keyCode==32){//space
                game.fall()
                socket.emit('fall')

            }
        }
    }
    
    let move=function(){
        time+=INTERVAL;
        game.setTime(time)
        socket.emit('setTime',time)
        if(!game.down()){
            game.fixed();
            socket.emit('fixed')
            const line=game.checkClear();
            game.setScore(line)
            socket.emit('checkClear')
            socket.emit('setScore',line)
            if(game.checkGameOver()){
                stop()
                socket.emit('stop')
            }
            let type=generateType(),dir=generateDir()
            game.performNext(type,dir)
            socket.emit('performNext',{type,dir})
        }
        // if(time%1500==0){
        //     game.addTailLines(generateBottomLine(1))
        // }
        
    }
    // 随机生成方块种类
    let generateType=function(){
        return Math.ceil(Math.random()*7)-1
    }
    // 随机生成旋转次数
    let generateDir=function(){
        return Math.ceil(Math.random()*4)-1
    }

    // 随机生成干扰行
    let generateBottomLine=function(lineNum){
        let lines=[]
        for(let i=0;i<lineNum;i++){
            let line=[];
            for(let j=0;j<10;j++){
                line.push(Math.ceil(Math.random()*2)-1)
            }
            lines.push(line)
        }
        return lines
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
            gameDiv:document.getElementById('local_game'),
            nextDiv:document.getElementById('local_next'),
            timeDiv:document.getElementById('local_time'),
            scoreDiv:document.getElementById('local_score'),
        }
        game= new Game();
        let dir=generateDir();
        let type=generateType();
        socket.emit('start',{type,dir})
        game.init(doms,type,dir);
        bindkeyEvent();
        let type2=generateType(),dir2=generateDir()
        game.performNext(type2,dir2)
        socket.emit('performNext',{type:type2,dir:dir2})

        timer=setInterval(move,INTERVAL)
    }
    this.start=start;
}