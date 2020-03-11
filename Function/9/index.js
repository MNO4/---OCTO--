window.onload = function(){
    let head_ul =  document.getElementById('head_ul').children;
    let write1 =  document.getElementById('write1');
    let write2 =  document.getElementById('write2');
    let write3 =  document.getElementById('write3');
    let write4 =  document.getElementById('write4');
    let writeturn;
    change_write();
    write1.style.display = 'block';
    head_ul[0].onmouseover = function(){
        change_write();
        write1.style.display = 'block';
        show(write1);
        
    }
    head_ul[1].onmouseover = function(){
        change_write();
        write2.style.display = 'block';
        show(write2);
    }
    head_ul[2].onmouseover = function(){
        change_write();
        write3.style.display = 'block';
        show(write3);
    }
    head_ul[3].onmouseover = function(){
        change_write();
        write4.style.display = 'block';
        show(write4);
    }

    function change_write(){
        write1.style.display = 'none';
        write2.style.display = 'none';
        write3.style.display = 'none';
        write4.style.display = 'none';
    }
    function show(box){
        let wirite;
        wirite = box;
        let speed = 2;
        let alpha = -210;
        let timer  =null;
        wirite.style.bottom = alpha +'px';
        timer = setInterval(function(){
            alpha += speed;
            wirite.style.bottom = alpha +'px';
            if(alpha>-5){
                clearInterval(timer);   
            } 
        },1);
        
    }

}