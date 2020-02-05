function setup() {
  createCanvas(100, 100, WEBGL);
}

function draw() {
  background(200);
  rotateZ(radians(rotationZ));
  rotateX(radians(rotationX));
  rotateY(radians(rotationY));
  box(200, 200, 200);
}
