import { Howl } from "howler";

export const sounds = {
  ball: new Howl({
    src: require("@/assets/sounds/ball.mp3"),
    loop: false,
    volume: 0.4,
    autoplay: false,
  }),
  win: new Howl({
    src: require("@/assets/sounds/big_win.mp3"),
    loop: false,
    volume: 0.7,
    autoplay: false,
  }),
};
