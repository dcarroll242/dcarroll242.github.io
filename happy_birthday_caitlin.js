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
var showKey = false;

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
    drawMessage();
    if(showKey){drawKey();}
    else{drawSmallKey();}
    drawHappyBirthday();
  }
}

function drawLuciana() {
  image(luciana, 0, windowHeight - luciana.height);
}

function drawKey(){
  textSize(30);
  textAlign(LEFT);
  textStyle(NORMAL);
  fill(100, 0, 0);
  text("Press [k] to show/hide this key.", 10, 30);
  textSize(20);
  text("Happy Birthday: Click Anywhere (except Luciana)", 10, 60);
  text("Luciana Message: Click Luciana", 10, 90);
  text("Stop Current Sound: Spacebar", 10, 120);
}

function drawSmallKey(){
  textSize(14);
  textAlign(LEFT);
  textStyle(ITALIC);
  fill(100, 100, 100);
  text("Show Key [k]", 4, 14);
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
  textStyle(NORMAL);
  fill(0, 0, 0);
  text("Happy Birthday", mouseX, mouseY - 40);
  text("Caitlin!!!", mouseX, mouseY + 100);
}

function drawSignature(){
  textSize(40);
  textAlign(LEFT);
  textStyle(NORMAL);
  fill(0, 0, 0);
  text("Love,", windowWidth/2-200, windowHeight - 110);
  text("DJ, Ingrid, Luciana, & Grandpa", windowWidth/2-200+50, windowHeight - 50);
}

function drawMessage(){
  textSize(40);
  textAlign(LEFT);
  textStyle(NORMAL);
  fill(0, 0, 0);
  text("Have a wonderful birthday Caitlin!", windowWidth/2-220, windowHeight/2 + 100);
  text("You deserve it & we love you so much!", windowWidth/2-220, windowHeight/2 + 150);
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

function keyPressed(){
  if(keyCode == 32) {
    bdaySong.stop();
    lucianaSong.stop();
  }
  if(keyCode == 75){
    if(showKey){showKey = false;}
    else{showKey = true;}
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