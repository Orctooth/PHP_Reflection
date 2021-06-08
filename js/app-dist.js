/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
var $html = $(document.documentElement);



//Transitions between static and sticky header based on scroll height
var $scrollTop; 
document.addEventListener('scroll', function(e){
  $scrollTop= $(window).scrollTop();
  //console.log($scrollTop);
  if($scrollTop > 250){
    document.getElementById('headerSTICK').style.display="block";
  } else{
    document.getElementById('headerSTICK').style.display ="none";
  }
});

//Locks page scrolling when header is moused over
var headers = document.querySelectorAll("div.header");
headers.forEach(function(headeritem) {
  headeritem.addEventListener('mouseover', function(e){
    $('body').css('overflow-y', 'hidden');
  });
  headeritem.addEventListener('mouseleave', function (e){
    $('body').css('overflow-y', 'auto');
  });
});

//carousel
document.addEventListener("DOMContentLoaded", function () {
  new Mhead("#headerSTICK", {// options
    scroll:{
      tolerance: 8
    }
  });
  stickybits('#div-for-stickybits');
});

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

