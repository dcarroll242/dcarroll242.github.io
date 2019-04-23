var amplitude = 0;
let mic, recorder, soundFile;
var numCirclesX = 20;
var numCirclesY = 10;
var songs = [];
var currentSong = 0;

function preload() {
  soundFormats('mp3', 'ogg','wav');
  songs.push(loadSound('assets/sounds/liqwyd-summer-nights.wav'));
  songs.push(loadSound('assets/sounds/bensound-acousticbreeze.mp3'));
  songs.push(loadSound('assets/sounds/bensound-anewbeginning.mp3'));
  songs.push(loadSound('assets/sounds/bensound-creativeminds.mp3'));
  songs.push(loadSound('assets/sounds/bensound-cute.mp3'));
  songs.push(loadSound('assets/sounds/bensound-dubstep.mp3'));
  songs.push(loadSound('assets/sounds/bensound-endlessmotion.mp3'));
  songs.push(loadSound('assets/sounds/bensound-energy.mp3'));
  songs.push(loadSound('assets/sounds/bensound-epic.mp3'));
  songs.push(loadSound('assets/sounds/bensound-goinghigher.mp3'));
  songs.push(loadSound('assets/sounds/bensound-happyrock.mp3'));
  songs.push(loadSound('assets/sounds/bensound-inspire.mp3'));
  songs.push(loadSound('assets/sounds/bensound-perception.mp3'));
  songs.push(loadSound('assets/sounds/bensound-pianomoment.mp3'));
  songs.push(loadSound('assets/sounds/bensound-retrosoul.mp3'));
  songs.push(loadSound('assets/sounds/bensound-slowmotion.mp3'));
  songs.push(loadSound('assets/sounds/bensound-summer.mp3'));
  songs.push(loadSound('assets/sounds/bensound-sunny.mp3'));
  songs.push(loadSound('assets/sounds/bensound-ukulele.mp3'));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  resetSketch();
}

function draw() {
  colorMode(RGB);
  drawCircles();
  background(0,0,0,25);
  var level = analyzer.getLevel();
  var size = map(level, 0, 1, 0, 800);

  fill(0,0,255);
  ellipse(width/2, height/2, size, size);

  drawSpectrum();
  drawWave();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function resetSketch() {
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // create an audio in
  // mic = new p5.AudioIn();
  // // users must manually enable their browser microphone for recording to work properly!
  // mic.start();
  // // create a sound recorder
  // recorder = new p5.SoundRecorder();
  // // connect the mic to the recorder
  // recorder.setInput(mic);
  // // create an empty sound file that we will use to playback the recording
  // soundFile = new p5.SoundFile();
  // Patch the input to an volume analyzer
  analyzer.setInput();
  // Setup fast Fourier Transform
  fft = new p5.FFT();
  // Set Input to microphone
  fft.setInput();
}

function drawSpectrum() {
  var spectrum = fft.analyze();
  noStroke();
  colorMode(HSB);
  fill(0,255,0); // spectrum is green
  colorCounter = 0;
  for (var i = 0; i< spectrum.length; i++){
    fill(map(i, 0, 1024, 255, 0), 255, 255);
    var x = map(i, 0, spectrum.length, 0, width/2);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h );
    rect(width-x, height, width / spectrum.length, h );
    colorCounter++;
  }
}

function drawWave() {
  colorMode(RGB);
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,255,0); // waveform is yellow
  strokeWeight(3);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
  strokeWeight(1);
}

function mouseClicked() {
  if (!songs[currentSong].isPlaying()){
    songs[currentSong].play();
  }
}

function touchStarted() {
  if (!songs[currentSong].isPlaying()){
    songs[currentSong].play();
  }
}

function touchMoved() {
  return false;
}

function keyPressed() {
  if (key === 'ArrowLeft') {
    if (songs[currentSong].isPlaying()) {
      songs[currentSong].stop();
    }
    currentSong = (currentSong - 1) % songs.length;
    if (currentSong == -1){
      currentSong = songs.length - 1
    }
    songs[currentSong].play();
  }
  if (key === 'ArrowRight') {
    if (songs[currentSong].isPlaying()) {
      songs[currentSong].stop();
    }
    currentSong = (currentSong + 1) % songs.length;
    songs[currentSong].play();
  }
  if (key === 'ArrowUp'){
    if (!songs[currentSong].isPlaying()){
      songs[currentSong].play();
    }
    else {
      songs[currentSong].pause();
    }
  }
  if (key == 'ArrowDown') {
    songs[currentSong].stop();
  }
}

// function keyTyped(){
//   if (key === 'r' && mic.enabled) {
//     // Tell recorder to record to a p5.SoundFile which we will use for playback
//     recorder.record(soundFile);
//   }
//   if (key === 'p') {
//     soundFile.play();
//   }
//   if (key === 'v') {
//     console.log("called drawSketch")
//     drawSketch();
//   }
// }
//
// function keyReleased(){
//   if (key === 'r') {
//     // Tell recorder to record to a p5.SoundFile which we will use for playback
//     recorder.stop();
//   }
// }

// Draw the circles
function drawCircles(){
  for(var i = 0; i < numCirclesX; i++){
    for(var j = 0; j < numCirclesY; j++){
      stroke(5);
      fill(random(100, 150), random(0, 25), random(100, 150));
      var distance = getDistance(i*(windowWidth/numCirclesX) + (windowWidth/numCirclesX)/2, j*(windowHeight/numCirclesY) + (windowHeight/numCirclesY)/2);
      distance = constrainDistance(distance);
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
