// Examples use OpenWeatherMap API:
// https://openweathermap.org/current

let lewittDrawing;

let canvasPoints;

let randomCanvasColor;

let pyramidColors;

let i;
let myw;
let myh;
let ncolors;
let seeds_x;;
let seeds_y;
let seed_colors;

let minDistance;
let minIndex;

function preload() {

  
}

function setup() {
  createCanvas(1000, 1000);

 i = 0;
 myw = 1000;
 myh = 1000;
 ncolors = 28;
 seeds_x = [];
 seeds_y = [];
 seed_colors = [ncolors];
 for (let k = 0; k < ncolors; k++){
  seed_colors[k] = {};
 }
console.log(seed_colors);
 smooth();

  canvasPoints = {
    "upperLeft" : 
    {
      "x" : 0,
      "y" : 0
    },"upperRight" : 
    {
      "x" : width,
      "y" : 0
    },"upperMiddle" : 
    {
      "x" : width/2,
      "y" : 0
    },"middleLeft" : 
    {
      "x" : 0,
      "y" : height/2
    },"middleMiddle" : 
    {
      "x" : width/2,
      "y" : height/2
    },"middleRight" : 
    {
      "x" : width,
      "y" : height/2
    },"lowerLeft" : 
    {
      "x" : 0,
      "y" : height
    },"lowerMiddle" : 
    {
      "x" : width/2,
      "y" : height
    },"lowerRight" : 
    {
      "x" : width,
      "y" : height
    }
  }
for (let k = 0; k < ncolors; k++)
  {
      seed_colors[k] = {
      "r" : random(0,255),
      "g" : random(0,255),
      "b" : random(0,255)
    }
  }
  lewittDrawing = 0;

  randomCanvasColor = {
    "r" : random(0,255),
    "g" : random(0,255),
    "b" : random(0,255)
  }

  

  for(let k =0; k < ncolors; k = k+1)
    {
        // Keep them not too close to the borders, otherwise it's not fun
        // TODO: should also check that two or more are not generated in the same spot!
        seeds_x[k] = random(20, myw - 20);
        seeds_y[k] = random(20, myh - 20);
    }
    
}

function draw() {
  background(230);

  switch(lewittDrawing){
    case 0:
    lewitt462();
     
      break;
    case 1:
    lewitt439();

      break;
    case 2:
      for(let px = 0; px < myw; px = px +1)
    {
         for(let py = 0; py < myh; py = py +1)
         {
             // Check distances to colors
             minDistance = ((px  - seeds_x[0]) * (px - seeds_x[0])) +  ((py  - seeds_y[0]) * (py  - seeds_y[0]));
             minIndex = 0;

             for (let nc = 1; nc < ncolors; nc = nc+1)
             {
                 let dist = ((px  - seeds_x[nc]) * (px - seeds_x[nc])) +  ((py  - seeds_y[nc]) * (py  - seeds_y[nc]));
                 
                 if (dist <= minDistance)
                 {
                     minDistance = dist;
                     minIndex = nc;
                }
            }
            // Distance has been picked. Color!
            //set(px, py, seed_colors[minIndex]);
            //line(0, 7, 85, 75);
            stroke(seed_colors[minIndex].r,seed_colors[minIndex].g,seed_colors[minIndex].b)
            point(px, py);
        }
    }

    strokeWeight(4);
    //divide the page in pieces

    let columns = height/10;
    let row = width/10;

    stroke(0);
    strokeWeight(10);

    for (let k = 0; columns*k < height; k++){
      line(0,columns*k,width,columns*k);
    }
    for (let k = 0; row*k < height; k++){
      line(row*k,0,row*k,height);
    }

    noLoop();
      break;
  }

}

function lewitt462(){
   for (let i=15; i > 0; i--){
        stroke(0);
        fill (230);
        strokeWeight(6);
        circle(canvasPoints.upperMiddle.x,canvasPoints.upperMiddle.y,100*i);
      }
      for (let i=10; i > 0; i--){
        stroke(0);
        fill (230);
        strokeWeight(6);
        circle(canvasPoints.lowerRight.x,canvasPoints.lowerRight.y,100*i);
      }
}


function lewitt439(){

  background(randomCanvasColor.r,randomCanvasColor.g,randomCanvasColor.b);

  stroke(0);
  strokeWeight(0);
  //calculate potential endpoints
  let pyramidPoints = {};
  let direction = 1;



  if (pyramidData.origin.x > width/2){
    direction = -1;
  }
  let lastPoints = {"x": pyramidData.origin.x+ direction*pyramidData.length*.5,
  "y": pyramidData.origin.y+pyramidData.length};
  for (let i = 1; i < pyramidData.numberOfSides; i++){
    fill(pyramidData["color"+i].r,pyramidData["color"+i].g,pyramidData["color"+i].b);
    
    let tempPoints = {"x": lastPoints.x + direction+random(200,220),
                     "y": lastPoints.y + sin(180+i*20)*random(40,60)};

    triangle(lastPoints.x,lastPoints.y,
      pyramidData.origin.x,pyramidData.origin.y,
      tempPoints.x, tempPoints.y);

    lastPoints = tempPoints;
  }
  noLoop();


}

document.addEventListener('click', function (event) {
  loop();
  lewittDrawing = lewittDrawing + 1;
  if (lewittDrawing > 2){
    lewittDrawing = 0;
  }
  
  pyramidData = {
    "length" : random(height*.60, height*.80),
    "numberOfSides": random (4,6),
    "origin" : {
      "x" : random(width*.2,width*.8),
      "y" : random(height*.05,height*.1)
    },
    "color1" : {
      "r" : random(0,255),
      "g" : random(0,255),
      "b" : random(0,255)
    },
    "color2" : {
      "r" : random(0,255),
      "g" : random(0,255),
      "b" : random(0,255)
    },
    "color3" : {
      "r" : random(0,255),
      "g" : random(0,255),
      "b" : random(0,255)
    },
    "color4" : {
      "r" : random(0,255),
      "g" : random(0,255),
      "b" : random(0,255)
    },
    "color5" : {
      "r" : random(0,255),
      "g" : random(0,255),
      "b" : random(0,255)
    },
    "color6" : {
      "r" : random(0,255),
      "g" : random(0,255),
      "b" : random(0,255)
    },
  }
}, false);

class Raindrop {

  constructor(xVal, yVal) {
    this.x = xVal;
    this.y = yVal;
    this.dropspeed = 22;
  }

  update() {
    this.x = lerp(this.x, this.x + wind_speed,.9);
    this.y = lerp(this.y, this.y + 22,.9);


    if (this.y > height){
      this.y = random(-20,-10);
    }

    if (this.x > width || this.x < 0){
      this.x = random(width*0.10,width*0.90);
    }
    
    // this.history.push(v);
    // //console.log(this.history.length);

    // if (this.history.length > 100) {
    //   this.history.splice(0, 1);
    // }
  }

  show() {
    
    stroke(0);
    fill(255);
    ellipse(this.x,this.y,10,10);
    //image(img,this.x, this.y);
  }
}
