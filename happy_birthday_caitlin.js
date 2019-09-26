var bkgd;
var imageX = 500;
var imageY = 500;
var imageSize = 100;
var fillColor = "white";
var balloons = [];
var balloonImages = [];
var angle = 0;
var bdaySong;
var songLoaded = false;
var pause = false;
var luciana;

function preload(){
  // Load Images
  bkgd = loadImage("assets/images/sky.jpg");
  balloonImages.push("assets/images/blue.png");
  balloonImages.push("assets/images/orange.png");
  balloonImages.push("assets/images/green.png");
  luciana = loadImage("assets/images/Luciana.png");

  // Load Sounds
  soundFormats('mp3', 'ogg','wav', 'm4a');
  bdaySong = loadSound('assets/sounds/Happy Birthday (ALL).m4a', songUploaded);
  lucianaSong = loadSound('assets/sounds/Happy Birthday (Luciana).m4a');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(15);
  noStroke();

  for(var i = 0; i < 150; i++){
    balloons.push([Math.random()*windowWidth, Math.random()*windowHeight,
                   Math.random()*100,
                   loadImage(balloonImages[Math.floor(Math.random()*balloonImages.length)])]);
  }
}

function draw() {
  if(!pause){
    background(fillColor);
    image(bkgd, 0, 0, windowWidth, windowHeight);
    drawBalloons();
    drawLuciana();
    drawSignature();
    drawHappyBirthday();
  }
}

function drawLuciana() {
  image(luciana, 0, windowHeight - luciana.height);
}

function drawBalloons() {
  for(i = 0; i < balloons.length; i++){
    image(balloons[i][3], balloons[i][0], balloons[i][1], balloons[i][2], balloons[i][2])
    //calls images
    balloons[i][0] += 1* Math.sin(balloons[i][2]/5 + angle);
    balloons[i][1] += -1*balloons[i][2]/10;
    if(balloons[i][1] <= -50){
      balloons[i][1] = windowHeight + 50;
    }
    angle += .0001;
  }
}

function drawHappyBirthday() {
  textSize(102);
  textAlign(CENTER);
  fill(0, 0, 0);
  // text("Happy Birthday", windowWidth/2, windowHeight/2 - 75);
  // text("Caitlin!!!", windowWidth/2, windowHeight/2 + 75);
  text("Happy Birthday", mouseX, mouseY - 75);
  text("Caitlin!!!", mouseX, mouseY + 75);
}

function drawSignature(){
  textSize(40);
  textAlign(LEFT);
  fill(0, 0, 0);
  // text("Happy Birthday", windowWidth/2, windowHeight/2 - 75);
  // text("Caitlin!!!", windowWidth/2, windowHeight/2 + 75);
  text("We Love You!!!", windowWidth/2-200, windowHeight - 110);
  text("DJ, Ingrid, Luciana, & Grandpa", windowWidth/2-200+50, windowHeight - 50);
}

function songUploaded(song){
  songLoaded = true;
}

function mousePressed() {
  if(mouseX < luciana.width && mouseY > windowHeight-luciana.height) {
    if(!lucianaSong.isPlaying() && !bdaySong.isPlaying()){
      lucianaSong.play();
    }
  }
  else if(songLoaded && !bdaySong.isPlaying() && !lucianaSong.isPlaying()) {
    bdaySong.play();
  }
}

function windowResized() {
  pause = true;
  resizeCanvas(windowWidth, windowHeight);
  for(var i = 0; i < 150; i++){
    balloons[i][0] = Math.random()*windowWidth;
    balloons[i][1] = Math.random()*windowHeight;
    balloons[i][2] = Math.random()*100;
  }
  pause = false;
}
