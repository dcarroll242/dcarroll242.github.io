function preload() {
  createVRCanvas();
}

function setup() {
  setVRBackgroundColor(200, 0, 150);
  fill(0, 255, 0);
}

function calculate() {
  // Things you want to happen once per frame
}

function draw() {
  translate(0, 0, 10);
  rotateX(10);
  rotateY(20);
  
  box(5);
}
