const Engine=Matter.Engine;
const World=Matter.World;
const Body=Matter.Body;
const Bodies=Matter.Bodies;

let engine;
let world;

var backgroundimg;
var sub;
var subimg;
var wall1;
var wall2;
var wall3;
var wall4;
var hunter;
var hunters=[];
var launcher;
var missile;
var missiles=[];

function preload() {
  backgroundimg=loadImage("background.jpeg");
  subimg=loadImage("sub.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine=Engine.create();
  world=engine.world;

  sub=createSprite(190, height/2, 50, 50);
  sub.addImage(subimg);
  sub.scale=0.75;

  wall1=createSprite(0, height/2, 1, height*2);
  wall2=createSprite(width-940, height/2, 1, height*2);
  wall3=createSprite(width/2, 0, width*2, 1);
  wall4=createSprite(width/2, height, width*2, 1);
  wall1.visible=false;
  wall2.visible=false;
  wall3.visible=false;
  wall4.visible=false;

  launcher=new Launcher(sub.x+50, sub.y-50, 130, 50);

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() {
  Engine.update(engine);

  background(backgroundimg);

  subcontrols();
  createhunters();
  showmissile();

  drawSprites();

  launcher.display();
  Matter.Body.setPosition(launcher.body, {x:sub.x+44, y:sub.y-50});
}

function subcontrols() {
  if (keyDown(RIGHT_ARROW)) {
    sub.x+=4;
  }
  
  if (keyDown(LEFT_ARROW)) {
    sub.x-=4;
  }
  
  if (keyDown(UP_ARROW)) {
    sub.y-=4;
  }
  
  if (keyDown(DOWN_ARROW)) {
    sub.y+=4;
  }

  sub.bounceOff(wall1);
  sub.bounceOff(wall2);
  sub.bounceOff(wall3);
  sub.bounceOff(wall4);
}

function createhunters() {
  if (frameCount%30==0) {
    hunter=new Hunter(width, random(40, height-40), 90, 60);
    hunters.push(hunter);
  }
  for (let i=0; i<hunters.length; i++) {
    hunters[i].display();
    hunters[i].move();
  }
}

function keyPressed() {
  if (keyCode==32) {
    missile=new Missile(sub.x+44, sub.y-50, 100, 30, launcher.angle);
    missiles.push(missile);
  }
}

function showmissile() {
  for (let i=0; i<missiles.length; i++) {
    missiles[i].display();
    if (!missiles[i].launched) {
      Matter.Body.setPosition(missiles[i].body, {x:sub.x+44, y:sub.y-50});
      Matter.Body.setAngle(missiles[i].body, launcher.angle);
    }
    else if (missiles[i].body.position.x>=width||missiles[i].body.position.y>=height) {
      Matter.World.remove(world, missiles[i].body);
      missiles.splice(i, 1);
    }
  }
}

function keyReleased() {
  if (keyCode==32) {
    for (let i=0; i<missiles.length; i++) {
      missiles[i].launch(launcher.angle);
      missiles[i].display();
    }
  }
}