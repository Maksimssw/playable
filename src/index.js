import { Plinko } from "./game";
import "./assets/css/style.css";
import { Howler } from "howler";

const launch = () => {
  const basket = [410, 260, 210, 83, 24, 11, 24, 83, 210, 260, 410];
  console.log("start");
  const plinko = Plinko();

  plinko.map(basket);

  const playButton = document.querySelector(".addBall");

  playButton.addEventListener("click", () => {
    plinko.Balance(0);
    const random = (Math.random() * (1.3 - 0.8) + 0.8).toFixed(1);
    plinko.add(+random);
  });
};

var isAudioEnabled;
var screenSize;

function onReadyCallback() {
  dapi.removeEventListener("ready", onReadyCallback);
  isAudioEnabled = !!dapi.getAudioVolume();

  if (dapi.isViewable()) {
    adVisibleCallback({ isViewable: true });
  }

  dapi.addEventListener("viewableChange", adVisibleCallback);
  dapi.addEventListener("adResized", () => {});
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
  console.log("isViewable " + e.isViewable);
  if (e.isViewable) {
    screenSize = dapi.getScreenSize();
    Howler.mute(false);
    launch();
  } else {
    Howler.mute(true);
  }
}

function ready() {
  dapi.isReady()
    ? onReadyCallback()
    : dapi.addEventListener("ready", onReadyCallback);
  dapi.addEventListener("audioVolumeChange", audioVolumeChangeCallback);

  launch();
}
document.addEventListener("DOMContentLoaded", ready);
