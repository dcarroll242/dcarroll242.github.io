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
  balloons.sort(function(a, b){return a[2]-b[2];})
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
  textFont("Oswald");
  fill(50, 50, 50);
  text("Press [k] to show/hide this key.", 10, 30);
  textSize(20);
  text("Happy Birthday: Click Anywhere (except Luciana)", 10, 60);
  text("Luciana Message: Click on Luciana", 10, 90);
  text("Stop Current Sound: Press Spacebar", 10, 120);
}

function drawSmallKey(){
  textSize(14);
  textAlign(LEFT);
  //textStyle(ITALIC);
  textFont("Oswald");
  fill(100, 100, 100);
  text("Show Key [k]", 2, 14);
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
  textFont("Mansalva");
  fill(0, 0, 0);
  text("Happy Birthday", mouseX, mouseY - 40);
  text("Caitlin!!!", mouseX, mouseY + 100);
}

function drawSignature(){
  let anchorX = -700;
  let anchorY = -120;
  textSize(40);
  textAlign(LEFT);
  textStyle(NORMAL);
  textFont("Mansalva");
  fill(0, 0, 0);
  text("Love,", windowWidth + anchorX, windowHeight + anchorY);
  text("DJ, Ingrid, Luciana, & Grandpa", windowWidth + anchorX + 50, windowHeight + anchorY + 60);
}

function drawMessage(){
  let anchorX = -700;
  let anchorY = -250;
  textSize(40);
  textAlign(LEFT);
  textStyle(NORMAL);
  textFont("Mansalva");
  fill(0, 0, 0);
  text("Have a wonderful birthday Caitlin!", windowWidth + anchorX, windowHeight + anchorY);
  text("You deserve it & we love you so much!", windowWidth + anchorX, windowHeight + anchorY + 60);
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
  balloons.sort(function(a, b){return a[2]-b[2];})
  pause = false;
}
