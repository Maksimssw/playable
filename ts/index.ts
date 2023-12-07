import "./assets/fonts/fonts.css";
import "./assets/css/style.css";
import "./assets/css/index.css";
import sliderPlay from "./slider";
import {bg} from "./sound";

let context;
window.onload = function() {
  context = new AudioContext()
}

document.addEventListener('DOMContentLoaded', () => {
  bg.play()

  sliderPlay()
})