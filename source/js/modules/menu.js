let btn = document.querySelector('.burger');
let body = document.body;


btn.addEventListener('click', function(event) {
    event.stopPropagation();
    body.classList.toggle('open');
    document.addEventListener('click', function() {
        body.classList.remove('open');
    })
    document.querySelector('.header__mobile-nav').addEventListener('click', function(event) {
        event.stopPropagation();
    })

    document.querySelectorAll('.header__mobile-nav svg').forEach((element, index) => {
        element.addEventListener('click', function() {
            element.classList.toggle('active')
            document.querySelectorAll('.header__mobile-nav ul>li>ul')[index].classList.toggle('active')
        })
    });
})