var PLAY = 1;
var END = 0;
var gameState = PLAY;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var monkey, monkeyRun, monkeyDie;
var ground;
var jungle, backgroundImage;
var sscore, score;
var size;


function preload() {
  backgroundImage = loadImage("jungle.jpg");
  monkeyRun = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png", "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkeyDie = loadAnimation("Monkey_01.png");  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function setup() {
  createCanvas(600, 400);
  background(400);
  
  jungle = createSprite(600,130,600,400);
  jungle.addImage(backgroundImage);
  jungle.scale = 1.3;
  
  ground = createSprite(100,380,200,50);
  ground.visible = false;
  
  monkey = createSprite(50,315,20,20);
  monkey.addAnimation("m",monkeyRun);
  monkey.addAnimation("d",monkeyDie)
  monkey.scale = 0.14;
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height)
  
  score = 0;
  sscore = 0;
}

function draw() {
  background(220);
  
  if(gameState == PLAY) {
    jungle.velocityX = -6;
    monkey.velocityY = monkey.velocityY + 0.8;
    sscore = Math.ceil(frameCount/frameRate());
    
    if(jungle.x < 0) {
      jungle.x = 600;
    }
    console.log(monkey.y);
    if(keyDown("space")&&monkey.y>290) {
      monkey.velocityY = -17;
    }
    
      switch(score) {
        case 10: monkey.scale = 0.16;
          break;
        case 20: monkey.scale = 0.18;
          break;
        case 30: monkey.scale = 0.2;
          break;
        case 40: monkey.scale = 0.22;
          break;
        case 50: monkey.scale = 0.24;
          break;
        case 60: monkey.scale = 0.26;
          break;
        }
    if(monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score += 2;
    }
    
    spawnBanana();
    spawnObstacle();
    
    if(obstacleGroup.isTouching(monkey)&&monkey.scale==0.14) {
        gameState = END;
    }
  }
  
    if(obstacleGroup.isTouching(monkey)&&monkey.scale!= 0.14) {
      monkey.scale = monkey.scale - 0.02;
      obstacleGroup.destroyEach();
      score-=10;
    }
  
    drawSprites();

  if(gameState == END) {
    monkey.changeAnimation("d", monkeyDie);
    
    jungle.velocityX = 0;
    monkey.velocityY = 0; 
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    if(keyDown("space")) {
      reset();
    }
    
    textSize(30);
    fill("black");
    text("Press Space to Restart",150,200);
  }
  
  monkey.collide(ground);
  
  fill("black")
  textSize(20);
  text("Survival Score: " + sscore,420,20);
  text("Score: " + score, 420, 50);
  
}

function reset() {
  gameState = PLAY;
  score = 0;
  sscore = 0;
  obstacleGroup.setLifetimeEach(0);
  bananaGroup.setLifetimeEach(0);
  monkey.changeAnimation("m", monkeyRun);
  frameCount = 0;
}

function spawnBanana() {
  if(frameCount%150==0) {
    var banana = createSprite(620,200,20,20);
    var rand = Math.round(random(160,350));
    banana.y = rand;
    banana.addImage("banana",bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.08;
    banana.lifetime = 160;
    bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if(frameCount%350==0) {
    var obstacle = createSprite(620,325,20,20);
    obstacle.addImage("obstacle", obstacleImage)
    obstacle.velocityX = -6;
    obstacle.scale = 0.25;
    obstacle.lifetime = 160;
    obstacle.setCollider("circle", 0, 0,200);
    obstacleGroup.add(obstacle);
  }
}