function random_Number_Cartoon(i,j,randNumber){
    var numberCell = $("#number_cell_"+i+"-"+j);
    numberCell.css("background-color",getNumberBgColor(randNumber));
    numberCell.css("color",getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },200);

}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $("#number_cell_"+fromx+"-"+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}

function updateScore(score){
    var scoreCell = $("#score"+ " "+ "span");
    scoreCell.text(score);
    
    if(max_score < score){
        var max_scoreCell = $("#best"+ " "+ "span");
        max_scoreCell.text(score);
        max_score =  score;
    }
}



