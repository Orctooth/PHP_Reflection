var $html = $(document.documentElement);

//Assigns sticky plugin behaviour to the header COMMENTING OUT IN FAVOR OF ANOTHER PLUGIN
// $('.header').sticky({
//     zIndex: 40,
//     topSpacing: 0
// });

//Detects scroll direction. 
//Need to find working solution for header popping in and out.
// slideDown() doesn't work.
// let lastScrollTop = 0, delta = 5;
// $(window).scroll(function(){
//     let nowScrollTop = $(this).scrollTop();
//     if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
//         if (nowScrollTop > lastScrollTop){
//             // ACTION ON
//             // SCROLLING DOWN
            
//         } else {
//             // ACTION ON
//             // SCROLLING UP
            
//        }
//     lastScrollTop = nowScrollTop;
//     }
// });


//Trying out a different (hopefully easier) header
document.addEventListener(
    "DOMContentLoaded", () => {
        new Mhead( ".header", {
            // options
        });
    }
);

//carousel
$('.slides').slick({
    
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 300,
    arrows: false,
    dots: true,
    touchMove: true,
    infinite: true,
});

//assigns mmenu plugin behaviour to the menu
//also contains the event listener assigned to
//the burger button
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
        
        document.querySelector( "#my-open-button" ).addEventListener("click", ( evnt ) => {
            evnt.preventDefault();
            console.log('burger opened')
            api.open();
            document.querySelector('.hamburger').classList.toggle("is-active");
        });

       

        
    }
);

//cookie function that fires on loading the page
window.onload = function(){
    if(localStorage.getItem('cookiesetting') !== 'true'){
        document.getElementById("cookie").style.display = "block";
        //$('body').css('overflow','hidden');

        $html.css('overflow', 'hidden');
        document.getElementById("cookie").css('overflow', 'auto');
    }
    
}
//accept cookies event listener
document.getElementById('accept').addEventListener('click', (e) =>{
    localStorage.setItem('cookiesetting', 'true');
    document.getElementById("cookie").style.display = "none";
    //$('body').css('overflow','auto');
    $html.css('overflow', 'auto');

});



