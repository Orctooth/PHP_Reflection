/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
var $html = $(document.documentElement);


function scrollup(){
  document.getElementById('headerSTICK').style.transform ="translate3d(0, -100%, 0)";
}
function scrolldown(){
  document.getElementById('headerSTICK').style.transform ="translate3d(0, 0, 0)";
}
//Transitions between static and sticky header based on scroll height
var $scrollTop; 
document.querySelector('#my-page').addEventListener('scroll', function(e){
  $scrollTop= $('#my-page').scrollTop();
  //console.log($scrollTop);
  if($scrollTop > 50){
    document.getElementById('headerSTICK').style.display="block";
  } else{
    document.getElementById('headerSTICK').style.display ="none";
  }
});

var lastScrollTop = 0;
document.querySelector('#my-page').addEventListener("scroll", function(){
  var st = document.querySelector('#my-page').scrollTop;
  if (st > lastScrollTop){
     // downscroll code
     window.setTimeout(scrollup,800);
     
  } else {
     // upscroll code
     window.setTimeout(scrolldown,800);
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);

//Locks page scrolling when header is moused over
var header = document.querySelector("#headerSTICK");
header.addEventListener('mouseover', function(e){
  $('#my-page').css('overflow-y', 'hidden');
});
header.addEventListener('mouseleave', function(e){
  $('#my-page').css('overflow-y', 'auto');
});

//carousel
// document.addEventListener("DOMContentLoaded", function () {
//   new Mhead("#headerSTICK", {// options
//     scroll:{
//       tolerance: 8
//     }
//   });
  
// });

$('.slides').slick({
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 300,
  arrows: false,
  dots: true,
  touchMove: true,
  infinite: true
}); //assigns mmenu plugin behaviour to the menu
//also contains the event listener assigned to
//the burger button

document.addEventListener("DOMContentLoaded", function () {
  var menu = new Mmenu("#my-menu", {
    // options
    "extensions": ["position-right", "pagedim-black"],
    navbar: {
      add: false
    },
    //config
    // offCanvas: {
    //   page: {
    //       selector: "#my-page"
    //   }
    // }
  });
  var api = menu.API;
  document.querySelector("#my-open-button").addEventListener("click", function (evnt) {
    evnt.preventDefault();
    api.open();
    document.querySelector('.hamburger').classList.toggle("is-active");
    document.querySelector('.mm-slideout').classList.toggle("can-not-scroll");
    document.querySelector('#headerSTICK').classList.add("left");
    
  });
  document.querySelector("#my-open-button2").addEventListener("click", function (evnt) {
    evnt.preventDefault();
    api.open();
    document.querySelector('.hamburger').classList.toggle("is-active");
    document.querySelector('.mm-slideout').classList.toggle("can-not-scroll");
    
    
  });
}); //cookie function that fires on loading the page

window.onload = function () {
  if (localStorage.getItem('cookiesetting') !== 'true') {
    document.getElementById("cookie").style.display = "block"; 

    $('body').css('overflow', 'hidden');
    // document.getElementById("cookie").css('overflow-y', 'auto !important');
  }
}; //accept cookies event listener


document.getElementById('accept').addEventListener('click', function (e) {
  localStorage.setItem('cookiesetting', 'true');
  document.getElementById("cookie").style.display = "none";

  $('body').css('overflow', 'auto');
});



/******/ })()
;

