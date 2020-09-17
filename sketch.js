var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey, jungle, invisibleGround;
var monkeyImage;
var jungleImage, bananaImage, stoneImage;
var sTime, bAcquired;

var foodGroup, obstaclesGroup;

var banana, fY;
var stone;

function preload() {
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")

  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600, 200);

  jungle = createSprite(500, 0, 10, 10);
  jungle.addImage("back ground", jungleImage);
  jungle.scale = 1;

  monkey = createSprite(140, 140, 20, 50);
  monkey.addAnimation("running", monkeyImage);
  monkey.scale = 0.12;

  invisibleGround = createSprite(300, 176, 600, 5);
  invisibleGround.visible = false;

  foodGroup = new Group();
  obstaclesGroup = new Group();

  sTime = 0;
  bAcquired = 0;
}

function draw() {
  background(220);

  monkey.setCollider("rectangle", 0, 0, 200, 620, 50);

  if (gameState === PLAY) {
    food();
    obstacles();

    movingGround();

    sTime = sTime + 1;

    if (monkey.isTouching(invisibleGround)) {
      monkey.collide(invisibleGround);
      jump();
    }

    monkey.velocityY = monkey.velocityY + 0.5;

    points();

    gameOver();

  } else if (gameState === END) {
    monkey.velocityY = 0;
    
    jungle.velocityX = 0;
    
    foodGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
  }

  drawSprites();

  fill(rgb(255, 203, 164));
  stroke("brown");
  textSize(20);
  strokeWeight(3);
  text("Survival Time:  " + sTime, 350, 30);

  fill("yellow");
  stroke("black");
  textSize(20);
  strokeWeight(2);
  text("Bananas Acquired:  " + bAcquired, 350, 60);
}

function food() {
  if (World.frameCount % 80 === 0) {
    fY = random(50, 90);
    banana = createSprite(630, fY);
    banana.addImage("Food", bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 230;
    foodGroup.add(banana);
  }
}

function obstacles() {
  if (World.frameCount % 180 === 0) {
    stone = createSprite(630, 145);
    stone.addImage("obstacle", stoneImage);
    stone.scale = 0.19;
    stone.velocityX = -4;
    stone.setCollider("circle", 10, 40, 210);
    stone.lifetime = 230;
    obstaclesGroup.add(stone);
  }
}

function movingGround() {
  jungle.velocityX = -4;
  if (jungle.x < 150) {
    jungle.x = 500;
  }
}

function jump() {
  if (keyDown("space")) {
    monkey.velocityY = -11;
  }
}

function points() {
  if (foodGroup.isTouching(monkey)) {

    bAcquired = bAcquired + 1;
    foodGroup.destroyEach();
    
    switch (bAcquired){
      case 2: monkey.scale=0.14;
        break;
      case 5: monkey.scale=0.16;
        break;
      case 10: monkey.scale=0.18;
        break;
      case 15: monkey.scale=0.2;
        break;
      case 20: monkey.scale=0.25;
        break;
    }
      
  }
}

function gameOver() {
  if (obstaclesGroup.isTouching(monkey)) {
    gameState=END
    monkey.scale=0.09
  }
}
