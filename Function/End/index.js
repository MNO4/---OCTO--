window.onload = function(){
   let flag = true;

   $('body').on('mousemove',function(e){
        if(!flag){
            let x = e.pageX;
            let y = e.pageY;

            $('.screen').css('animation','none');
            $('.animation-inner').css({
                'animation':'none',
                'transform': 'rotateY('+ x + 'deg) rotateX(' + y +'deg)'
            });
        }
        $('body').on('mousedown',function(e){
            $('body').addClass('click');
           });
        
           $('body').on('mouseup mouseleave',function(e){
            $('body').removeClass('click');
          });
   });

   setTimeout(function(){
    flag = false;
   },5000);

}