var dog,dogImg;
var happyDog,happyDogImg;
var database;
var foodS;
var foodStock;

var lastFed;
var foodObj;
var fedTime;
var addFood;
var feed;
// var backImg;//special;
var gameState;
var changingGameState;
var readGameState;
var bedroom, bedroomImg;
var garden, gardenImg;
var washroom, washroomImg;
var background, backgroundImg;



function preload()
{
  dogImg=loadImage("images1/Dog.png")
  happyDogImg =loadImage("images1/happy dog.png")
  bedroomImg=loadImage("images1/Bed Room.png")
  gardenImg=loadImage("images1/Garden.png")
  washroomImg=loadImage("images1/Wash Room.png")
  sadDog=loadImage("images/dogImg1.jpg")
  // backImg = loadImage("images/backImg.jpg")
  
}

function setup() {

  
  database = firebase.database();
  createCanvas(500, 500);
  
  foodObj = new Food();
  
   foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  // textSize(20)

 
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  readGameState=database.ref("gameState");
  readState.on("value",function(data){
    gameState=data.val();
  });

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg)
  dog.scale=0.15;

  feed=createButton("Feed the dog")
  feed.position(500,95)
  feed.mousePressed(feedDog);

  addFood= createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);


}


function draw() {  
  // background("black");//backImg
  // fill("yellow")
  // strokeWeight(4)
  // stroke("red")
  // textFont("Bold")
  // textSize(20)

currentTime=hour();
if(currentTime==(lastFed+1)){
  update("Playing")
  foodObj.garden()
}else if(currentTime==(lastFed+2)){
  update("Sleeping")
  foodObj.bedroom()
}else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
  update("Bathing")
  foodObj.washroom()
}else{
  update("Hungry")
  foodObj.display()
}

if(gameState!="Hungry"){
  feed.hide()
  addFood.hide()
  dog.remove()
  
}else{
  feed.show()
  addFood.show()
  dog.addImage(sadDog)
}




foodObj.display();


  drawSprites();
  //add styles here

  fill("yellow");
  strokeWeight(4);
  stroke("red");
  text("Food Remaining : "+foodS,170,380);
  textSize(20);
  text("Note: Press the Buttons To Feed Drago Milk!!",90,10,500,500)
 

  // fill("yellow")
  // text(mouseX+","+mouseY,mouseX,mouseY)
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime: lastFed,
    currentTime:hour(),
     gmaeState : "Hungry"
    
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

