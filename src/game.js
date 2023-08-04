import Matter from "matter-js";
import * as PIXI from "pixi.js";

export function Plinko(element) {
  /*--------------------------
  Setup
  --------------------------*/

  // Matter Modules
  const Engine = Matter.Engine;
  const Runner = Matter.Runner;
  const Bodies = Matter.Bodies;
  const Body = Matter.Body;
  const Composite = Matter.Composite;
  const Events = Matter.Events;

  // Scene Container
  const width = element.offsetWidth;

  /*--------------------------
  Engine
  --------------------------*/

  const engine = Engine.create();

  /*--------------------------
  Scene Objects
  --------------------------*/

  const sceneObjects = [];

  /*--------------------------
  Pixi
  --------------------------*/

  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: element,
    width: width,
    height: width,
    transparent: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  element.appendChild(app.view);

  /*--------------------------
  Pixi Frame Updates
  --------------------------*/

  app.ticker.add(() => {
    sceneObjects.forEach((object) => {
      object.sprite.position = object.body.position;
      object.sprite.rotation = object.body.angle;
    });
  });

  /*--------------------------
  Run
  --------------------------*/

  Runner.run(engine);

  Events.on(engine, "collisionStart", collisionStart);

  /*--------------------------
  Game
  --------------------------*/
  const balanceText = document.querySelector(".header-balance");
  const linesWrapper = document.querySelector(".lines")

  const buttonMin = document.querySelector(".footer-min")
  const buttonDecrement = document.querySelector(".footer-decrement")
  const betText = document.querySelector(".footer-bet")
  const buttonIncrement = document.querySelector(".footer-increment")
  const buttonMax = document.querySelector(".footer-max")

  let radius;
  let gap;
  let mapGap;
  let count = 0;
  let bet = 1;
  const lines = []

  function renderBet() {
    betText.innerHTML = `Bet $${bet.toFixed(1)}`
  }

  buttonMin.addEventListener('click', () => {
    bet = 1
    renderBet()
  })

  buttonDecrement.addEventListener('click', () => {
    if (bet <= 1) return
    bet -= 1
    renderBet()
  })

  buttonIncrement.addEventListener('click', () => {
    if (bet === 50) return
    bet += 1
    renderBet()
  })

  buttonMax.addEventListener('click', () => {
    bet = 50.0
    renderBet()
  })

  function collisionStart(event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      if (bodyA.label === "point") Splash(bodyA);
      if (bodyA.label === "basket" && bodyB.label === "particle") {
        Balance(bodyA.motion);
        RemoveParticle(bodyB, bodyA);
      }
      if (bodyB.label === "particle" && bodyA.label === "basket-border") {
        Road(bodyB, bodyA);
      }
    }
  }

  function Road(particle, basketBorder) {
    if (particle.index !== basketBorder.index) return;
    Body.setVelocity(particle, {
      x: basketBorder.side === "right" ? -3 : 3,
      y: 3,
    });
  }

  function Balance(bonus) {
    let balance = +balanceText.textContent.replace('$','')

    if (bonus === 0) {
      balance -= bet
      balanceText.innerHTML = `${balance.toFixed(2)}$`
      return
    }

    const received = bet * bonus
    const dataBet = {
      bet: bet,
      bonus: bonus,
      profit: received - bet
    }
    lines.push(dataBet)

    balanceText.innerHTML = `${(balance + received).toFixed(1)}$`

    const linesContent = document.createElement('div')
    linesContent.classList.add('lines-content')

    if (lines.length === 4) {
      const linesFirst = document.querySelector('.lines-content')
      linesFirst.remove()
      lines.shift()
    }

    linesContent.innerHTML = `
      <span class="lines-text lines-bet">$${dataBet.bet.toFixed(2)}</span>
      <span class="lines-text lines-bonus">${dataBet.bonus.toFixed(1)}</span>
      <span class="lines-text lines-profit">${dataBet.profit.toFixed(2)}$</span>
    `

    linesWrapper.append(linesContent)
  }

  function Splash(body) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill("#ff0000");
    graphics.drawCircle(
      body.position.x,
      body.position.y,
      body.circleRadius * 2
    );
    graphics.alpha = 0.5;
    graphics.zIndex = 1;
    graphics.endFill();
    app.stage.addChild(graphics);

    setTimeout(() => {
      app.stage.removeChild(graphics);
    }, 400);
  }

  async function Particle(x, y, r, index) {
    const options = {
      restitution: 0.5,
        frictionAir: 0.006,
        collisionFilter: {
          group: -1,
        },
    };

    const body = Bodies.circle(x, y, r, options);
    body.label = "particle";
    body.index = index + 2;
    Composite.add(engine.world, body);

    const color ="FFFFFF";

    const textureBasket = await PIXI.Assets.load(
      require(`@/assets/images/balls/ball.png`)
    );
    const basket = PIXI.Sprite.from(textureBasket);
    basket.width = r * 5
    basket.height = r * 5
        basket.anchor.set(0.5)
    app.stage.addChild(basket);

    sceneObjects.push({
      body: body,
      sprite: basket,
    });
  }

  function Point(x, y, r) {
    const options = {
      isStatic: true,
    };

    const body = Bodies.circle(x, y, r, options);
    body.label = "point";
    Composite.add(engine.world, body);

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xd3d3d3);
    graphics.drawCircle(x, y, r);
    graphics.zIndex = 2;
    graphics.endFill();
    app.stage.addChild(graphics);
  }

  async function Basket(x, y, gap, index, text) {
    const options = {
      isSensor: true,
      isStatic: true,
      bonus: text,
    };

    const rightOptions = {
      isSensor: true,
      isStatic: true,
      angle: 180 / 2,
    };

    const leftOptions = {
      isSensor: true,
      isStatic: true,
      angle: (180 / 2) * -1,
    };

    const body = Bodies.rectangle(x, y, gap, gap, options);
    body.label = "basket";
    body.motion = text;
    body.index = index;

    const right = Bodies.rectangle(
      x + radius * (mapGap / 2),
      y,
      width * mapGap,
      radius * mapGap,
      rightOptions
    );
    right.label = "basket-border";
    right.side = "right";
    right.index = index;

    const left = Bodies.rectangle(
      x - radius * (mapGap / 2),
      y,
      width * mapGap,
      radius * mapGap,
      leftOptions
    );
    left.label = "basket-border";
    left.side = "left";
    left.index = index;

    Composite.add(engine.world, [body, left, right]);

    if (text !== undefined) {
      const textureBasket = await PIXI.Assets.load(
        require(`@/assets/images/boxes/${text}.png`)
      );
      const basket = PIXI.Sprite.from(textureBasket);
      basket.x = x;
      basket.y = y;
      basket.width = radius * 5.2;
      basket.height = radius * 3.5;
      basket.anchor.set(0.5);
      app.stage.addChild(basket);
    }
  }

  async function HollBall() {
    const gr = new PIXI.Graphics();
    const textureBasket = await PIXI.Assets.load(
      require(`@/assets/images/balls/hole.png`)
    );
    const basket = PIXI.Sprite.from(textureBasket);
    basket.width = radius * 7.5
    basket.height = radius * 7.5
    basket.x = width / 2 - basket.width / 2

    app.stage.addChild(basket);
  }

  function Border(x, y, side) {
    const options = {
      isStatic: true,
      angle: side === "right" ? (180 / 2) * -1 : 180 / 2,
    };

    const border = Bodies.rectangle(
      side === "right" ? x + radius * (mapGap * 2) : x - radius * (mapGap * 2),
      y,
      width * mapGap,
      radius * mapGap,
      options
    );
    border.label = "border";
    Composite.add(engine.world, border);
  }

  function RemoveParticle(body) {
    for (let i = 0; i < sceneObjects.length; i++) {
      if (sceneObjects[i].body.id === body.id) {
        Composite.remove(engine.world, sceneObjects[i].body);
        app.stage.removeChild(sceneObjects[i].sprite);
        sceneObjects.splice(i, 1);
      }
    }
  }

  function map(rows) {
    radius = width / rows.length / 8;
    mapGap = 3;
    gap = radius * 2 * mapGap;
    HollBall();

    let col = 3;
    const increment = 1;

    for (let i = 1; i <= rows.length; i++) {
      const space = (width - gap * col) / 2;
      for (let j = 1; j <= col; j++) {
        if (i < rows.length) {
          new Point(space + j * gap - radius * mapGap, i * gap + 20, radius);
        } else {
          Basket(
            space + j * gap - radius * mapGap,
            i * gap + 20,
            gap,
            j,
            rows[j - 2]
          );
          if (j === 1) {
            Border(space + j * gap - radius * mapGap, i * gap + 40, "left");
          }
          if (j === col) {
            Border(space + j * gap - radius * mapGap, i * gap + 40, "right");
          }
        }
      }
      col += increment;
    }
  }

  function add(offset) {
    const center = width / 2;
    const x = center + offset;
    const y = 20;
    Particle(x, y, radius + 2, count);
    count += 1;
  }

  function clear() {
    Composite.clear(engine.world);
    app.stage.removeChildren();
  }

  /*--------------------------
  Return
  --------------------------*/

  return {
    map,
    add,
    clear,
    Balance,
    bet,
  };
}
