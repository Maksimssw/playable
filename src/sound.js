"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coins = exports.success = exports.wrong = exports.click = exports.bg = void 0;
var howler_1 = require("howler");
exports.bg = new howler_1.Howl({
    src: [require("./assets/sounds/bg.mp3")],
    autoplay: false,
    loop: true,
    volume: 0.2,
    html5: true,
    onplayerror: function () {
        exports.bg.once("unlock", function () {
            exports.bg.loop();
        });
    },
});
exports.click = new howler_1.Howl({
    src: [require("./assets/sounds/click.mp3")],
    autoplay: false,
    loop: false,
    volume: 0.5,
    html5: true,
    onplayerror: function () {
        exports.click.once("unlock", function () {
            exports.click.loop();
        });
    },
});
exports.wrong = new howler_1.Howl({
    src: [require("./assets/sounds/wrong.mp3")],
    autoplay: false,
    loop: false,
    volume: 0.5,
    html5: true,
    onplayerror: function () {
        exports.wrong.once("unlock", function () {
            exports.wrong.loop();
        });
    },
});
exports.success = new howler_1.Howl({
    src: [require("./assets/sounds/success.mp3")],
    autoplay: false,
    loop: false,
    volume: 0.7,
    html5: true,
    onplayerror: function () {
        exports.success.once("unlock", function () {
            exports.success.loop();
        });
    },
});
exports.coins = new howler_1.Howl({
    src: [require("./assets/sounds/coins.mp3")],
    autoplay: false,
    loop: false,
    volume: 0.3,
    html5: true,
    onplayerror: function () {
        exports.coins.once("unlock", function () {
            exports.coins.loop();
        });
    },
});
