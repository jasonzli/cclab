// Examples use OpenWeatherMap API:
// https://openweathermap.org/current

let weather;
let img;

var wind_speed;
var wind_direction;

var weather_color = '#FFFFFF';

let rain_on;
let rain_limit;
let raindrops = [];

var drop = 20;


let gui;
let visible = false;

function preload() {

  // get weather in two locations - #1 alaska
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=Zamora&APPID=91fd537fedbaaa8022ad3b2151bf7a4c';
  weather = loadJSON(url);
  

}

function keyPressed() {
  if (key == ' ') {
    visible = !visible;
    if (visible) gui.show(); else gui.hide();
  }
}


function setup() {
  createCanvas(400, 400);
  print(weather);

  rain_on = true;
 // img = loadImage('raindrop.png');

  wind_speed = weather.wind.speed;

  gui = createGui('Settings');
  gui.addGlobals('wind_speed', 'drop','weather_color');
  gui.hide();


  // wind_direction = {
  //   'x' : cos(weather.wind.direction),
  //   'y' : sin(weather.wind.direction)
  // };

  console.log(wind_direction);
   for (let i = 0; i < 25;i++){
     raindrops.push(new Raindrop(random(width*0.10,width*0.90),random(-100,100)));
   }
}

function draw() {
  background(80);

  // if (rain_on){
  //   drawRain();
  // }



for (let i = 0; i < raindrops.length; i++) {
    raindrops[i].show();
    raindrops[i].update();
    //console.log(raindrops[i]);
  }

if (!rain_on){
    clear();
    background(80);

    text("It will be " + weather.weather["0"].main, 50, 300); 

}

//  incrementTime();
}

function drawRain(){

  for (let i = 0; i < raindrops.length; i++) {
    raindrops[i].show();
    print(raindrops[i]);
    raindrops[i].update();
  
}};

function incrementTime() {
  t = t + tSpeed;
  if (t > 1 || t < 0) {
    tSpeed = tSpeed * -1;
  }
}

// document.addEventListener('click', function (event) {

//   rain_on =  !rain_on;

//   if (!rain_on){
//       noLoop();
//   }else{
//     loop();
//   }
  
// }, false);

class Raindrop {

  constructor(xVal, yVal) {
    this.x = xVal;
    this.y = yVal;
    this.dropspeed = drop;
  }

  update() {
    this.x = lerp(this.x, this.x + wind_speed,.9);
    this.y = lerp(this.y, this.y + drop,.9);


    if (this.y > height){
      this.y = random(-20,-10);
    }

    if (this.x > width || this.x < 0){
      this.x = 0;
    }
    
    // this.history.push(v);
    // //console.log(this.history.length);

    // if (this.history.length > 100) {
    //   this.history.splice(0, 1);
    // }
  }

  show() {
    
    stroke(0);
    fill(weather_color);
    noStroke();
    ellipse(this.x,this.y,10,10);
    //image(img,this.x, this.y);
  }
}
