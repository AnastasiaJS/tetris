let Square = function(){
    // 方块数据
    this.data=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ];
    // 原点
    this.origin={
        x:0,
        y:20
    }
    this.dir=0
}
Square.prototype.canDown=function(isValid){
    let test={};
    test.x=this.origin.x+1;
    test.y=this.origin.y;
    return isValid(test,this.data)
}
Square.prototype.domn=function(){
    this.origin.x=this.origin.x+1;
}
Square.prototype.canRight=function(isValid){
    let test={};
    test.x=this.origin.x;
    test.y=this.origin.y+1;
    return isValid(test,this.data)
}
Square.prototype.right=function(){
    this.origin.y=this.origin.y+1;
}
Square.prototype.canLeft=function(isValid){
    let test={};
    test.x=this.origin.x;
    test.y=this.origin.y-1;
    return isValid(test,this.data)
}
Square.prototype.left=function(){
    this.origin.y=this.origin.y-1;
}
Square.prototype.canRotate=function(isValid){
    let d=(this.dir+1)%4;
    return isValid(this.origin,this.rotates[d])
}
Square.prototype.rotate=function(num){
    if(!num) num=1;
    this.dir=(this.dir+num)%4;
    for(let i=0;i<this.data.length;i++){
        for(let j=0;j<this.data[0].length;j++){
            this.data[i][j]=this.rotates[this.dir][i][j]
        }
    }
}