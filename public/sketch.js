var socket;

var r, g, b;
function setup() {
  createCanvas(windowWidth, windowHeight);

  // r = random(255);
  // g = random(255);
  // b = random(255);

  socket = io.connect('http://localhost:3000');

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

// function mouseDragged() {

  // var red = random(255);
  // var green = random(255);
  // var blue = random(255);
  // fill(red,green,blue);
  // noStroke();
  // rect(mouseX, mouseY, 55, 55)
  // ellipse(mouseX,mouseY,80,80);
  // Send the mouse coordinates
  // sendmouse(mouseX,mouseY);
// }

// var value = 0;
// function draw() {
//   fill(r, g, b, value);
//   rect(0, 0, windowWidth, windowHeight);
// }
function mouseMoved() {
  // r = r + 5;
  // g = g + 5;
  // b = b + 5;
  // value = value + 5;
  // if (r > 255 && g > 255 && b > 255 && value > 255) {
  //   r = random(255);
  //   g = random(255);
  //   b = random(255);
  //   value = 0;
  // }

  var red = random(255);
  var green = random(255);
  var blue = random(255);
  fill(red,green,blue);
  noStroke();
  rect(mouseX, mouseY, 80, 80)

  sendmouse(mouseX,mouseY);
  // sendcolor(r, g, b, value);
}

function sendmouse(xpos, ypos) {
  // console.log("sendmouse: " + xpos + " " + ypos);
  var data = {
    x: xpos,
    y: ypos
  };

  socket.emit('mouse',data);
}

// function sendcolor(rval, gval, bval, vval) {
//   // console.log("sendcolor: " + rval + " " + gval + " " + bval + " " + vval);
//   var data = {
//     r: rval,
//     g: gval,
//     b: bval,
//     v: vval
//   };
//
//   socket.emit('color',data);
// }
