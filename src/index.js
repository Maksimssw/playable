import { Plinko } from "./game";
import './assets/css/style.css'

const basket = [
  2,
  1.5,
  1.4,
  0.9,
  0.4,
  0.2,
  0.4,
  0.9,
  1.4,
  1.5,
  2,
];

const xy = [1.02];

const plinko = Plinko(document.body.querySelector("#plinko"));

plinko.map(basket);

const playButton = document.querySelector('.wrapper__button')

playButton.addEventListener('click', () => {
  plinko.balance(0)
  plinko.add(xy[0])
})

// for (let i = 0; i < basket.length; i++) {
//   // setTimeout(() => {
//   //   plinko.add(i);
//   // }, 300 * i);
//   plinko.add(i);
// }
