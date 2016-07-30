var socket;

var r, g, b;
function setup() {
  createCanvas(windowWidth, windowHeight);

  r = random(255);
  g = random(255);
  b = random(255);

  background(r, g, b);

  socket = io.connect('https://jc-mean-lab.herokuapp.com');

  socket.on('mouse',

    function(data) {
      // console.log("Got: " + data.x + " " + data.y);
      var red = random(255);
      var green = random(255);
      var blue = random(255);
      fill(red,green,blue);
      noStroke();
      ellipse(data.x, data.y, 80, 80);
    }
  );
  socket.on('color', function(data) {
      // console.log("Got: " + data.r + " " + data.g + " " + data.b + " " + data.v);
      background(data.r, data.g, data.b, data.v);
    }
  );
}

function mouseMoved() {

  var red = random(255);
  var green = random(255);
  var blue = random(255);
  fill(red,green,blue);
  noStroke();
  rect(mouseX, mouseY, 80, 80)

  sendmouse(mouseX,mouseY);
}

function sendmouse(xpos, ypos) {
  // console.log("sendmouse: " + xpos + " " + ypos);
  var data = {
    x: xpos,
    y: ypos
  };

  socket.emit('mouse',data);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
