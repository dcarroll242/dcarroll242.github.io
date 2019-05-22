var amplitude = 0;
let mic, recorder, soundFile;
var numCirclesX = 20;
var numCirclesY = 10;
var songs = [];
var currentSong = 0;
var playingMusic = false;
var pausedMusic = false;
var songLoaded = false;
var spectrum;
var waveform;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  soundFormats('mp3', 'ogg','wav');
  songs.push(loadSound('assets/sounds/liqwyd-summer-nights.wav', songLoadedSuccessfully));
  songs.push(loadSound('assets/sounds/bensound-acousticbreeze.mp3'));
  songs.push(loadSound('assets/sounds/bensound-anewbeginning.mp3'));
  songs.push(loadSound('assets/sounds/bensound-creativeminds.mp3'));
  songs.push(loadSound('assets/sounds/bensound-cute.mp3'));
  songs.push(loadSound('assets/sounds/bensound-dubstep.mp3'));
  songs.push(loadSound('assets/sounds/bensound-endlessmotion.mp3'));
  songs.push(loadSound('assets/sounds/bensound-energy.mp3'));

  resetSketch();
}

function draw() {

  if(!pausedMusic && songLoaded){
    colorMode(RGB);
    background(0,0,0,25);
    var level = analyzer.getLevel();
    var size = map(level, 0, 1, 0, 800);

    fill(0,0,255);
    ellipse(width/2, height/2, size, size);

    drawSpectrum();
    drawWave();

    if(playingMusic && !songs[currentSong].isPlaying()){
      currentSong = (currentSong + 1) % songs.length;
      songs[currentSong].play();
    }
  }
  else if(pausedMusic && songLoaded){
    background(0,0,0,25);
    drawSpectrum();
    drawWave();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function songLoadedSuccessfully(){
  songLoaded = true;
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

function keyPressed() {
  if(songLoaded){
    console.log("Key Pressed: " + key);
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
    if (key === 'ArrowUp'){
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
  }
}
