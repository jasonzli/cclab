let color;
let radius;
let currentColor;
let position;

function setup() {
  createCanvas(400, 400);
  radius = random(0,200);
  color = {red: random(0,255),
           blue: random(0,255),
           green: random(0,255)
          };
  currentColor = {
    red: color.red,
    blue: color.blue,
    green: color.green
  };
  
  position = 
    {
      one : { x: random(50,350), y: random(50,350)},
      two : { x: random(50,350), y: random(50,350)}
  };
  
  currentPosition = position;
}

function draw() {

  
  currentColor = {
    red: lerp(currentColor.red,color.red,0.1),
    
    blue: lerp(currentColor.blue,color.blue,0.1),
    
    green: lerp(currentColor.green,color.green,0.1)
  };
  
  currentPosition = {
    one : { x: lerp(currentPosition.one.x,position.one.x,0.4),
            y: lerp(currentPosition.one.y,position.one.y,0.4)},
     two : { x: lerp(currentPosition.two.x,position.two.x,0.4),
            y: lerp(currentPosition.two.y,position.two.y,0.4)},
  
  };
  
  clear();
  background(220);
  stroke(255);
  fill(currentColor.red,currentColor.blue,currentColor.green);
  
  
  ellipse(currentPosition.one.x,currentPosition.one.y,radius,radius);
  
  noStroke();
  
  ellipse(currentPosition.two.x,currentPosition.two.x,radius,radius);
  
  
}

function randomColor(){
 color = {red: random(0,255),
           blue: random(0,255),
           green: random(0,255)
          };
}


function randomLocation(){
   position = 
    {
      one : { x: random(50,350), y: random(50,350)},
      two : { x: random(50,350), y: random(50,350)}
  };
}

document.addEventListener('click', function (event) {

	randomColor();
  randomLocation();
  
  console.log(position);
  
}, false);