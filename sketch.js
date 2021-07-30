const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var zombieleft,zombieright,bgImg;
var ground,wall1,wall2,bridge,joinPoint1,joinPoint2,link,stones;

function preload(){
  zombieleft = loadAnimation("./assets/zombie.png");
  bgImg = loadImage("./assets/background.png");
}

function setup() {
  rectMode(CENTER);
  ellipseMode(CENTER);

  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  zombie = createSprite(width/2,height-110);
  zombie.addAnimation("left", zombieleft);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createButton("");
  breakButton.position(width-200,height/2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);

  ground = new Base(width/2,height,width,20);
  wall1 = new Base(0,height/2,20,height);
  wall2 = new Base(width,height/2,20,height);
  bridge = new Bridge(21,{x: width-10, y: height-450});

  //Matter.Composite.add(bridge.body,joinPoint1);
  joinPoint1 = new Base(25,height-450,200,200);
  joinPoint2 = new Base(width-25,height-450,200,200);
  link = new Link(bridge,joinPoint1);

  stones = [];

  for (var i = 0; i < 8; i++){
    var x = random(width/2 - 180, width/2 + 180);
    var y = random(10, 90);
    var stone = new Stone(x,y,80,80);
    stones.push(stone);
  }
}

function draw() {
  background(bgImg);
  Engine.update(engine);

  bridge.show();

  for (var k = 0; k < stones.length; k++){
    stones[k].display();
  }

  if (zombie.position.x < 170){
    zombie.velocityX = 10;
  }
  if (zombie.position.x > width-170){
    zombie.velocityX = -10;
  }

  drawSprites();
}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  },1500);
}