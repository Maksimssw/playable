import { Howl } from "howler";

export const bg = new Howl({
  src: ["click.wav"],
  autoplay: true,
  loop: true,
  volume: 0.2,
  html5: true,
  onplayerror: function () {
    bg.once("unlock", function () {
      bg.loop();
    });
  },
});