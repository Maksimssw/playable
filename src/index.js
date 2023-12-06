"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./assets/fonts/fonts.css");
require("./assets/css/style.css");
require("./assets/css/index.css");
var sliderWrapper = document.querySelector('.slider__wrapper');
var sliderItem = document.querySelectorAll('.slider__item');
var widthItem = sliderWrapper.offsetWidth / 3;
var scrollX = 0;
var scrollI = 0;
sliderItem.forEach(function (item) {
    item.style.width = widthItem + 'px';
    var answers = item.querySelectorAll('.answers__item');
    answers.forEach(function (answer) {
        answer.addEventListener('click', function () {
            answerHandler(answer, item);
        });
    });
});
var answerHandler = function (answer, item) {
    answer.classList.add('answers__item_click');
    var value = answer.textContent;
    setTimeout(function () {
        answer.classList.remove('answers__item_click');
        if (isNextSlider) {
            scrollI += 1;
            scrollX += widthItem;
            nextSlider(item);
        }
    }, 500);
    var isNextSlider;
    if (value) {
        if (value === 'Зеленый' ||
            value === 'Обгон запрещен' ||
            value === '60 км/ч') {
            answer.classList.add('answers__item_true');
            isNextSlider = true;
        }
        else {
            answer.classList.add('answers__item_false');
            isNextSlider = false;
        }
    }
};
var nextSlider = function (item) {
    sliderWrapper.style.transform = "translateX(-".concat(scrollX, "px)");
};
