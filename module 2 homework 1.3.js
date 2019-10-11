
function setup() {
  createCanvas(500, 500);
  
  noLoop();
}

function draw() {
  background(220);
  clear();
  
  stroke(0);
  strokeWeight(1);
  fill(0);
  
  lewitt154();
}


document.addEventListener('click', function (event) {
  
  
}, false);

function lewitt154(){
  noFill();
  strokeWeight(2);
  
  square(10,10,width*0.90);
  stroke(255,0,0);
  line(10,height/2,width*.90*.75,height/2);
  
  
  
  
}

