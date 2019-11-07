let grid;

var totalCrawlers = 20;
let crawlers = [];
var minSpeed = 20;
var maxSpeed = 40;
var minAngle = 45; 
var particleColor = '#ff0000';

let mode = [];
let modeValue;


let gui;
let visible = false;


function setup() {
  createCanvas(400, 400);
  modeValue = 0;

  mode[0] = 'regular';
  mode[1] = 'shoot';
  mode[2] = 'expected';

  gui = createGui('Settings');
  gui.addGlobals('totalCrawlers', 'minSpeed', 'maxSpeed', 'minAngle', 'particleColor');
  gui.hide();
}

function draw() {
  background(0);

  for (let i = 0; i < crawlers.length; i++) {
    crawlers[i].update(mode[modeValue]);
    crawlers[i].display();
  }
}

class Grid {
  constructor(){
    this.xSize=1;
    this.ySize=1;
  }
}

// document.addEventListener('keypress', function(event){
//     modeVal++;
//     if (modeVal > 2){
//         modeVal = 0;
//     }
// });



document.addEventListener('click', function (event) {
    for (let i = 0; i < totalCrawlers; i++) {
        crawlers.push(new Crawler(mouseX, mouseY));
      }
    
}, false);

function keyPressed() {
  if (key == ' ') {
    visible = !visible;
    if (visible) gui.show(); else gui.hide();
  }
}


class Crawler{
  
    constructor(cursorX,cursorY){
      this.xPos = cursorX;
      this.yPos = cursorY;
      this.diameter = random(3, 9);
      this.speed = random(minSpeed,maxSpeed);
      this.direction = int(random(0,9));
      this.life = int(random(4,8));
      
      
      this.target = {
        "x" : cursorX+this.speed*cos(minAngle*this.direction),
        "y" : cursorY+this.speed*sin(minAngle*this.direction)
      }
      console.log(this.target);
    }

    setNewTarget(self){
        
        let direction = int(random(0,7));
        self.target = {
            "x" : self.xPos+self.speed*cos(minAngle*direction),
            "y" : self.yPos+self.speed*sin(minAngle*direction)
            }//the weird bug was caused by linking both values to the x
            //this caused y=x line
    }

    update(mode){

         let newX = lerp(this.xPos,this.target.x,.8);
         let newY = lerp(this.yPos,this.target.y,.8);
        
        if ((newX % this.xPos == 0) && (newY % this.yPos == 0)){
            this.setNewTarget(this);
        }
        
        this.xPos = newX;
        this.yPos = newY;
    }
    
    display() {
      push();
        rectMode(CENTER);
        fill(particleColor);
        noStroke();
        rect(this.xPos,this.yPos,this.diameter,this.diameter);
      pop();
    }
}