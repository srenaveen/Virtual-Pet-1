var dog, happyDog, hungryDog, database, foodS, foodStock;

function preload()
{
  happyDog = loadImage("dogImg.png");
  hungryDog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  foodStock = database.ref(food);
  foodStock.on("value",readStock);
  var dog = createSprite(100,350,50,50);
  dog.addImage(hungryDog);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  textSize(20);
  fill("white");
  text("press UP arrow to feed astro",250,10);
  text("Food: " + foodS,250,10);

  drawSprites();
}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x = 0
  } else{
    x = x-1
  }
  database.ref('/').update({
    food: x
  })
}



