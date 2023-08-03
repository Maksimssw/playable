import { Plinko } from "./game";
import './assets/css/style.css'

const basket = [
  260,
  43,
  37,
  7,
  0.4,
  0.2,
  0.4,
  7,
  37,
  43,
  260,
];

const xy = [1.02];

const plinko = Plinko(document.body.querySelector("#plinko"));

plinko.map(basket);

const playButton = document.querySelector('.wrapper__button')

playButton.addEventListener('click', () => {
  plinko.balance(0)
  plinko.add(1.04)
})
