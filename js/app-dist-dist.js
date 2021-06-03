/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/******/
(function () {
  // webpackBootstrap
  var __webpack_exports__ = {};
  var $html = $(document.documentElement); //Assigns sticky plugin behaviour to the header COMMENTING OUT IN FAVOR OF ANOTHER PLUGIN

  var $scrollTop;
  document.addEventListener('scroll', function (e) {
    $scrollTop = $(window).scrollTop(); //console.log($scrollTop);

    if ($scrollTop > 230) {
      document.getElementById('headerSTICK').style.display = "block";
    } else {
      document.getElementById('headerSTICK').style.display = "none";
    }
  }); // document.getElementById('headerSTICK').addEventListener('onmouseover', function (e){
  //   $('body').css('overflow', 'hidden');
  // });
  // document.getElementById('headerSTICK').addEventListener('onmouseleave', function (e){
  //   $('body').css('overflow', 'auto');
  // });

  document.addEventListener("DOMContentLoaded", function () {
    new Mhead("#headerSTICK", {
      // options
      scroll: {
        tolerance: 8
      }
    });
  }); //carousel

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
      offCanvas: {
        page: {
          selector: "#my-page"
        }
      }
    });
    var api = menu.API;
    document.querySelector("#my-open-button").addEventListener("click", function (evnt) {
      evnt.preventDefault();
      api.open();
      document.querySelector('.hamburger').classList.toggle("is-active");
    });
    document.querySelector("#my-open-button2").addEventListener("click", function (evnt) {
      evnt.preventDefault();
      api.open();
      document.querySelector('.hamburger').classList.toggle("is-active");
    });
  }); //cookie function that fires on loading the page

  window.onload = function () {
    if (localStorage.getItem('cookiesetting') !== 'true') {
      document.getElementById("cookie").style.display = "block"; //$('body').css('overflow','hidden');

      $('body').css('overflow', 'hidden'); // document.getElementById("cookie").css('overflow-y', 'auto !important');
    }
  }; //accept cookies event listener


  document.getElementById('accept').addEventListener('click', function (e) {
    localStorage.setItem('cookiesetting', 'true');
    document.getElementById("cookie").style.display = "none"; //$('body').css('overflow','auto');

    $('body').css('overflow', 'auto');
  });
  /******/
})();
/******/ })()
;