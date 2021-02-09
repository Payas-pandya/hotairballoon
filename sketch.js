var balloon, balloonAnimation;
var backgroundimg, database;
var height;
function preload() {
  backgroundimg = loadImage("images/bg.png");
  balloonAnimation = loadImage("images/B1.png");
}
function setup() {
  database = firebase.database()
  createCanvas(1000,700);
  balloon = createSprite(100, 400, 50, 50);
  balloon.addImage("Hot Air Balloon", balloonAnimation);
  balloon.scale = 0.5;

  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value", readHeight)
}


function draw() {
  background(backgroundimg);
  if(keyDown(LEFT_ARROW)){
    writeHeight(-1,0);
  } 
  
  else if(keyDown(RIGHT_ARROW)){
    writeHeight(1,0);;
  }
  else if(keyDown(UP_ARROW)){
    writeHeight(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    writeHeight(0,1);
  }
  drawSprites();
}

function writeHeight(x,y)
{
  database.ref('balloon/height').set(
    {
      'x' : height.x +x,
      'y' : height.y + y
    }
  )
}

function readHeight(data)
{
  height= data.val();
  balloon.x= height.x;
  balloon.y = height.y;
}