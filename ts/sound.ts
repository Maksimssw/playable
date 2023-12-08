import { Howl } from "howler";

export const bg = new Howl({
  src: [require("./assets/sounds/bg.mp3")],
  autoplay: false,
  loop: true,
  volume: 0.2,
  html5: true,
  onplayerror: function () {
    bg.once("unlock", function () {
      bg.loop();
    });
  },
});

export const click = new Howl({
  src: [require("./assets/sounds/click.mp3")],
  autoplay: false,
  loop: false,
  volume: 0.5,
  html5: true,
  onplayerror: function () {
    click.once("unlock", function () {
      click.loop();
    });
  },
});

export const wrong = new Howl({
  src: [require("./assets/sounds/wrong.mp3")],
  autoplay: false,
  loop: false,
  volume: 0.5,
  html5: true,
  onplayerror: function () {
    wrong.once("unlock", function () {
      wrong.loop();
    });
  },
});

export const success = new Howl({
  src: [require("./assets/sounds/success.mp3")],
  autoplay: false,
  loop: false,
  volume: 0.7,
  html5: true,
  onplayerror: function () {
    success.once("unlock", function () {
      success.loop();
    });
  },
});

export const coins = new Howl({
  src: [require("./assets/sounds/coins.mp3")],
  autoplay: false,
  loop: false,
  volume: 0.3,
  html5: true,
  onplayerror: function () {
    coins.once("unlock", function () {
      coins.loop();
    });
  },
});