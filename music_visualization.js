var amplitude = 0;
let mic, recorder, soundFile;
var numCirclesX = 20;
var numCirclesY = 10;
var songs = [];
var songNames = [];
var currentSong = 0;
var playingMusic = false;
var pausedMusic = false;
var songLoaded = false;
var spectrum;
var waveform;
var displayCircles = true;
var displaySpectrum = true;
var displayMiddle = true;
var displayWaveform = true;
var displayFileName = true;
var textColorCounter = 0;
var textColorDirection = 1;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.drop(droppedFile);
  background(50);

  soundFormats('mp3', 'ogg','wav');
  loadSound('assets/sounds/liqwyd-summer-nights.wav', songUploaded);
  loadSound('assets/sounds/bensound-acousticbreeze.mp3', songUploaded);
  loadSound('assets/sounds/bensound-anewbeginning.mp3', songUploaded);
  loadSound('assets/sounds/bensound-creativeminds.mp3', songUploaded);
  loadSound('assets/sounds/bensound-cute.mp3', songUploaded);
  loadSound('assets/sounds/bensound-dubstep.mp3', songUploaded);
  loadSound('assets/sounds/bensound-endlessmotion.mp3', songUploaded);
  loadSound('assets/sounds/bensound-energy.mp3', songUploaded);
  loadSound('assets/sounds/bensound-epic.mp3', songUploaded);
  loadSound('assets/sounds/bensound-goinghigher.mp3', songUploaded);
  loadSound('assets/sounds/bensound-happyrock.mp3', songUploaded);
  loadSound('assets/sounds/bensound-inspire.mp3', songUploaded);
  loadSound('assets/sounds/bensound-perception.mp3', songUploaded);
  loadSound('assets/sounds/bensound-pianomoment.mp3', songUploaded);
  loadSound('assets/sounds/bensound-retrosoul.mp3', songUploaded);
  loadSound('assets/sounds/bensound-slowmotion.mp3', songUploaded);
  loadSound('assets/sounds/bensound-summer.mp3', songUploaded);
  loadSound('assets/sounds/bensound-sunny.mp3', songUploaded);
  loadSound('assets/sounds/bensound-ukulele.mp3', songUploaded);

  resetSketch();
}

function draw() {
  colorMode(RGB);
  background(0,0,0,25);
  if(!pausedMusic && songLoaded){
    if(displayCircles){
      colorMode(RGB);
      drawCircles();
    }
    if(displayMiddle){
      colorMode(RGB);
      var level = analyzer.getLevel();
      var size = map(level, 0, 1, 0, 800);
      fill(0,0,255);
      ellipse(width/2, height/2, size, size);
    }
    if(displaySpectrum){
      colorMode(HSB);
      drawSpectrum();
    }
    if(displayWaveform){
      colorMode(RGB);
      drawWave();
    }
    if(displayFileName){
      colorMode(RGB);
      fill(textColorCounter, textColorCounter);
      stroke(textColorCounter, textColorCounter);
      textSize(24);
      strokeWeight(1);
      textAlign(CENTER);
      text(songNames[currentSong], windowWidth/2, 25);
      textColorCounter += 3*textColorDirection;
      if(textColorCounter <= 0 || textColorCounter >= 500){textColorDirection *= -1;}
    }
    if(playingMusic && !songs[currentSong].isPlaying()){
      currentSong = (currentSong + 1) % songs.length;
      songs[currentSong].play();
    }
  }
  else if(pausedMusic && songLoaded){
    if(displayWaveform){
      colorMode(RGB);
      drawWave();
    }
  }
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
  if(!pausedMusic){
    spectrum = fft.analyze();
  }
  noStroke();
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
  if(!pausedMusic){
    waveform = fft.waveform();
  }
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

function mousePressed() {
  if(songLoaded){
    if (pausedMusic || !playingMusic) {
      songs[currentSong].play();
      pausedMusic = false;
      playingMusic = true;
    }
    else {
      songs[currentSong].pause();
      pausedMusic = true;
      playingMusic = true;
    }
  }
}

function doubleClicked() {
  if(songLoaded){
    playingMusic = true;
    pausedMusic = false;
    if (songs[currentSong].isPlaying()) {
      songs[currentSong].stop();
    }
    currentSong = (currentSong + 1) % songs.length;
    songs[currentSong].play();
  }
}

function keyPressed() {
  if(songLoaded){
    if (key === 'ArrowLeft') {
      playingMusic = true;
      pausedMusic = false;
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
      playingMusic = true;
      pausedMusic = false;
      if (songs[currentSong].isPlaying()) {
        songs[currentSong].stop();
      }
      currentSong = (currentSong + 1) % songs.length;
      songs[currentSong].play();
    }
    if (key === 'ArrowUp' || key === ' '){
      if (pausedMusic || !playingMusic) {
        songs[currentSong].play();
        pausedMusic = false;
        playingMusic = true;
      }
      else {
        songs[currentSong].pause();
        pausedMusic = true;
        playingMusic = true;
      }
    }
    if (key == 'ArrowDown') {
      playingMusic = false;
      pausedMusic = false;
      songs[currentSong].stop();
    }
    if (key == 'Backspace') {
      if(songs.length > 1){
        if (songs[currentSong].isPlaying()) {
          songs[currentSong].stop();
        }
        songs.splice(currentSong, 1);
        songNames.splice(currentSong, 1);
        currentSong = (currentSong + 0) % songs.length;
        if(playingMusic && !pausedMusic){
          songs[currentSong].play();
        }
      }
    }
    if(key == 'z'){
      if(displaySpectrum){displaySpectrum = false;}
      else{displaySpectrum = true;}
    }
    if(key == 'x'){
      if(displayWaveform){displayWaveform = false;}
      else{displayWaveform = true;}
    }
    if(key == 'c'){
      if(displayCircles){displayCircles = false;}
      else{displayCircles = true;}
    }
    if(key == 'v'){
      if(displayFileName){displayFileName = false;}
      else{displayFileName = true;}
    }
    if(key == 'b'){
      if(displayMiddle){displayMiddle = false;}
      else{displayMiddle = true;}
    }
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
  let tempMouseX = mouseX;
  let tempMouseY = mouseY;
  let buffer = 25;
  if(mouseX < buffer || mouseX > windowWidth - buffer ||
     mouseY < buffer || mouseY > windowHeight - buffer){
    tempMouseX = windowWidth/2;
    tempMouseY = windowHeight/2;
  }
  return Math.pow((Math.pow((x - tempMouseX),2) + Math.pow((y - tempMouseY),2)),0.5);
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

function droppedFile(file){
  loadSound(file, customSongUploaded);
}

function songUploaded(song){
  songs.push(song);
  songNames.push(song.file);
  console.log(song.file);
  songLoaded = true;
}

function customSongUploaded(song){
  songs.push(song);
  songNames.push(song.file.name);
  console.log(song.file.name);
}
