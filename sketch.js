let mickeyImage;
let monster1Image;
let monsterSize = 200;
var amplitude = 0;
let scale = 1;
let monsterScale = .1;
let mic, recorder, soundFile;
var numCirclesX = 20;
var numCirclesY = 10;

function preload() {
  // monster1Image = loadImage('assets/images/monster1.png');
  // mickeyImage = loadImage('assets/images/mickey.png');
  soundFormats('mp3', 'ogg','wav');
  doorbell = loadSound('assets/sounds/doorbell.mp3', success, nsuccess, loading);
  applause = loadSound('assets/sounds/applause.wav', success, nsuccess, loading);
  mickey = loadSound('assets/sounds/mickey.wav', success, nsuccess, loading);
  wind = loadSound('assets/sounds/wind.wav', success, nsuccess, loading);
  hoohoo = loadSound('assets/sounds/hoohoo.wav', success, nsuccess, loading);
  roar = loadSound('assets/sounds/roar.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  wind.setVolume(.1);
  hoohoo.playMode('restart');

  // create an audio in
  mic = new p5.AudioIn();
  // users must manually enable their browser microphone for recording to work properly!
  mic.start();
  // create a sound recorder
  recorder = new p5.SoundRecorder();
  // connect the mic to the recorder
  recorder.setInput(mic);
  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();

  // Patch the input to an volume analyzer
  analyzer.setInput(mic);

  fft = new p5.FFT();
  fft.setInput(mic);

  applause.play();
}

function draw() {
  colorMode(RGB);
  drawCircles();
  background(0,0,0,25);
  var level = analyzer.getLevel();
  var size = map(level, 0, 1, 0, 800);
  //var b = map(level, 0, 1, 0, 256);
  //fill(255, 0, 255-b);
  fill(0,0,255);
  ellipse(width/2, height/2, size*5, size*5);
  // image(monster1Image, width/8, height/5, monster1Image.width*monsterScale, monster1Image.height*monsterScale);
  // if(size == 0) {size = .01;}
  // image(mickeyImage, mouseX-(mickeyImage.width*scale/2), mouseY-(mickeyImage.height*scale/2), mickeyImage.width*scale, mickeyImage.height*scale);
  // if(mouseX >= width/8 && mouseX <= width/8 + monster1Image.width*monsterScale &&
  //     mouseY >= height/5 && mouseY <= height/5 + monster1Image.height*monsterScale &&
  //     !roar.isPlaying()){
  //   roar.play();
  //   fill(255,0,0);
  //   ellipse(width/8 + monster1Image.width*monsterScale/2, height/5 + monster1Image.height*monsterScale/2, 200, 200);
  // }

  var spectrum = fft.analyze();
  noStroke();
  colorMode(HSB);
  fill(0,255,0); // spectrum is green
  colorCounter = 0;
  for (var i = 0; i< spectrum.length; i++){
    fill(map(i, 0, 1024, 255, 0), 255, 255);
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
    colorCounter++;
  }

  colorMode(RGB);
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

  // image(monster1Image, width/8, height/5, monster1Image.width*monsterScale, monster1Image.height*monsterScale);
}

// function mousePressed(){
//   if(hoohoo.isPlaying()){
//     hoohoo.stop();
//   }
//   mickey.play();
//   fill("yellow");
//   ellipse(mouseX, mouseY, 350, 350);
// }

// function mouseMoved(){
//   if (!wind.isPlaying() && !mickey.isPlaying()){
//     wind.play();
//   }
// }

function keyTyped(){
  // if (key === 'a'){
  //   applause.play();
  // }
  if (key === 'r' && mic.enabled) {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);
  }
  if (key === 'p') {
    soundFile.play();
  }
}

function keyReleased(){
  if (key === 'r') {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.stop();
  }
}

function success(){console.log("Sound file loaded.");}
function nsuccess(){console.log("Sound file not loaded.");}
function loading(){console.log("Sound file loading...");}

// Draw the circles
function drawCircles(){
  for(var i = 0; i < numCirclesX; i++){
    for(var j = 0; j < numCirclesY; j++){
      stroke(5);
      //stroke("yellow");
      //fill("#26004d");
      fill(random(100, 150), random(0, 25), random(100, 150));
      var distance = getDistance(i*(windowWidth/numCirclesX) + (windowWidth/numCirclesX)/2, j*(windowHeight/numCirclesY) + (windowHeight/numCirclesY)/2);
      distance = constrainDistance(distance);
      //playSoundEffects(distance);
      circle(i*(windowWidth/numCirclesX) + (windowWidth/numCirclesX)/2, j*(windowHeight/numCirclesY) + (windowHeight/numCirclesY)/2, distance);
    }
  }
}

// Return distance from a point to the mouse.
function getDistance(x, y){
  return Math.pow((Math.pow((x - mouseX),2) + Math.pow((y - mouseY),2)),0.5);
}

// Constrain Distance
function constrainDistance(distance){
  if(distance > 30*windowWidth/numCirclesX/2){
        return windowWidth/numCirclesX/2;
      }
  else {
    return distance / 30;
  }
}
