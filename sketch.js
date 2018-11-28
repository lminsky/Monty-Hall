var doors = [];
var numDoors = 3;
var state = 0;
var winner;
var touchInProgress = false;
var winCount = 0;
var gameCount = 0;

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);
  start();
}

function draw() {
  background(230, 230, 180);
  for(var i in doors) {
    doors[i].display();
  }
  
  var headText;
  if(state == 0) {
    headText = "Select a door";
  } else if(state == 1) {
    headText = "You can switch if you want"
  } else if(state == 2) {
    var rounds;
    gameCount == 1 ? rounds = "round" : rounds = "rounds";
    var percent = round(100*winCount/gameCount);
    headText = "You've won " + winCount + " out of " + gameCount + " " + rounds +" (" + percent + "%)\nClick to start again";
  }
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(28);
  text(headText, width/2, height/16);
}

function touchStarted() {
  if(!touchInProgress) {
    touchInProgress = true;
    if(state == 0) {
      for(var i in doors) {
        if(doors[i].select(mouseX, mouseY)) {
          doors[i].sel = true;
          var d = [];
          for(var j in doors) {
            if(!(doors[j].sel || doors[j].win)) {
              d.push(j);
            }
          }
          var reveal = floor(random(0, d.length));
          doors[d[reveal]].open = true;
          state = 1;
        }
      }
    } else if(state == 1) {
      var doorIndex = -1;
      for(var i in doors) {
        if(doors[i].select(mouseX, mouseY)) {
          doorIndex = i;
        }
      }
      if(doorIndex != -1) {
        for(var i in doors) {
          doors[i].sel = false;
          if(doors[i].select(mouseX, mouseY)) {
            doors[i].open = true;
            doors[i].sel = true;
            if(doors[i].win) {
              winCount++;
            }
          }
        }
        state = 2;
      }
    } else if(state == 2) {
      start();
    }
  }
}

function touchEnded() {
  touchInProgress = false;
}

function start() {
  doors = [];
  winner = floor(random(0, numDoors));
  for(var i = 0; i < numDoors; i++) {
    new Door(winner == i);
  }
  state = 0;
  gameCount++;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Door(winner) {
  this.win = winner;
  this.open = false;
  this.sel = false;
  doors.push(this);

  this.display = function() {
    var w = width/(doors.length+1);
    var h = height*2/3;
    var i = doors.indexOf(this);
    var g = w/(doors.length+1);

    if(this.open) {
      noFill();
    } else {
      fill(102, 51, 0);
    }
    strokeWeight(5);
    stroke(0);
    rect(g + (i * (w + g)), height/6, w, h);
    strokeWeight(1);
    noStroke();
    if(!this.open) {
      fill(112, 61, 10);
      rect(g + (i * (w + g)) + w/6, height/6 + w/6, w - w/3, h - w/3);
      fill(255, 255, 0);
      ellipse(g + (i * (w + g)) + w*18/20, height/2, w/20);
    }
    if(this.open) {
      fill(255, 0, 0);
      var dispText = "🐐";
      // var dispText = "Nothing";
      if(this.win) {
      fill(0, 255, 0);
        dispText = "💰";
        // dispText = "Winner";
      }
      textSize(64);
      textAlign(CENTER, CENTER);
      text(dispText, g + (i * (w + g)) + w/2, height/2);
    } 
    if(this.sel) {
      textSize(48);
      textAlign(CENTER, CENTER);
      fill(0, 0, 255);
      // text("Selected", g + (i * (w + g)) + w/2, height/2);
      text("☝️", g + (i * (w + g)) + w/2, height - height/12);
    }
  };

  this.select = function(x, y) {
    var w = width/(doors.length+1);
    var h = height*2/3;
    var i = doors.indexOf(this);
    var g = w/(doors.length+1);
    rect(g + (i * (w + g)), height/6, w, h);
    if(x > g + (i * (w + g)) && x < g + (i * (w + g)) + w) {
      if(y > height/6 && y < height/6 + h) {
        return true;
      }
    }
  };
}