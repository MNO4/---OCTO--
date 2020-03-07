var board = new Array();//2048数组
var score = 0;
var max_score = 0;
var check_boom= new Array();//4*4初始化，游戏进行的同时 会记录每个小格子 是否发生过碰撞
var over_flag = 0;
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
//2048规则 碰撞过一次的数字，一次移动只能叠加一次 ，//在同一次移动中不能继续碰撞（叠加，
//比如 2 2 4 8 -> 4 4 8 0 （左移的情况下
//而我们编写的代码逻辑 会变成 2248 -> 16 0 0 0 ，如果数字相同 会连续碰撞 （左移的情况下

    
$(document).ready(function(){
    prepareForMobile();//
    newGame();
});//?:JQ事件- ready() 

function prepareForMobile(){

    if( documentWidth > 500 ){
        gridContainerWidth = 483;
        cellSpace = 15;
        cellSideLength = 102;
    }

    $("#grid_container").css('width',gridContainerWidth - 2*cellSpace);
    $("#grid_container").css('height',gridContainerWidth - 2*cellSpace);
    $("#grid_container").css('padding',cellSpace);
    $("#grid_container").css('border-radius',6);

    $(".grid_cell").css('width',cellSideLength);
    $(".grid_cell").css('height',cellSideLength);
    $(".grid_cell").css('border-radius',5);
}
function newGame(){
    //初始化棋盘
    init();
    //生成2个随机数
    random_Number();
    random_Number();
}

