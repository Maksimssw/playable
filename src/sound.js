"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bg = void 0;
var howler_1 = require("howler");
exports.bg = new howler_1.Howl({
    src: ["click.wav"],
    autoplay: true,
    loop: true,
    volume: 0.2,
    html5: true,
    onplayerror: function () {
        exports.bg.once("unlock", function () {
            exports.bg.loop();
        });
    },
});
