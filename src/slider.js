"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./\u0441ursor");
var sliderPlay = function () {
    var slider = document.querySelector('.slider');
    var sliderWrapper = slider.querySelector('.slider__wrapper');
    var sliderItem = slider.querySelectorAll('.slider__item');
    var winsWrapper = document.querySelector('.wins');
    var widthItem = sliderWrapper.offsetWidth / 3;
    var scrollX = 0;
    var scrollI = 0;
    sliderItem.forEach(function (item) {
        item.style.width = widthItem + 'px';
        var answers = item.querySelectorAll('.answers__item');
        answers.forEach(function (answer) {
            answer.addEventListener('click', function () {
                answerHandler(answer);
            });
        });
    });
    var answerHandler = function (answer) {
        answer.classList.add('answers__item_click');
        var value = answer.textContent;
        setTimeout(function () {
            answer.classList.remove('answers__item_click');
            if (isNextSlider) {
                scrollI += 1;
                scrollX += widthItem;
                winsView();
                if (scrollI !== 3)
                    nextSlider();
            }
        }, 500);
        var isNextSlider;
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
    };
    var nextSlider = function () {
        sliderWrapper.style.transform = "translateX(-".concat(scrollX, "px)");
    };
    var coin = winsWrapper.querySelector('.coin');
    var headline = winsWrapper.querySelector('.wins__headline');
    var content = winsWrapper.querySelector('.wins__content');
    var winsView = function () {
        if (scrollI === 1) {
            winsWrapper.classList.add('wins_one');
            setTimeout(function () {
                coin.classList.add('coin_one');
            }, 300);
            return;
        }
        if (scrollI === 2) {
            winsWrapper.classList.add('wins_two');
            coin.classList.add('coin_two');
        }
        if (scrollI === 3) {
            winsWrapper.classList.add('wins_free');
            coin.classList.add('coin_free');
            slider.classList.add('slider_up');
            setTimeout(function () {
                headline.classList.add('wins__headline_vis');
                content.classList.add('wins__content_vis');
            }, 400);
        }
    };
};
exports.default = sliderPlay;
