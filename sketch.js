//Create variables here
var dog,dogImg,happyDogImg,database,foodS,foodStock
function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png")
  happyDogImg=loadImage("dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()
  foodStock = database.ref("Food");
  foodStock.on("value",readStock)
  foodStock.set(20)

  dog=createSprite(250,350,10,60)
  dog.addImage(dogImg)
  dog.scale=0.2;
}


function draw() {  
background(46,139,87)
if(foodS!== undefined){
  textSize(15)
  fill("black")
  text("NOTE : Press UP_ARROW KEY to feed CRUNSY milk",70,50)
  text("Food Remaining: "+foodS,180,200)
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg)

  }
if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg)
}

if(foodS === 0){
  foodS = 0;
  dog.addImage(dogImg)
}

drawSprites()

}
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  } else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  });
  }
