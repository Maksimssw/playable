"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./assets/fonts/fonts.css");
require("./assets/css/style.css");
require("./assets/css/index.css");
var slider_1 = __importDefault(require("./slider"));
var launch = function () {
    // bg.play()

    (0, slider_1.default)();
    dapi.addEventListener("adResized", (event) => {
        (0, slider_1.default)();
    });
};

let firstStart = true
var isAudioEnabled;
var screenSize;

function onReadyCallback() {
  dapi.removeEventListener("ready", onReadyCallback);
  isAudioEnabled = !!dapi.getAudioVolume();

  if (dapi.isViewable()) {
    adVisibleCallback({ isViewable: true });
  }

  dapi.addEventListener("viewableChange", adVisibleCallback);
}

function audioVolumeChangeCallback(volume) {
  isAudioEnabled = !!volume;
  if (isAudioEnabled) {
    Howler.volume(volume / 100);
  } else {
    Howler.volume(0);
  }
}

function adVisibleCallback(e) {
  if (e.isViewable) {
    if (firstStart) {
      firstStart = false
      screenSize = dapi.getScreenSize();
      Howler.mute(false);
      launch(screenSize);
    }
  } else {
    Howler.mute(true);
  }
}

function ready() {
  dapi.isReady()
    ? onReadyCallback()
    : dapi.addEventListener("ready", onReadyCallback);
  dapi.addEventListener("audioVolumeChange", audioVolumeChangeCallback);
}

document.addEventListener("DOMContentLoaded", ready);
