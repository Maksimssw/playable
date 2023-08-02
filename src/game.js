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
    antialias: true,
    resolution: 2,
    autoDensity: true
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

  let radius;
  let gap;
  let mapGap;
  let count = 0;

  function collisionStart(event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      if (bodyA.label === "point") Splash(bodyA);
      if (bodyA.label === "basket" && bodyB.label === "particle") {
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
      y: 3
    });
  }

  function Splash(body) {
    const graphics = new PIXI.Graphics();
    graphics.beginFill("0xb2de27");
    graphics.drawCircle(
      body.position.x,
      body.position.y,
      body.circleRadius * 2
    );
    graphics.alpha = 0.2;
    graphics.zIndex = 1;
    graphics.endFill();
    app.stage.addChild(graphics);

    setTimeout(() => {
      app.stage.removeChild(graphics);
    }, 400);
  }

  function Particle(x, y, r, index) {
    const options = {
      restitution: 1,
      friction: 0,
      frictionAir: 0.04,
      collisionFilter: {
        group: -1
      }
    };

    const body = Bodies.circle(x, y, r, options);
    body.label = "particle";
    body.index = index + 2;
    Composite.add(engine.world, body);

    const colors = [
      "FFFFFF",
    ];
    const color = colors[Math.ceil(Math.random() * colors.length - 1)];

    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawCircle(0, 0, r);
    graphics.endFill();
    app.stage.addChild(graphics);

    sceneObjects.push({
      body: body,
      sprite: graphics
    });
  }

  function Point(x, y, r) {
    const options = {
      isStatic: true
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
    };

    const rightOptions = {
      isSensor: true,
      isStatic: true,
      angle: 180 / 2
    };

    const leftOptions = {
      isSensor: true,
      isStatic: true,
      angle: (180 / 2) * -1
    };

    const body = Bodies.rectangle(x, y, gap, gap, options);
    body.label = "basket";
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

    const textureBasket = await PIXI.Assets.load(require(`@/assets/images/boxes/${text}.png`));
    const basket = PIXI.Sprite.from(textureBasket);
    basket.x = x;
    basket.y = y;
    basket.width = radius * 5.2;
    basket.height = radius * 3.5;
    basket.anchor.set(0.5);
    app.stage.addChild(basket);
  }

  function HollBall() {
    const gr = new PIXI.Graphics();
    gr.beginFill(0x000);
    gr.drawCircle(width / 2, 20, 10);
    gr.endFill();
    app.stage.addChild(gr);
  }

  function Border(x, y, side) {
    const options = {
      isStatic: true,
      angle: side === "right" ? (180 / 2) * -1 : 180 / 2
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
    HollBall()

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
            Border(space + j * gap - radius * mapGap, i * gap + 20, "left");
          }
          if (j === col) {
            Border(space + j * gap - radius * mapGap, i * gap + 20, "right");
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
    clear
  };
}
