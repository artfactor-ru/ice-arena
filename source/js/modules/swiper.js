import Swiper, { Scrollbar, Controller, A11y, Thumbs, Navigation, EffectCoverflow, Pagination, EffectFade, Autoplay, Mousewheel, Keyboard, Lazy } from 'swiper';

Swiper.use([Scrollbar, Controller, A11y, Thumbs, EffectFade, EffectCoverflow, Pagination, Navigation, Autoplay, Mousewheel, Keyboard, Lazy]);

function updateSlider(slider) {

    if (slider != undefined) {
        if (Array.isArray(slider)) {

            if ((slider.length != 0) || (slider.length != undefined)) {

                for (let i = 0; i < slider.length; i++) {
                    slider[i].update();
                }
            }
        } else {
            slider.update();


        }

    }
}



document.querySelectorAll('.hero__slide').forEach((slide, index) => {

    // document.addEventListener('DOMContentLoaded', function() {
    // const canv = document.getElementById(`"canvasHero-${index}"`);
    let canvId = "canvasHero-" + index;
    const canv = document.getElementById(canvId),
        ctx = canv.getContext("2d"),
        img = new Image(),
        imgMask = new Image();

    imgMask.src = document.body.dataset.mask;

    img.src = canv.dataset.bg;


    let speed = 0;
    let requestId;

    function draw() {
        speed += 10;

        const maskX = (canv.width - (70 + speed)) / 2,
            maskY = (canv.height - (40 + speed)) / 2;

        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.globalCompositeOperation = "source-over";

        ctx.drawImage(imgMask, maskX, maskY, 70 + speed, 40 + speed);

        ctx.globalCompositeOperation = "source-in";
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);


        requestId = window.requestAnimationFrame(draw);
    }

    img.onload = () => {
            canv.width = img.naturalWidth;
            canv.height = img.naturalHeight;

            function draw2() {


                canv.style.display = "block";
                draw();
            }

            setTimeout(() => {
                draw2()
            }, 10);


            swiperHero.on('slideChange', function() {
                speed = 0;
                draw2()
            });

            window.cancelAnimationFrame(requestId);




        }
        // })



});

let swiperHero;
if (document.querySelector('.swiper-container--hero')) {
    swiperHero = new Swiper('.swiper-container--hero', {
        slidesPerView: 1,

        speed: 1500,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },


    });
}

let swiperTime;
if (document.querySelector('.swiper-container--timetable')) {
    swiperTime = new Swiper('.swiper-container--timetable', {
        slidesPerView: 1,

        speed: 1500,


        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },



    });
}


let swiperPartners;
if (document.querySelector('.swiper-container--partners')) {
    swiperPartners = new Swiper('.swiper-container--partners', {
        slidesPerView: 'auto',

        speed: 1500,

        loop: true,
        autoplay: {
            delay: 500,
        },

        freeMode: true,

    });
}

// Баннеры с центрируемой картинкой
let swiperHistory;
document.querySelectorAll('.swiper-container--history').forEach((element, index) => {
    swiperHistory = new Swiper(element, {

        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        speed: 1500,
        effect: 'coverflow',
        grabCursor: true,
        autoHeight: true,
        // centeredSlides: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 0,
            slideShadows: false,
        },
        breakpoints: {
            // when window width is >= 320px
            1280: {
                autoHeight: false,
                slidesPerView: 2,
                slidesPerGroup: 2,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }
            },
        }
    });
})

window.addEventListener('resize', function() {
    swiperHero.update();

})