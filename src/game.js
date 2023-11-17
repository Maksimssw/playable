import Matter from "matter-js";
import * as PIXI from "pixi.js";
export function Plinko() {
  /*--------------------------
  Setup
  --------------------------*/
  const element = document.querySelector(".plinko");
  // Matter Modules
  const Engine = Matter.Engine;
  const Runner = Matter.Runner;
  const Bodies = Matter.Bodies;
  const Body = Matter.Body;
  const Composite = Matter.Composite;
  const Events = Matter.Events;
  const World = Matter.World;

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
    view: element,
    backgroundAlpha: 0,
    width: width,
    height: width,
    animation: true,
    transparent: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
  });

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

  engine.gravity.y = 0.7;

  /*--------------------------
  Game
  --------------------------*/
  const balanceText = document.querySelector(".header-balance");
  const linesWrapper = document.querySelector(".lines");

  const betText = document.querySelector(".footer-bet");
  const winBlock = document.querySelector(".winBlock");
  const modal = document.querySelector('.modal')

  let radius;
  let gap;
  let mapGap;
  let count = 0;
  let bet = 1;
  const lines = [];

  const convertPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  function renderBet() {
    betText.innerHTML = `Bet $${bet.toFixed(1)}`;
  }

  function collisionStart(event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      if (bodyA.label === "point") {
        Splash(bodyA);
      }
      if (bodyA.label === 'fund') {
        console.log(1)
      }
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
      x: basketBorder.side === "right" ? -2 : 5,
      y: 2,
    });
  }

  function Balance(bonus) {
    let balance = +balanceText.textContent.replace("$", "");

    if (bonus === 0) {
      balance -= bet;
      balanceText.innerHTML = `${balance.toFixed(2)}$`;
      return;
    }

    const received = bet * bonus;
    const dataBet = {
      bet: bet,
      bonus: bonus,
      profit: received - bet,
    };
    lines.push(dataBet);

    balanceText.innerHTML = `${(balance + received).toFixed(1)}$`;

    const linesContent = document.createElement("div");

    linesContent.classList.add("lines-content");

    linesContent.classList.add("hide");

    if (lines.length === 7) {
      const linesFirst = document.querySelector(".lines-content");
      linesFirst.classList.add("hide");
      linesFirst.remove();
      lines.shift();
    }

    linesContent.innerHTML = `
      <span class="lines-text lines-bet hide show"><span class="lines-x">x</span>${dataBet.bonus}</span>`;

    winBlock.innerText = `Win $${dataBet.profit}`;
    winBlock.classList.add("active-bonus");
    setTimeout(() => {
      winBlock.classList.remove("active-bonus");
      linesContent.classList.add("show");
    }, 100);

    linesWrapper.append(linesContent);
  }

  function Splash(body) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill("#ff0063");
    graphics.drawCircle(
      body.position.x,
      body.position.y,
      body.circleRadius * 1.2
    );
    graphics.alpha = 0.9;
    graphics.zIndex = 1;
    graphics.endFill();
    app.stage.addChild(graphics);

    setTimeout(() => {
      app.stage.removeChild(graphics);
    }, 400);
  }

  let linesRow
  async function LinesTwo() {
    const options = {
      isStatic: false,
      gate: true,
      render: {
        fillStyle: 'red',
      }
    }

    const line = await PIXI.Assets.load(
      require('@/assets/images/line.png')
    )

    const sprite = PIXI.Sprite.from(line)
    sprite.width = radius * 25
    sprite.height = radius * 4
    sprite.x = width / 2 + sprite.width / 2;
    sprite.y = radius > 5 ? radius * 7.5 : radius * 12;
    sprite.rotation = -45
    sprite.zIndex = -1

    linesRow = Bodies.rectangle(sprite.x, sprite.y, sprite.width, sprite.height, options)
    linesRow.label = 'wrapperTwo'
    linesRow.fillStyle = '#000'
    linesRow.rotation = -45

    Composite.add(engine.world, linesRow);
    app.stage.addChild(sprite);
  }

  async function Lines() {
    const options = {
      isStatic: false,
      render: {
        fillStyle: 'red',
        strokeStyle: 'blue',
        lineWidth: 3
      }
    }

    const line = await PIXI.Assets.load(
      require('@/assets/images/line.png')
    )

    const sprite = PIXI.Sprite.from(line)
    sprite.width = radius * 25
    sprite.height = radius * 4
    sprite.x = width / 2 - sprite.width / 1;
    sprite.y = radius > 5 ? radius.toFixed(0) * -14 : radius * -9;
    sprite.rotation = 45
    sprite.zIndex = 10
    console.log(sprite.y)
  

    const wrapper = Bodies.rectangle(sprite.x, sprite.y, sprite.width, radius, options)
    wrapper.label = 'wrapper'
    wrapper.rotation = 45

    Composite.add(engine.world, wrapper);
    app.stage.addChild(sprite);
  }

  async function Lever() {
    const options = {
      isStatic: true,
    }

    const textureKey = await PIXI.Assets.load(
      require(`@/assets/images/key.png`)
    );
   
    const body = PIXI.Sprite.from(textureKey);
    body.width = radius * 40;
    body.height = radius * 7;
    body.x = width / 2 - body.width / 2;
    body.y = radius > 5 ? radius * 5 : radius * 10;

    const fund = Bodies.rectangle(body.x, body.y + radius + 10, width, radius * 2.5, options)
    fund.label = 'fund'
    fund.index = 10
    Composite.add(engine.world, fund);

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0, 0.01);
    graphics.drawRect(body.x, body.y, width, body.height);
    graphics.zIndex = -1;
    graphics.endFill();
    graphics.interactive = true
    app.stage.addChild(graphics);
      

    graphics.on('touchmove', function(e) {
      body.x = e.data.global.x
      fund.x = e.data.global.x

      if (body.x > hollBall.x + hollBall.width / 2) {
        fund.parent.isStatic = false
        // World.remove(engine.world, linesRow)
      }
    })

    app.stage.addChild(body);
  }

  async function Particle(x, y, r, index) {
    const options = {
      restitution: 0.2,
      frictionAir: 0.004,
      collisionFilter: {
        group: -1,
      },
    };

    const body = Bodies.circle(x, y, r, options);
    body.label = "particle";
    body.index = index + 2;
    Composite.add(engine.world, body);

    const textureBasket = await PIXI.Assets.load(
      require(`@/assets/images/balls/ball.png`)
    );
    const basket = PIXI.Sprite.from(textureBasket);
    basket.width = 1
    basket.height = 1

    const timer = setInterval(() => {
      if (basket.width >= r * 5) clearInterval(timer)

      basket.width += 2
      basket.height += 2
    }, 10)

    basket.anchor.set(0.5);
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

  let hollBall;
  async function HollBall() {
    const textureBasket = await PIXI.Assets.load(
      require(`@/assets/images/balls/hole.png`)
    );
    const basket = new PIXI.Graphics();
    basket.width = radius * 7.5;
    basket.height = radius * 7.5;
    basket.x = width / 2 - basket.width / 2;
    basket.y = 0;
    basket.zIndex = -1

    app.stage.addChild(basket);
    hollBall = basket
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

  let indexRemoveParticle = 0
  function RemoveParticle(body) {
    for (let i = 0; i < sceneObjects.length; i++) {
      if (sceneObjects[i].body.id === body.id) {
        Composite.remove(engine.world, sceneObjects[i].body);
        app.stage.removeChild(sceneObjects[i].sprite);
        sceneObjects.splice(i, 1);
        ++indexRemoveParticle
      }
    }

    if (indexRemoveParticle === 6) {
      modal.classList.add('modal_active')
    }
  }

  function map(rows) {
    radius = width / rows.length / 8;
    mapGap = 3.3;
    gap = radius * 2 * mapGap;
    HollBall()
    Lever()
    Lines()
    LinesTwo()

    let col = 3;
    const increment = 1;

    for (let i = 1; i <= rows.length; i++) {
      const space = (width - gap * col) / 2;
      for (let j = 1; j <= col; j++) {
        if (i < rows.length) {
          new Point(space + j * gap - radius * mapGap, i * gap + 40, radius);
        } else {
          Basket(
            space + j * gap - radius * mapGap,
            i * gap + 40,
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
    const y = 0;
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
    Lever,
    bet,
  };
}