function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);
  rotateZ(radians(rotationZ));
  rotateX(radians(rotationX));
  rotateY(radians(rotationY));

  rotateZ(radians(360*mouseX/width));
  rotateX(radians(360*mouseY/width));
  rotateY(radians(360*mouseY/width));

  box(200, 200, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
