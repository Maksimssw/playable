import "./assets/fonts/fonts.css";
import "./assets/css/style.css";
import "./assets/css/index.css";
import sliderPlay from "./slider";
import {bg} from "./sound";

window.addEventListener('DOMContentLoaded', () => {
  bg.play()

  sliderPlay()
})