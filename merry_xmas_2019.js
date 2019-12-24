let bkgd;
let imageX = 500;
let imageY = 500;
let imageSize;
let snowflakes = [];
let snowflakeImages = [];
let numSnowflakes = 100;
let angle = 0;
let speed = .6;
let wind = 1;
let windAuto = 0;
let pNoise = 0;
let pNoiseDx = .01;
let sounds = [];
let song1;
let lucianaSound;
let djSound;
let ingridSound;
let allAssetsLoaded = false;
let initialClick = false;
let playButton;

function setup() {
  soundFormats('mp3');
  song1 = loadSound("assets/sounds/oh-christmas-tree.mp3", song1Loaded, song1Failed, song1Loading);
  lucianaSound = loadSound("assets/sounds/Luciana - Merry Christmas.mp3");
  djSound = loadSound("assets/sounds/DJ - Merry Christmas2.mp3");
  ingridSound = loadSound("assets/sounds/Ingrid - Merry Christmas.mp3");
  //bkgd = loadImage("assets/images/xmas_background.jpeg", windowWidth, windowHeight);
  bkgd = loadImage("assets/images/Carrolls_Xmas.png", windowWidth, windowHeight);
  playButton = loadImage("assets/images/playButton2.png");
  snowflakeImages.push("assets/images/snowflake.png");
  snowflakeImages.push("assets/images/snowflake.png");
  snowflakeImages.push("assets/images/snowflake.png");

  createCanvas(windowWidth, windowHeight);
  fitBackground();
  fill(15);
  noStroke();
  createSnowFlakes();
}

function draw() {
  imageMode(CENTER);
  background(0);
  image(bkgd, windowWidth/2, windowHeight/2);
  drawMerryXmas();
  drawSnowFlakes();

  if(allAssetsLoaded) {
    if(initialClick) {
      if(!song1.isPlaying()) {
        song1.play();
      }
    }
    else {
      imageMode(CENTER);
      image(playButton, windowWidth/2, windowHeight/2, windowWidth/3, windowWidth/3);
    }
  }


}

function drawSnowFlakes() {
  for(let i = 0; i < snowflakes.length; i++){
    let windChange = noise(pNoise) * wind * (snowflakes[i][2] / 20) + windAuto;
    snowflakes[i][4] += snowflakes[i][5];
    push();
    //translate(snowflakes[i][0], snowflakes[i][1]);
    //rotate(snowflakes[i][4]);
    image(snowflakes[i][3], snowflakes[i][0], snowflakes[i][1], snowflakes[i][2], snowflakes[i][2])
    pop();
    snowflakes[i][0] += windChange; //1* Math.sin(snowflakes[i][2]/5 + angle) + windChange;
    snowflakes[i][1] += speed*snowflakes[i][2]/10;
    if(snowflakes[i][1] >= windowHeight + 10){
      snowflakes[i][1] = -10;
    }
    if(snowflakes[i][0] >= windowWidth + 10){
      snowflakes[i][0] = -10;
    }
    angle += .0001;
    pNoise += pNoiseDx;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  fitBackground();
  createSnowFlakes();
}

function createSnowFlakes() {
  snowflakes = [];
  imageSize = windowWidth / 100;
  for(let i = 0; i < numSnowflakes; i++){
    snowflakes.push([Math.random()*windowWidth, Math.random()*windowHeight,
                     Math.random()*imageSize + 5,
                     loadImage(snowflakeImages[Math.floor(Math.random()*snowflakeImages.length)]), 0, random(-5, 5)]);
  }
  snowflakes.sort(function(a, b){return a[2]-b[2];})
}

function drawMerryXmas() {
  textSize(windowWidth/15);
  fill("#bb0000");
  textAlign(CENTER);
  textStyle(NORMAL);

  textFont("Parisienne");
  text("Merry Christmas!!!", windowWidth/2, 2*windowHeight/8);
}

function fitBackground() {
  let windowAR = windowWidth / windowHeight;
  let imageAR = bkgd.width / bkgd.height;

  imageMode(CENTER);
  if(windowAR > imageAR) {
    bkgd.width = windowHeight * imageAR;
    bkgd.height = windowHeight;
  }
  else {
    bkgd.width = windowWidth;
    bkgd.height = windowWidth / imageAR;
  }

}

function showFonts() {
  textSize(windowWidth/20);
  fill("#ffff00");
  textAlign(CENTER);
  textStyle(NORMAL);

  textFont("Allura");
  text("Merry Christmas!!!", windowWidth/2, 1*windowHeight/8);

  textFont("Great Vibes");
  text("Merry Christmas!!!", windowWidth/2, 2*windowHeight/8);

  textFont("Pacifico");
  text("Merry Christmas!!!", windowWidth/2, 3*windowHeight/8);

  textFont("Parisienne");
  text("Merry Christmas!!!", windowWidth/2, 4*windowHeight/8);

  textFont("Satisfy");
  text("Merry Christmas!!!", windowWidth/2, 5*windowHeight/8);

  textFont("Tangerine");
  text("Merry Christmas!!!", windowWidth/2, 6*windowHeight/8);
}

function song1Loaded() {
  allAssetsLoaded = true;
}

function song1Failed() {

}

function song1Loading() {

}

function mousePressed() {
  if(initialClick) {
    if(mouseX < windowWidth/3) {ingridSound.play();}
    if(mouseX >= windowWidth/3 && mouseX <= windowWidth*2/3) {lucianaSound.play();}
    if(mouseX > windowWidth*2/3) {djSound.play();}
  }
  else {
    ingridSound.play();
    lucianaSound.play();
    djSound.play();
  }
  initialClick = true;
}

function checkAssetsLoaded() {

}
