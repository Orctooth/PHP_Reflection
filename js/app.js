//Assigns sticky plugin behaviour to the header
$('.header').sticky({
    zIndex: 40,
    topSpacing: 0
});

//Detects scroll direction. 
//Need to find working solution for header popping in and out.
// slideDown() doesn't work.
let lastScrollTop = 0, delta = 5;
$(window).scroll(function(){
    let nowScrollTop = $(this).scrollTop();
    if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
        if (nowScrollTop > lastScrollTop){
            // ACTION ON
            // SCROLLING DOWN
            
        } else {
            // ACTION ON
            // SCROLLING UP
            
       }
    lastScrollTop = nowScrollTop;
    }
});

//carousel
$('.slides').slick({
    
    autoplay: true,
    autoplaySpeed: 2000,
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
        document.getElementsByTagName('body').className ="noscroll";
    }
    
}
//accept cookies event listener
document.getElementById('accept').addEventListener('click', (e) =>{
    localStorage.setItem('cookiesetting', 'true');
    document.getElementById("cookie").style.display = "none";
    document.getElementsByTagName('body').className ="";

});



