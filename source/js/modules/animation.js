// Функция видимость при скролле

var Visible = function(target) {
    // Все позиции элемента
    var targetPosition = {
            top: window.pageYOffset + target.getBoundingClientRect().top,
            left: window.pageXOffset + target.getBoundingClientRect().left,
            right: window.pageXOffset + target.getBoundingClientRect().right,
            bottom: window.pageYOffset + target.getBoundingClientRect().bottom
        },
        // Получаем позиции окна
        windowPosition = {
            top: window.pageYOffset,
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        };

    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
        // Если элемент полностью видно, то запускаем следующий код

        return true;
    } else {
        // Если элемент не видно, то запускаем этот код
        return false;
    };
};



// Переменная для меню
let oldScrollTopPosition = 0;
let winScroll;
let scrollTopPosition;


if (document.getElementById("canvasForm")) {
    const canv = document.getElementById("canvasForm"),
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
            if (Visible(document.getElementById("canvasForm"))) {
                canv.style.display = "block";
                draw();
                window.removeEventListener('scroll', draw2)
            }
        }
        window.addEventListener('load', function() {
            draw2()
        })

        window.addEventListener('scroll', draw2);



    }

}


window.addEventListener('scroll', function() {

    document.querySelectorAll('h2').forEach(element => {
        if (Visible(element)) {
            element.classList.add('visible')
        } else {
            element.classList.remove('visible')
        }
    });

});
window.addEventListener('load', function() {
    document.querySelectorAll('h2').forEach(element => {
        if (Visible(element)) {
            element.classList.add('visible')
        } else {
            element.classList.remove('visible')
        }
    });
})