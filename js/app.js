
$('.header').sticky({
    zIndex: 40
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
                "position-front"
             ]
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