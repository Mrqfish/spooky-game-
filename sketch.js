var  tower,towerImg;
var door,doorImg;
var climber,climberImg;
var doorsGroup,climbersGroup;
var ghost,ghostImg;
var inviBlock,invGroup;
var gameState = "play";
var spooksound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spooksound = loadSound("spooky.wav")

  }

function setup(){
  createCanvas(600,600)
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=2;

  ghost = createSprite(200,200);
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.3;
  
  spooksound.loop();

  climbersGroup = new Group();
  doorsGroup = new Group();
  invGroup = new Group();
  }

function draw(){
  background("black");

  if(gameState==="play"){
  
  

  if(tower.y>300){
  tower.y=200;
  }
  
  if(keyDown("left_arrow")){
   ghost.x=ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
   ghost.x=ghost.x+3;
  }
  
  if(keyDown("SPACE")){
   ghost.velocityY=-5
  }
  ghost.velocityY=ghost.velocityY+0.5;
  
  SpawnDoor();
  
  if(climbersGroup.isTouching(ghost)){
   ghost.velocityY=0;
  }
  
  if(invGroup.isTouching(ghost) || ghost.y>600 ){
  gameState="end";
  ghost.destroy();
  }
  
  
  drawSprites();
  }
  if(gameState==="end"){
  textSize(70);
  fill("red");
  text("GAME OVER",90,300);
  spooksound.stop();
  }
  }

function SpawnDoor(){
  if(frameCount%240===0){

  door=createSprite(200,-50);
  door.x=Math.round(random(120,400))
  door.addImage("door",doorImg);
  door.velocityY=2;
  door.lifetime=800;
  door.depth = ghost.depth;
  ghost.depth +=1;

  climber=createSprite(200,10)
  climber.addImage("climber",climberImg);
  climber.x=door.x;
  climber.velocityY=2
  climber.lifetime=800;
  
   inviBlock=createSprite(200,15,climber.width,2)
   inviBlock.velocityY=2;
   inviBlock.x = climber.x
   inviBlock.lifetime=800
   inviBlock.debug=true;

  climbersGroup.add(climber);
  doorsGroup.add(door);
  invGroup.add(inviBlock);
  }
  }