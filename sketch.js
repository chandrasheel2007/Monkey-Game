var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, stoneImage;
var ground;
var bananaGroup, rockGroup,stone;
var count =0;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}


function setup() {
 
 stone=createSprite(350,340,20,20);
  stone.addImage("obstace",obstaceImage);
  stone.visible=false;
  //stone.velocityX=-4;
  stone.scale=0.1;
  stone.lifetime=100;
  

 monkey=createSprite(60,320,20,20);
monkey.addAnimation("monkey running",monkey_running);
monkey.scale=0.1;

 ground=createSprite(200,370,400,20);
ground.x = ground.width /2;

 rockGroup=createGroup();
 bananaGroup=createGroup();

var count =0;


}

function draw() {
  
  background("cyan");
   
  stroke("yellow");
  textSize(18);
  fill("black");
  
  text("Survival Time: "+ count, 220, 100);
  console.log(World.frameRate);
  
  if (gameState===PLAY) {
    if(keyDown("space") && monkey.y >= 195){
      monkey.velocityY = -14 ;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
     count = count+ Math.round(World.frameRate/60);
     
     ground.velocityX=-6;
     
     creatstone();
     
     creatbanana();
     
     if (ground.x>0) {
      ground.x=ground.width/2; 
     }
    
     
   
    if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
     }
    
    if (monkey.isTouching(rockGroup)) {
       gameState=END;
       
  
     }
      
     
    monkey.collide(ground);
    
  }else if (gameState===END){
  
  ground.velocityX = 0;
    monkey.velocityY = 0;
    stone.velocityX=0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    stone.lifetime=(-1);
    
      rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    rockGroup.destroyEach();
       bananaGroup.destroyEach();
       count=0;
  textSize(20);
  
  text("Game over press 'R' to restart", 70,200);
   

   
    
  }
  

  
 drawSprites();
   
 if(keyDown("r")&&gameState===END) {
    reset();
  }
       
  
}



function creatstone(){
  if(World.frameCount%300===0){
 stone=createSprite(350,340,20,20);
  stone.addImage("obstace",obstaceImage);
  stone.visible=true;
  stone.velocityX=-(4+ 3*count/100);
  stone.lifetime=100;
  stone.scale=0.1;
  
  rockGroup.add(stone);
  }
 
  
}

function creatbanana(){
  if(World.frameCount%80===0){
 banana=createSprite(random(100,350),random(120,200),20,20);
  banana.addImage(bananaImage);
  banana.velocityX=-(4+ 3*count/100);
  banana.lifetime=100;
  banana.scale = 0.1
    
  bananaGroup.add(banana);
  }
 
  
}

function reset(){
 gameState=PLAY;
  count = count+ Math.round(World.frameRate/60);
 ground.velocityX=-6;
 
}


