window.onload  = function(){
    var box = document.getElementById("box");
    var img_ul = this.document.getElementById("img_ul");
    var buttons = document.getElementById("buttons");
    var litCir_ul = document.getElementById("litCir_ul");
    var len = img_ul.children.length;
    var cLis = litCir_ul.children;
    var img_ul_li =  img_ul.children;
    var len = img_ul.children.length;     //图片张数
    var width = box.offsetWidth;       //每张图片的宽度
    var gap  = 2000;//自动切换缝隙
    var picN = 0;//当前显示的图片下标
    var cirN = 0;//当前显示的小圆点下标
    var timer = null;     
    var rate = 0.02;//移动速率 单位是px
    var times = 1;//切换速度的倍率
    var temp;
    let flag = 0;
    //img_ul.appendChild(img_ul.children[0].cloneNode(true));
    var isclick= true;
    for(var i=0; i<len;i++){
        var a_li = document.createElement("li");
        a_li.className = 'quiet';
        litCir_ul.appendChild(a_li);
    }
    litCir_ul.children[0].className = 'active';

    function autoRun(){//自动滚动  
         if(isclick){
            isclick= false;
             //下面添加需要执行的事件
            picN++;
            cirN++;
            if(cirN >len-1){
                cirN  =0;
            }
            for(var i = 0;i<len;i++){
             cLis[i].className  = 'quiet'; 
            }
             cLis[cirN].className  = 'active'; 
             Roll(picN,1);
             //定时器
            setTimeout(function(){ 
                isclick = true;
            }, 500);
     }
        

    }

    // timer  = setInterval(autoRun,gap);

    // box.onmouseover = function(){
    //     clearInterval(timer);
    //     buttons.style.display = 'block';
    // }

    // box.onmouseout = function(){
    //     timer  = setInterval(autoRun,gap);
    //     buttons.style.display = 'none';
    // }
    //上一张
    buttons.children[0].onclick = function(){
        
    if(isclick){
        isclick= false;
        //下面添加需要执行的事件
        picN--;
        cirN--;
        if(cirN < 0){
            cirN = len -1 ;
        }
        for(var i = 0; i<len;i++){
            cLis[i].className = 'quiet';
        }
        cLis[cirN].className = 'active';
        Roll(picN,0);
        //定时器
        setTimeout(function(){ 
            isclick = true;
        }, 500);
    }
}
    //下一张
   buttons.children[1].onclick = autoRun;
    // //触及小圆点切换对应图片
    // for(var i = 0;i<len;i++){
    //     cLis[i].index = i;
    //     cLis[i].onmouseover = function(){
    //         for(var j=0;j<len;j++){
    //             cLis[j].className = 'quiet';
    //         }
    //         this.className = 'active';
    //         temp = cirN;
    //         picN = cirN =  this.index;
    //         times = Math.abs(this.index - temp);
    //         rate = times*rate;
    //         Roll(-this.index * width);
    //         rate = 16;
    //     }
    // }暂时不做





    function Roll(num,direction){//执行动画
        let img_now = 0;//当前一张
        let img_before = 0;//下一张 左or右
        let alpha = 0;
        let alpha_before = 1; 
        clearInterval(img_ul.timer);
        if(direction > 0){//右移
            if(num == 5){//最后一张->第一张
                picN = 0;
                img_now = num-1;
                img_before = 0;
            }
            else{
                   img_now = num-1;
                   img_before = num;
            }
        }
        else {//左移
            if(num == -1){//最后一张->第一张
                picN = len-1;
                img_now = num+1;
                img_before = len-1;//最后一张
            }
            else{
                img_now = num+1;
                img_before = num;
            }
        }
      
        img_ul_li[img_now].style.opacity = 1; 
        img_ul_li[img_before].style.opacity = 0;

        img_ul.timer = setInterval(function(){
            alpha_before -= rate;
            alpha += rate;
            img_ul_li[img_now].style.opacity = alpha_before; 
            img_ul_li[img_before].style.opacity = alpha;
            if(img_ul_li[img_now].style.opacity < 0 ){
                clearInterval(img_ul.timer);
                img_ul_li[img_before].style.opacity = 1; 
                img_ul_li[img_now].style.opacity = 0;
            }
        },10);
        // img_ul_li[img_now].style.opacity = 1; 
        // img_ul_li[img_before].style.opacity = 0;

        // img_ul.timer = setInterval(function(){
        //     alpha_before -= rate;
        //     alpha += rate;
        //     img_ul_li[img_now].style.opacity = alpha_before; 
        //     img_ul_li[img_before].style.opacity = alpha;
        //     if(img_ul_li[img_now].style.opacity < 0 ){
        //         clearInterval(img_ul.timer);
        //         img_ul_li[img_before].style.opacity = 1; 
        //         img_ul_li[img_now].style.opacity = 0;
        //     }
        // },10);
    }

}

