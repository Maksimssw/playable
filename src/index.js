"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./assets/fonts/fonts.css");
require("./assets/css/style.css");
require("./assets/css/index.css");
var slider_1 = __importDefault(require("./slider"));
var sound_1 = require("./sound");
window.addEventListener('DOMContentLoaded', function () {
    sound_1.bg.play();
    (0, slider_1.default)();
});
