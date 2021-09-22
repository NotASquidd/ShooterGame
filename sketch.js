var PLAY = 1;
var END = 0;
var gameState = PLAY;
var player1, player2, player1Img, player2Img;
var player1bulletImg, player2bulletImg;
var player1bullet, player2bullet;
var bg, bgImg;
var player1Group, player2Group;
var player1Health = 3;
var player2Health = 3;

function preload(){
player1Img = loadImage("player1Img.png");
player2Img = loadImage("player2Img.png");
bgImg = loadImage("bgImg.jpg")
player1bulletImg = loadImage("player1bullet.png")
player2bulletImg = loadImage("player2bullet.png")

}

function setup() {
createCanvas(windowWidth,windowHeight);

player1 = createSprite(displayWidth-1159, displayHeight-300,50,50);
player1.addImage(player1Img);
player1.scale = 0.5;
player1.debug = true;
player1.setCollider("rectangle",0,0,300,300);

player2 = createSprite(displayWidth-1259, displayHeight-800,50,50)
player2.addImage(player2Img);
player2.scale = 0.5;
player2.debug = true;
player2.setCollider("rectangle",0,0,300,300);

player1Group = new Group()
player2Group = new Group()

}

function draw(){
background(bgImg);
textSize(30)
fill(255)
text("Player Health "+ player2Health, displayWidth - 300, 50 )
text("Player Health "+ player1Health, 100, 900 )
if(gameState === PLAY){

if(keyDown('d')){
 player1.x +=10
}

if(keyDown('a')){
    player1.x -=10
}

if(keyDown('right_arrow')){
 player2.x +=10
}

if(keyDown('left_arrow')){
 player2.x -=10
}

if(keyWentDown('w')){
  Bullet1()
}

if(keyWentDown(UP_ARROW)){
  Bullet2()
}

for(var i = 0; i < player1Group.length; i++){
 if(player2.isTouching(player1Group.get(i))){
    player1Group.get(i).destroy();
    player2Health -=1;
 }
}

for(var i = 0; i < player2Group.length; i++){
  if(player1.isTouching(player2Group.get(i))){
     player2Group.get(i).destroy();
     player1Health -=1;
  }
 }
 
 if(player1Health == 0 || player2Health == 0){
   gameState = END
 }
}
else if (gameState === END){
  if(player1Health == 0){
    textSize(50)
    text("TOP PLAYER WINS! ", displayWidth /2 -270, displayHeight /2 -75);
  }
  if(player2Health == 0){
    textSize(50)
    text("BOTTOM PLAYER WINS! ", displayWidth /2 -270, displayHeight /2 -75);
  }

}
  drawSprites();
}

function Bullet1(){
  player1Bullet = createSprite(player1.x,player1.y);
  player1Bullet.addImage(player1bulletImg);
  player1Bullet.velocityY = -20;
  player1Bullet.scale = 0.1;
  player1Group.add(player1Bullet);
}

function Bullet2(){
  player2Bullet = createSprite(player2.x,player2.y);
  player2Bullet.addImage(player2bulletImg);
  player2Bullet.velocityY = 20;
  player2Bullet.scale = 0.1;
  player2Group.add(player2Bullet);
}
