var doors = 3;
var speed = 5;
var swap = 0;
var stay = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  var search = int(location.search.substring(1));
  if(search) speed = search;
  frameRate(speed);
}

function draw() {
  background(230, 230, 180);
  var winner = floor(random (0, doors));
  var pick = floor(random(0, doors));
  if(winner == pick) {
    stay++;
  } else {
    swap++;
  }
  line(width/2, height/8, width/2, height - height/8);
  textSize(width/8.25);
  textAlign(CENTER, CENTER);
  text("Staying", width/4, height/3);
  text("Swaping", width*3/4, height/3);
  text(stay, width/4, height*2/3);
  text(swap, width*3/4, height*2/3);
  textSize(width/50);
  text("First pick is " + (pick+1) + "\nWinner is " + (winner+1), width/2, height - height/16);
  text("Win by...", width/2, height/16);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}