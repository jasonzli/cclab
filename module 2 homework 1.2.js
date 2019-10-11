let length;
let angle;
let numLines;

function setup() {
  createCanvas(500, 500);
  
  length = 4;
  angle = random(0,360);
  numLines = 10000;
  noLoop();
}

function draw() {
  background(220);
  clear();
  
  stroke(0);
  strokeWeight(1);
  fill(0);
  lewitt86();
  
}


document.addEventListener('click', function (event) {
  
  
}, false);

function lewitt86(){
  
  
  for (let i = 0; i < numLines; i++){
    let position = {x: random(50,450), y : random(50,450)};
    angle = random(0,360);
    line(position.x,position.y,position.x+length*cos(angle),position.y+length*sin(angle));
  }
}

