var dog, happyDog, sadDog;
var foodObj;
var foodS, foodStock;
var fedTime, feed, addFood;

function preload(){
	sadDog = loadImage("Dog.png");
  happyDog = loadImage("Happydog.png");
}

function setup() {
	createCanvas(500,500);
  db = firebase.database();
  
  foodObj = new Food();

  foodStock = db.ref("Food");
  foodStock.on("value", readStock);
  textSize(20)

  dog=createSprite(250,300,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  food=createButton("Feed the dog");
  food.position(700,95);
  food.mousePressed(feedDog);

  addFood.createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();

  })

  fill(255,255,255);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed: "+ lastFed%12+ "PM", 350, 30);
  }
  else if(lastFed == 0){
    text("Last Feed: 12AM", 350, 30);
  }
  else {
    text("Last Feed: "+ lastFed+ "AM"+ 350, 30);
  }


  drawSprites();
  

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
