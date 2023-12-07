"use strict";
var cursor = document.querySelector('.cursor-img');
var cursorCordHandler = function (x, y) {
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
};
window.addEventListener('touchstart', function (event) {
    cursor.classList.add('cursor_click');
    cursorCordHandler(event.touches[0].clientX, event.touches[0].clientY);
});
window.addEventListener('touchmove', function (event) {
    cursor.classList.add('cursor_click');
});
window.addEventListener('touchend', function (event) {
    cursor.classList.remove('cursor_click');
});
