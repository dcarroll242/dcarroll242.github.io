let bkgd;
let luciana;
let david;
let happyMD;
let lx, ly, loff=0, dx, dy, doff=100;
let speed = .001;

function preload(){
  // Load Images
  bkgd = loadImage("assets/images/mothersdaybkgd.jpg");
  luciana = loadImage("assets/images/luciana v3.png");
  david = loadImage("assets/images/david v3.png");

  // Load Sounds
  soundFormats('mp3', 'ogg','wav', 'm4a');
  happyMD = loadSound("assets/sounds/mothers day 2020.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  imageMode(CORNER);
  image(bkgd, 0, 0, width, height);

  imageMode(CENTER);
  lx = noise(loff) * width;
  dx = noise(doff) * width;
  ly = noise(loff+100) * (height/8) + (.6*height);
  dy = noise(doff+100) * (height/8) + (.6*height);
  loff += speed;
  doff += speed;
  image(luciana, lx, ly, .25*luciana.width, .25*luciana.height);
  image(david, dx, dy, .25*david.width, .25*david.height-20);
}

function mousePressed() {
  if(!happyMD.isPlaying()){
    happyMD.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
