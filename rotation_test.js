function setup() {
  createCanvas(400, 400, WEBGL);
}

function draw() {
  background(200);
  rotateZ(radians(rotationZ));
  rotateX(radians(rotationX));
  rotateY(radians(rotationY));

  rotateZ(radians(360*mouseX/width));
  rotateX(radians(360*mouseY/width));

  box(200, 200, 200);
}
