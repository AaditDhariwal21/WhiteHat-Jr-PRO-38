var dog,dogImg, dogImg2;
var database;
var food=20,foodStock;
var button1,button2,button3,button4;
var lastFed=0,currentTime;
var milk,milkPic;
var playground,bathroom
var gameState="Hungry";

function preload()
{
	dogImg=loadImage("dogImg.png");
  dogImg2=loadImage("dogImg1.png");
  playground=loadImage("playground.jpg");
  bathroom=loadImage("bathroom.jpg");
}

function setup() {
  database = firebase.database();
  createCanvas(800,500);

  dog = createSprite(600,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  button1 = createButton('Add Food');
  button2 = createButton('Feed Mr.Doggie');
  button3= createButton("Let's Play");
  button4= createButton("Bath Time!")

  button1.position(375,75);
  button2.position(375,110);  
  button3.position(375,145);
  button4.position(375,180);

  milk=new Food();
 
  currentTime=hour();
  console.log(currentTime);
}


function draw() {  

  background("green");
  console.log(gameState);

if(gameState=="notHungry"){
  button2.hide();
}
else if(currentTime-lastFed>4){
   gameState="Hungry"
}

 button1.mousePressed(function(){
  writeStock(food);
  food=food+1
  dog.addImage(dogImg);
 })


 button2.mousePressed(function(){
  writeStock(food);
  food=food-1;
  dog.addImage(dogImg2);
  lastFed=currentTime;
  gameState="notHungry"
   }
 )

 button3.mousePressed(function(){
   gameState="playTime"
  }
 )

 button4.mousePressed(function(){
  gameState="bathTime"
  }
 )

 if(gameState=="playTime"){
  dog.addImage(dogImg2);
  background(playground);
  dog.x=650;
 }
 
 else if(gameState=="bathTime"){
  dog.addImage(dogImg);
  background(bathroom);
  dog.x=390;
  dog.y=350;
 }

  if(gameState=="Hungry"|| gameState=="notHungry"){
  milk.display();
  textSize(40);
  fill("white");
  stroke(2);
  text("Food Remaining:"+food,200,100);
  }

  console.log(food);
  drawSprites();


}

function readStock(data){
  food=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
