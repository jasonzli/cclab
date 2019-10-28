let grid;

let totalCrawlers;
let crawlers = [];

function setup() {
  totalCrawlers = 20;
  createCanvas(400, 400);
  
  
}

function draw() {
  background(0);

  for (let i = 0; i < crawlers.length; i++) {
    crawlers[i].display();
    crawlers[i].update();
  }
}

class Grid {
  constructor(){
    this.xSize=1;
    this.ySize=1;
  }
}

document.addEventListener('click', function (event) {
    for (let i = 0; i < totalCrawlers; i++) {
        crawlers.push(new Crawler(mouseX, mouseY));
      }
    
}, false);


class Crawler{
  
    constructor(cursorX,cursorY){
      this.xPos = cursorX;
      this.yPos = cursorY;
      this.diameter = random(10, 30);
      this.speed = random(3,7);
      this.direction = int(random(0,7));
      this.life = int(random(4,8));
      
      
      this.target = {
        "x" : this.xPos+this.speed*cos(PI/2*this.direction),
        "y" : this.xPos+this.speed*sin(PI/2*this.direction)
      }
      
    }

    setNewTarget(){
        
        this.direction = int(random(0,7));
        this.target = {
            "x" : this.xPos+this.speed*cos(PI/2*this.direction),
            "y" : this.xPos+this.speed*sin(PI/2*this.direction)
            }
    }

    update(){

        let newX = lerp(this.xPos,this.target.x,.8);
        let newY = lerp(this.yPos,this.target.y,.8);

        if ((newX % this.xPos == 0) && (newY % this.yPos == 0)){
            this.setNewTarget();
        }

        this.xPos = newX;
        this.yPos = newY;
    }
    
    display() {
      push();
        rectMode(CENTER);
        fill(0,255,0);
        noStroke();
        rect(this.xPos,this.yPos,this.speed,this.speed);
      pop();
    }
}