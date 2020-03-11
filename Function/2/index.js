window.onload  = function(){
    var box = document.getElementById("box");
    var img_ul = this.document.getElementById("img_ul");
    var buttons = document.getElementById("buttons");
    var litCir_ul = document.getElementById("litCir_ul");
    var len = img_ul.children.length;
    var cLis = litCir_ul.children;

    var len = img_ul.children.length;     //图片张数
    var width = box.offsetWidth;       //每张图片的宽度
    var gap  = 3000;//自动切换缝隙
    var picN = 0;//当前显示的图片下标
    var cirN = 0;//当前显示的小圆点下标
    var timer = null;     
    var rate = 16;//移动速率 单位是px
    var times = 1;//切换速度的倍率
    var temp;

    img_ul.appendChild(img_ul.children[0].cloneNode(true));

    for(var i=0;i<len;i++){
        var a_li = document.createElement("li");
        a_li.className = 'quiet';
        litCir_ul.appendChild(a_li);
    }
    litCir_ul.children[0].className = 'active';

    function autoRun(){//自动滚动  
        picN++;
        cirN++;
        if(picN >len){
            img_ul.style.left = 0;
            picN =  1;
        }
        Roll(-picN*width);

        if(cirN >len-1){
            cirN  =0;
        }
        for(var i = 0;i<len;i++){
            cLis[i].className  = 'quiet'; 
        }
        cLis[cirN].className  = 'active'; 
    }

    timer  = setInterval(autoRun,gap);

    box.onmouseover = function(){
        clearInterval(timer);
        buttons.style.display = 'block';
    }

    box.onmouseout = function(){
        timer  = setInterval(autoRun,gap);
        buttons.style.display = 'none';
    }
    //触及小圆点切换对应图片
    for(var i = 0;i<len;i++){
        cLis[i].index = i;
        cLis[i].onmouseover = function(){
            for(var j=0;j<len;j++){
                cLis[j].className = 'quiet';
            }
            this.className = 'active';
            temp = cirN;
            picN = cirN =  this.index;
            times = Math.abs(this.index - temp);
            rate = times*rate;
            Roll(-this.index * width);
            rate = 16;
        }
    }
    //上一张
    buttons.children[0].onclick = function(){
        picN--;
        cirN--;
        if(picN < 0){
            img_ul.style.left = -len * width + 'px';
            picN = len-1;
        }
        Roll(-picN*width);

        if(cirN < 0){
            cirN = len -1 ;
        }
        for(var i = 0; i<len;i++){
            cLis[i].className = 'quiet';
        }
        cLis[cirN].className = 'active';
    }
    //下一张
    buttons.children[1].onclick = autoRun;
   

    function Roll(distance){//执行动画
        clearInterval(img_ul.timer);
        var speed = img_ul.offsetLeft < distance ?  rate : (0-rate);
        img_ul.timer = setInterval(function(){
            img_ul.style.left = img_ul.offsetLeft + speed + "px";     
            var leave = distance - img_ul.offsetLeft;   
            if(Math.abs(leave) <= Math.abs(speed)){
                clearInterval(img_ul.timer);
                img_ul.style.left = distance +'px';
            }
        },8);
    }
}

