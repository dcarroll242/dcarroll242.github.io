let alpha = 0, beta = 0, gamma = 0;


function preload() {
  inconsolata = loadFont('assets/fonts/inconsolata.woff');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  window.addEventListener("deviceorientation", function(event) {
    alpha = event.alpha;
    beta = event.beta;
    gamma = event.gamma;
  }, true);

  textAlign(CENTER, CENTER);
  textFont(inconsolata);
  textSize(100);

}

function draw() {
  background(0);

  text("(" + alpha + "," + beta + "," + gamma + ")", 0, -250, 0);

  push();
  translate(-300, 0, 0);
  rotateY(radians(360*mouseY/height));
  box(100, 100, 100);
  pop();

  push();
  translate(300, 0, 0);
  rotateY(radians(-360*mouseY/height));
  box(100, 100, 100);
  pop();

  push();
  rotateZ(radians(rotationZ));
  rotateX(-radians(rotationX));
  //rotateY(radians(rotationZ));
  rotateZ(radians(360*mouseX/width));
  rotateX(radians(360*mouseY/width));
  rotateY(radians(360*mouseY/width));
  box(200, 200, 200);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
