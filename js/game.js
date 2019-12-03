let Game=function(){
    // dom元素
    let gameDiv;
    let nextDiv;
    let timeDiv;
    let scoreDiv;

    let score=0;
    let gameData=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];

    // divs
    let nextDivs=[];
    let gameDivs=[];
    // 初始化div
    let initDiv=function(container,data,divs){
        for(let i=0;i<data.length;i++){
            let div=[];
            for(let j=0;j<data[0].length;j++){
                let newNode=document.createElement('div');
                newNode.className='none';
                newNode.style.top=(i*20)+'px';
                newNode.style.left=(j*20)+'px';
                container.appendChild(newNode);
                div.push(newNode)
            }
            divs.push(div)
        }
    }

    let refreshDiv=function(data,divs){
        for(let i=0;i<data.length;i++){
            for(let j=0;j<data[i].length;j++){
                if(data[i][j]==0){
                    divs[i][j].className='none'
                }else if(data[i][j]==1){
                    divs[i][j].className='done'
                }else if(data[i][j]==2){
                    divs[i][j].className='current'
                }
            }
        }
    }

    // 检验位置是否合法
    let check =function(pos,x,y){
        if(pos.x+x<0){
            return false;
        }else if(pos.x+x>=gameData.length){
            return false
        }else if(pos.y+y<0){
            return false
        }else if(pos.y+y>=gameData[0].length){
            return false
        }else if(gameData[pos.x+x][pos.y+y]==1){
            return false
        }else{
            return true
        }
    }
    // 检测是否合法
    let isValid=function(pos,data){
        for(let i=0;i<data.length;i++){
            for(let j=0;j<data[0].length;j++){
                if(data[i][j]!==0){
                    if(!check(pos,i,j)){
                        return false;
                    }
                }
            }
        }
        return true
    }
    // 清除数据
    let clearData=function(){
        for(let i=0;i<cur.data.length;i++){
            for(let j=0;j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x+i][cur.origin.y+j]=0
                }else{
                    break;
                }
            }
        }
    }
    // 设置数据
    let setData=function(){
        for(let i=0;i<cur.data.length;i++){
            for(let j=0;j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x+i][cur.origin.y+j]=cur.data[i][j]
                }
            }
        }
    }
    // 下移
    let down=function(){
        if(cur.canDown(isValid)){
            clearData();
            cur.domn()
            setData();
            refreshDiv(gameData,gameDivs);
            return true
        }else{
            return false
        }
    }
    // 右移
    let right=function(){
        if(cur.canRight(isValid)){
            clearData();
            cur.right()
            setData();
            refreshDiv(gameData,gameDivs)
        }
    }
    // 左移
    let left=function(){
        if(cur.canLeft(isValid)){
            clearData();
            cur.left()
            setData();
            refreshDiv(gameData,gameDivs)
        }
    }
    // 旋转
    let rotate=function(){
        if(cur.canRotate(isValid)){
            clearData();
            cur.rotate()
            setData();
            refreshDiv(gameData,gameDivs)
        }
    }
    let fixed=function(){
        for(let i=0;i<cur.data.length;i++){
            for(let j=0;j<cur.data[0].length;j++){
                if(check(cur.origin,i,j)){
                    if(gameData[cur.origin.x+i][cur.origin.y+j]==2)
                        gameData[cur.origin.x+i][cur.origin.y+j]=1
                }
            }
        }
        refreshDiv(gameData,gameDivs)
        
    }
    let setTime=function(time){
        timeDiv.innerHTML=Math.ceil(time/1000)
    }
    let setScore=function(line){
        let s=0;
        switch(line){
            case 1:s=10;break;
            case 2:s=30;break;
            case 3:s=60;break;
            case 4:s=100;break;
        }
        score+=s
        scoreDiv.innerHTML=score
    }
    let checkGameOver=function(){
        return gameData[1].find(data=>data==1)
    }
    // 消除行
    let checkClear=function(){
        let line=0;
        for(let i=gameData.length-1;i>=0;i--){
            let clear=true;
            for(let j=0;j<gameData[0].length;j++){
                if(gameData[i][j]!==1){
                    clear=false;
                    break
                }
            }
            if(clear){
                line++;
                for(let m=i;m>0;m--){
                    for(let n=0;n<gameData[0].length;n++){
                        gameData[m][n]=gameData[m-1][n]
                    }
                }
                for(let n=0;n<gameData[0].length;n++){
                    gameData[0][n]=0
                }
                i++;

            }
        }
        return line;
    }
    let performNext=function(type,dir){
        cur=next;
        setData();
        next=SquareFactory.prototype.make(type,dir);
        refreshDiv(gameData,gameDivs)
        refreshDiv(next.data,nextDivs)
        
    }

    let addTailLines=function(lines){
        for(let i=0;i<gameData.length-lines.length;i++){
            gameData[i]=gameData[i+lines.length];
        }
        for(let i=0;i<lines.length;i++){
            gameData[gameData.length-lines.length+i]=lines[i];
        }
        cur.origin.x=cur.origin.x-lines.length;
        if(cur.origin.x<0){
            cur.origin.x=0
        }
        refreshDiv(gameData,gameDivs)
    }
    let init = function(doms,type,dir){
        gameDiv=doms.gameDiv;
        nextDiv=doms.nextDiv;
        timeDiv=doms.timeDiv;
        scoreDiv=doms.scoreDiv;
        setScore=doms.setScore;
        next = SquareFactory.prototype.make(type,dir);
        initDiv(gameDiv,gameData,gameDivs)
        initDiv(nextDiv,next.data,nextDivs)
        refreshDiv(next.data,nextDivs)
    }

    this.init=init;
    this.down=down;
    this.left=left;
    this.right=right;
    this.rotate=rotate;
    this.fall=function(){while(down()){}}
    this.fixed=fixed;
    this.performNext=performNext;
    this.checkClear=checkClear;
    this.checkGameOver=checkGameOver;
    this.setTime=setTime;
    this.setScore=setScore;
    this.addTailLines=addTailLines;
}