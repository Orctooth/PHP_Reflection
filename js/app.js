$('.header').sticky({
    zIndex: 40,
    topSpacing: 0
  });


let lastScrollTop = 0;
$(window).scroll(function(event){
   let st = $(this).scrollTop();
   if (st > lastScrollTop){
       // downscroll code
       $('.header').sticky({
        zIndex: 40,
        topSpacing: -300
      });
       
   } else {
      // upscroll code
      //$('.header').animate({topSpacing: '0'});
      $('.header').sticky({
        zIndex: 40,
        topSpacing: 0
      });
   }
   lastScrollTop = st;
});

$('.slides').slick({
    
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    touchMove: true,
    infinite: true,
});

document.addEventListener(
    "DOMContentLoaded", () => {
        const menu = new Mmenu( "#my-menu", {
            // options

            "extensions": [
                "position-right",
                "pagedim-black",
            ],
            navbar: { add: false },
            
        });
        const api = menu.API;
        
        document.querySelector( "#my-open-button" )
                .addEventListener(
                    "click", ( evnt ) => {
                        evnt.preventDefault();
                        console.log('burger opened')
                        api.open();
                    }
                );
    }
);

let myStorage = window.localStorage;
let cookiesetting = mystorage.getItem('cookiesetting');


window.onload = function(){
    if(myStorage.getItem('cookiesetting') !== true){
        document.getElementById("cookie").style.display = "block";
    }
    
}

document.getElementById('accept').addEventListener('click', (e) =>{
    myStorage.setItem('cookiesetting', 'true');
    document.getElementById("cookie").style.display = "none";

});



