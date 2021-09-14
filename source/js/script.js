'use strict';


import { event } from 'jquery';
import * as swiper from './modules/swiper.js';
import * as animation from './modules/animation.js';
import * as menu from './modules/menu.js';
import * as validation from './modules/validation.js';
import * as filter from './modules/filter.js';
import * as map from './modules/map.js';
import * as accordion from './modules/accordion.js';

// import 'lazysizes';
// import CustomSelect from 'vanilla-js-dropdown';

var $ = require("jquery");
window.jQuery = $;

var fancybox = require("@fancyapps/fancybox");

import Masonry from 'masonry-layout'



// Фэнси бокс галерея для галерей и попапов

$('[data-fancybox]').fancybox({
    buttons: [
        'slideShow',
        'fullScreen',
        'thumbs',
        //'share',
        'download',
        //'zoom',
        'close'
    ],
    thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        // parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
    },
    youtube: {
        controls: 1,
        showinfo: 0
    },
    vimeo: {
        color: 'f00'
    }

});

$.fancybox.defaults.backFocus = false;


// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);


});










// Маленькие действия
// Поиск
// Кнопка поделиться
function prevent(evt) {
    evt.preventDefault();
}
document.querySelector('.search button').addEventListener('click', prevent);
document.querySelector('.search button').addEventListener('click', function(event) {

    event.stopPropagation();
    document.querySelector('.header').addEventListener('click', function(event) {
        event.stopPropagation();
    })

    function remove() {
        document.querySelector('.search').classList.remove('active');
    }

    document.querySelector('.search').classList.toggle('active');
    document.querySelector('.search button').removeEventListener('click', prevent);
    if (document.querySelector('.search').classList.contains('active')) {

        document.addEventListener('click', remove)
    } else {
        document.removeEventListener('click', remove)
    }
})


// Файл загрузки

let inputF = document.getElementById('fl_inp');

if (inputF) {
    inputF.addEventListener('change', function(e) {
        let fileName = e.target.value.split('\\').pop();
        if (fileName) {
            document.getElementById('fl_name').innerHTML = fileName;
        }
    });
}


document.addEventListener('wpcf7mailsent', function(event) {
    $.fancybox.open({
        src: '#popup-modal-ok',

    });
    setTimeout(function() {
        $.fancybox.close(true);

    }, 3000)
});