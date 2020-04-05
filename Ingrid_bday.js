let card, dj, luciana, bdaySong, heart;
let heartX = 0, heartY = 0;

function preload() {
  card = loadImage("assets/images/Ingrid Birthday Card.png");
  heart = loadImage("assets/images/heart.png");
  dj = loadSound("assets/sounds/Ingrid Happy Birthday (DJ).mp3");
  luciana = loadSound("assets/sounds/Ingrid Happy Birthday (Luciana).mp3");
  bdaySong = loadSound("assets/sounds/Ingrid Happy Birthday (DJ & Luciana).mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
}

function draw() {
  background(220);
  imageMode(CORNER);
  image(card, 0, 0, width, (width/card.width)*card.height);
  imageMode(CENTER);
  heartX = lerp(heartX, mouseX, .05);
  heartY = lerp(heartY, mouseY, .05);
  size = map(dist(heartX, heartY, mouseX, mouseY), 0, width, .03*width, .20*width);
  image(heart, heartX, heartY, size, size);
}

function windowResized() {
  resizeCanvas(windowWidth, (width/card.width)*card.height);
}

function mousePressed() {
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if(mouseY < .25*(width/card.width)*card.height) {
      if(bdaySong.isPlaying()) {bdaySong.stop();}
      else {bdaySong.play();}
    }
    else {
      if(mouseX < .318*width) {
        if(dj.isPlaying()) {dj.stop();}
        else {dj.play();}
      }
      else {
        if(luciana.isPlaying()) {luciana.stop();}
        else {luciana.play();}
      }
    }
  }
}
