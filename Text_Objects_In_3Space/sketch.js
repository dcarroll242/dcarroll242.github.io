let inconsolata;
let strings = [];
let noiseOffSet = 0;

function preload() {
  inconsolata = loadFont('assets/fonts/Inconsolata-Light.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(inconsolata);
  textAlign(CENTER, CENTER);
  for(i = 0; i < 50; i++) {
    c = "#";
    for(j = 0; j < 3; j++) {
      string = Math.floor(random(150,256)).toString(16);
      string.padStart(2,"0");
      c += string;
    }
    textObject = new Text3D(i/*Math.floor(random()*2)*/, c, 72,
                            random(-width/2,width/2+1),
                            random(-height/2,height/2+1),
                            random(-width/2,width/2+1));
    textObject.rotate(random()*TWO_PI, random()*TWO_PI, random()*TWO_PI);
    strings.push(textObject);
  }
  
}

function draw() {
  background(0);
  
  translate(0, 0, -mouseX);
  rotateY(2*(frameCount / 360));
  textSize(36);
  // text("There are 10 types of people in this world...", 0, -50);
  // text("Those who understand binary and those who don't!", 0, 50);
  
  for(i = 0; i < strings.length; i++) {
    noiseNum = noise(noiseOffSet + i*100);
    if(mouseX <= 0) {mouseX = 1;}
    if(mouseY <= 0) {mouseY = 1;}
    // strings[i].translate(noiseNum*mouseY-mouseY/2,
    //                      noiseNum*mouseY-mouseY/2,
    //                      noiseNum*mouseY-mouseY/2);
    angle = noiseNum/50;
    strings[i].rotate(angle, -angle, angle);
    strings[i].update(1-mouseX/width);
  }
  noiseOffSet += .001;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
}