import "./assets/fonts/fonts.css";
import "./assets/css/style.css";
import "./assets/css/index.css";
import sliderPlay from "./slider";
import {bg} from "./sound";
import { Howler } from "howler";

const launch = () => {
  // bg.play()

  sliderPlay()

  window.addEventListener("orientationchange", function() {
    // dapi.addEventListener("adResized", (event) => {
    //    console.log(event)
    // });
  })
}

launch()

// let firstStart = true
// var isAudioEnabled;
// var screenSize;
//
// function onReadyCallback() {
//   dapi.removeEventListener("ready", onReadyCallback);
//   isAudioEnabled = !!dapi.getAudioVolume();
//
//   if (dapi.isViewable()) {
//     adVisibleCallback({ isViewable: true });
//   }
//
//   dapi.addEventListener("viewableChange", adVisibleCallback);
// }
//
// function audioVolumeChangeCallback(volume) {
//   isAudioEnabled = !!volume;
//   if (isAudioEnabled) {
//     Howler.volume(volume / 100);
//   } else {
//     Howler.volume(0);
//   }
// }
//
// function adVisibleCallback(e) {
//   if (e.isViewable) {
//     if (firstStart) {
//       firstStart = false
//       screenSize = dapi.getScreenSize();
//       Howler.mute(false);
//       launch(screenSize);
//     }
//   } else {
//     Howler.mute(true);
//   }
// }
//
// function ready() {
//   dapi.isReady()
//     ? onReadyCallback()
//     : dapi.addEventListener("ready", onReadyCallback);
//   dapi.addEventListener("audioVolumeChange", audioVolumeChangeCallback);
// }
//
// document.addEventListener("DOMContentLoaded", ready);
