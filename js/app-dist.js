/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
var $html = document.getElementById('my-page');

document.getElementById('web-tab-s').addEventListener('mouseover', function(e){
  document.getElementById('dd-universal-background-s').style.background = "#79539a";
});

document.querySelector('#IT-tab-s').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-s').style.background = "#286abd";
});

document.querySelector('#telecoms-tab-s').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-s').style.background = "#bc2c28";
});

document.querySelector('#bespoke-tab-s').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-s').style.background = "#526781";
});

document.querySelector('#marketing-tab-s').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-s').style.background = "#25a25a";
});

document.querySelector('#security-tab-s').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-s').style.background = "#de093f";
});

document.getElementById('web-tab-ns').addEventListener('mouseover', function(e){
  document.getElementById('dd-universal-background-ns').style.background = "#79539a";
});

document.querySelector('#IT-tab-ns').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-ns').style.background = "#286abd";
});

document.querySelector('#telecoms-tab-ns').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-ns').style.background = "#bc2c28";
});

document.querySelector('#bespoke-tab-ns').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-ns').style.background = "#526781";
});

document.querySelector('#marketing-tab-ns').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-ns').style.background = "#25a25a";
});

document.querySelector('#security-tab-ns').addEventListener('mouseover', function(e){
  document.querySelector('#dd-universal-background-ns').style.background = "#de093f";
});

var scrollBarWidth = $html.offsetWidth - $html.clientWidth;
if (Modernizr.hiddenscroll === true) {
  $('#headerSTICK').css("width", "100%");
} else {
  $('#headerSTICK').css("width", $html.offsetWidth - scrollBarWidth);
}

$( window ).resize(function() {
  $('#headerSTICK').css("width", $html.offsetWidth - scrollBarWidth);
});


function scrollup(){
  document.getElementById('headerSTICK').style.transform ="translate3d(0, 0, 0)";
  
}
function scrolldown(){
  document.getElementById('headerSTICK').style.transform ="translate3d(0, 100%, 0)";
}
//Transitions between static and sticky header based on scroll height
var $scrollTop; 
var lastScrollTop = 0;
document.querySelector('#my-page').addEventListener('scroll', function(e){
  $scrollTop= $('#my-page').scrollTop();
  //console.log($scrollTop);
  if(($scrollTop > 400) && ($scrollTop < lastScrollTop)){
    document.getElementById('headerSTICK').style.display="block";
  } else{
    document.getElementById('headerSTICK').style.display ="none";
  }
});


document.querySelector('#my-page').addEventListener("scroll", function(){
  var st = document.querySelector('#my-page').scrollTop;
  if (st < lastScrollTop){
     // upscroll code
     window.setTimeout(scrolldown,600);
  }else{
    window.setTimeout(scrollup,600);
  }
  lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);

//Locks page scrolling when header is moused over
var header = document.querySelector("#headerSTICK");
header.addEventListener('mouseover', function(e){
  // $('#my-page').css('overflow-y', 'hidden');
});
header.addEventListener('mouseleave', function(e){
  $('#my-page').css('overflow-y', 'auto');

});
document.querySelector('#navbar-ns').addEventListener('mouseleave', function(e){
  document.querySelector("#dd-universal-background-ns").style.background = "rgba(0,0,0,0)";

});
document.querySelector('#navbar-s').addEventListener('mouseleave', function(e){
  document.querySelector("#dd-universal-background-s").style.background = "rgba(0,0,0,0)";

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
    document.querySelector('.hamburger-2').classList.toggle("is-active");
    document.querySelector('.mm-slideout').classList.toggle("can-not-scroll");
    
    
  });
}); //cookie function that fires on loading the page
const hiding = document.querySelector('.mm-panel');
for(var i = 0; i < hiding.length; i++){
  hiding[i].classList.remove('mm-hidden');
}


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