function init(){
    var i,j;
    
    //初始化4*4个方块
    for(i = 0;i<4;i++){
        for(j = 0;j<4;j++){
            var gridCell = $("#grid_cell_"+i+"-"+j);//?:$语句
            gridCell.css('top',getPosTop(i,j));//?:JQ css()方法 
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    //初始化数组
    for(i = 0;i<4;i++){
        board[i] = new Array();
        check_boom[i] = new Array();
        for(j = 0;j<4;j++){
            board[i][j] = 0;
            check_boom[i][j] = false;
        }
    }
    score = 0;
    over_flag = 0;
    $("#over_cell").remove();//清除 “GameOver”
    updateScore(score,max_score);
    upDateBoardView();
}

function upDateBoardView()
{

    $(".number_cell").remove();//?jq:移除事件
   
    for(i = 0;i<4;i++){
        for(j = 0;j<4;j++){
             $("#grid_container").append('<div class="number_cell" id="number_cell_'+i+'-'+j+'"></div>');//?:JQ append() 
            var theNumberCell = $('#number_cell_'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
            }
            else{
                theNumberCell.css('width',cellSideLength);//小方块大小
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBgColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            check_boom[i][j] = false;
        }
    }
    $('.number_cell').css('line-height',cellSideLength + 'px');
    $('.number_cell').css('font-size',0.6*cellSideLength + 'px');
}

//生成一个随机位置的随机数
function random_Number(){

    if(nospace(board)){//判断是否有空余格子
        return false;
    }
/* 减少循环次数 当循环50次都找不到 空余位置 找到最近的那一个空方块
    var randx =parseInt( Math.floor( Math.random()  * 4 ) );
    var randy =parseInt( Math.floor( Math.random()  * 4 ) );

 var times = 0;
    while( times < 50 ){
        if( board[randx][randy] == 0 )
            break;

        randx = parseInt( Math.floor( Math.random()  * 4 ) );
        randy = parseInt( Math.floor( Math.random()  * 4 ) );

        times ++;
    }
    if( times == 50 ){
        for( var i = 0 ; i < 4 ; i ++ )
            for( var j = 0 ; j < 4 ; j ++ ){
                if( board[i][j] == 0 ){
                    randx = i;
                    randy = j;
                }
            }
    }*/
    //随机位置 在剩余空格内随机 减少循环次数，提高执行效率+
    randx = parseInt( Math.floor( Math.random()  * 4 ) );
    randy = parseInt( Math.floor( Math.random()  * 4 ) );
    var surplus_board = new Array();//保持剩下的空格位置
    var count = 0;
    for(var i = 0;i<4; i++){
        for(var j =0;j<4;j++){
            if(board[i][j] == 0){
                surplus_board[count] = i*4+j;
                count++;
            }
        }
        var pos  = parseInt(Math.floor(Math.random() * count));
         randx = Math.floor(surplus_board[pos]/4);
         randy = Math.floor(surplus_board[pos]%4);
    }
    //随机数字 2、4
    var randNumder = Math.random() < 0.5 ? 2:4;
    //随机位置and数字
    board[randx][randy]  = randNumder;
    random_Number_Cartoon(randx,randy,randNumder);
    return true;
}

$(document).keydown(function(event){

    switch(event.keyCode)
    {
        //event.preventDefault();? Web Api 阻止浏览器的默认行为
        case 37://left
            event.preventDefault();
            if(moveLeft()){
                setTimeout("random_Number()",210);
                setTimeout("checkGameOver()",300);
            }
            break;  
         case 38://up
            event.preventDefault();
            if(moveUp()){
                setTimeout("random_Number()",210);
                setTimeout("checkGameOver()",300);
            }
            break;
        case 39://right
            event.preventDefault();
            if(moveRight()){
                setTimeout("random_Number()",210);
                setTimeout("checkGameOver()",300);;
            }
            break;
        case 40://down 
             event.preventDefault();
            if(moveDown()){
                setTimeout("random_Number()",210);
                setTimeout("checkGameOver()",300);
            }
            break;
        default:
            break;
    }
});
//?:js事件监听器 绑定一个匿名函数（用于监测触控
//?: touchstart/touchend Web API事件
//

document.getElementById('grid_container').addEventListener("touchstart",function(event){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
//屏幕坐标系中 Y轴 是向下的
document.getElementById('grid_container').addEventListener("touchend",function(event){   
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    var deltax = endx-startx;
    var deltay = endy-starty;

    if(Math.abs(deltax) < 0.07*documentWidth && Math.abs(deltay) < 0.07*documentWidth)
        return;//防止误触，路径小于屏幕的0.2倍，则判定为非移动手势
    //X
    if( Math.abs(deltax) >= Math.abs(deltay)){ //?: js ,math.abs 方法
       if(deltax >0){
        //move right
        if(moveRight()){
            
            setTimeout("random_Number()",210);
            setTimeout("checkGameOver()",300);
        }
       }
       //
       else{
        //move left
        if(moveLeft()){
            setTimeout("random_Number()",210);
            setTimeout("checkGameOver()",300);
        }
       }
    }

    else{
        if(deltay >0){
            //move dowm
            if(moveDown()){
                setTimeout("random_Number()",210);
                setTimeout("checkGameOver()",300);
            }
        }
        else{
            //move up
            if(moveUp()){
                setTimeout("random_Number()",210);
                setTimeout("checkGameOver()",300);
            }
        }
    }
});


function checkGameOver(){
    if(nospace(board) && noMove(board)){
        if(over_flag == 0){
            gameOver();
            over_flag = 1;//保证GameOver页面只执行一次
        }
    }
}


function gameOver(){
    //覆盖一层半透明div 显示游戏失败 ?:css3 rgba
    //除了点击重新开始不允许任何操作

    //现场创建一层div
    $("#grid_container").append('<div id="over_cell"></div>')
    $("#over_cell").css('width',gridContainerWidth - 2*cellSpace);
    $("#over_cell").css('height',gridContainerWidth - 2*cellSpace);
    $("#over_cell").css('padding',cellSpace);
    $("#over_cell").css('border-radius',0.02*gridContainerWidth);
    $("#over_cell").append('<div id="over_title"></div>');
    $("#over_cell").css('background','#eee4da99');
    $("#over_cell").append('<button id = "over_text" onclick  = "newGame()">再来亿遍</button> ');
    $("#over_title").css("font-size",0.13*gridContainerWidth);
    $("#over_title").text('游戏结束');
    $("#over_title").css("margin-top",0.25*gridContainerWidth);
    //隐藏div 并执行动画,实现结束动画效果
    $("#over_cell").css("display",'none');
    $("#over_cell").css("opacity",0);
    overShow();
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }   
    //移动代码
    for(var i = 0;i<4;i++){
        for(var j = 1;j<4;j++){
             if(board[i][j] !=0){
                 for(var k = 0; k<j;k++){
                     if(board[i][k] == 0 && checkObstacle(i,k,j,board)){
                         showMoveAnimation(i,j,i,k);
                         board[i][k] = board[i][j];
                         board[i][j] = 0;
                         continue;
                     }

                     else if(board[i][k] == board[i][j]  && checkObstacle(i,k,j,board) && !check_boom[i][k]){//... && ... && 当前移动的方块没有发生过碰撞
                          showMoveAnimation(i,j,i,k);
                          board[i][k] += board[i][j];
                          board[i][j] = 0;
                          score += board[i][k];
                          updateScore(score);
                          check_boom[i][k] = true;//记录发生了碰撞
                         continue;
                     }  
                 }
             }
        }
    }
    setTimeout("upDateBoardView();",200); 
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    //
    for(var i = 0;i<4;i++){
        for(var j = 2;j>=0;j--){
            if(board[i][j] != 0){
                for(var k = 3;k>j;k--){//k = 每行的最后一格
                    if(board[i][k] == 0 && checkObstacle(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && checkObstacle(i,j,k,board) &&!check_boom[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        check_boom[i][k]  = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("upDateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }

    for(var j = 0;j<4;j++){
        for(var i = 1;i<4;i++){
            if(board[i][j] != 0){
                for(var k = 0;k<i;k++){
                    if(board[k][j] == 0 && checkObstacle_row(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }

                    else if(board[k][j] == board[i][j] && checkObstacle_row(j,k,i,board) && !check_boom[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] *=2;
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        check_boom[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("upDateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }

    for(var j = 0;j<4;j++){
        for(var i =2;i>=0;i--){
            if(board[i][j] != 0){
                for(var k = 3; k>i;k--){
                    if(board[k][j] == 0 && checkObstacle_row(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && checkObstacle_row(j,i,k,board) && !check_boom[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        check_boom[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("upDateBoardView()",200);
    return true;
}