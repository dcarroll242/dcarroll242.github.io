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
var displayCircles = false;
var displaySpectrum = true;
var displayMiddle = true;
var displayWaveform = true;
var displayFileName = true;
var displaySplitWave = false;
var textColorCounter = 0;
var textColorDirection = 1;
let splitButton = false;
let averageSpec = [];
let averageAmp = [];
let channels = 32;
let spectrumSplitWaves;
let micOn = false;
let baseFreq = 2;
let maxAmp = .66;
let showKey = false;
let controlsImage;
let controlsImageLoaded = false;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.drop(droppedFile);
  background(50);

  soundFormats('mp3', 'ogg','wav');
  loadSound('assets/sounds/bensound-perception.mp3', firstSongUploaded);
  controlsImage = loadImage('assets/images/Keyboard Layout.png', controlsImageLoadedSuccessful);
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
    if(displaySplitWave) {
      colorMode(RGB);
      drawSplitWaves();
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
    if(keyIsDown(83)) {
      drawSplitWaves();
    }
    else {
      if(displaySplitWave) {
        drawSplitWaves();
      }
      if(displayWaveform) {
        drawWave();
      }
    }
  }
  if(keyIsDown(186)){
    maxAmp -= .02;
    if(maxAmp < 0){maxAmp = 0;}
  }
  if(keyIsDown(222)){
    maxAmp += .02;
    if(maxAmp > 2){maxAmp = 2;}
  }

  if(showKey){
    drawKey();
  }
  drawSmallKey();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function resetSketch() {
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();
  // Patch the input to a volume analyzer
  analyzer.setInput();
  // Setup fast Fourier Transform
  fft = new p5.FFT();
  fft2 = new p5.FFT(0, channels);
  fft2.setInput();
  // Set Input to microphone
  fft.setInput();

  waveform = fft.waveform();
  spectrum = fft.analyze();
  spectrumSplitWaves = fft2.analyze();
}

function drawSpectrum() {
  if(!pausedMusic){
    spectrum = fft.analyze();
  }
  noStroke();
  for (var i = 0; i < spectrum.length; i++){
    fill(map(i, 0, 1024, 255, 0), 255, 255);
    var x = map(i, 0, spectrum.length, 0, width/2);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h/2 );
    rect(width-x, height, width / spectrum.length, h/2 );
  }
  for (var i = 0; i < spectrum.length; i++){
    fill(map(i, 0, 1024, 255, 0), 255, 255);
    var x = map(i, 0, spectrum.length, 0, width/2);
    var h = map(spectrum[i], 0, 255, 0, height);
    rect(x, 0, width / spectrum.length, h/2 );
    rect(width-x, 0, width / spectrum.length, h/2 );
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
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
  strokeWeight(1);
}

function drawSplitWaves() {
  if(songLoaded) {
    if(!pausedMusic) {
      spectrumSplitWaves = fft2.analyze();
    }
    colorMode(RGB);
    noFill();
    stroke(255);
    strokeWeight(64 / spectrumSplitWaves.length);
    let r = 0;
    let g = 0;
    let b = 255;

    for(let i = 0; i < spectrumSplitWaves.length; i++) {
      colorChange = spectrumSplitWaves[i]
      stroke(r, g + colorChange, b - colorChange);
      beginShape();
      for(let x = 0; x < width; x++) {
        let amplitude = (spectrumSplitWaves[i]/256) * height/spectrumSplitWaves.length * (maxAmp);
        let period = (spectrumSplitWaves.length - i) * (width / spectrumSplitWaves.length)/baseFreq;
        let b = 2 * Math.PI / period;
        vertex(x, amplitude * Math.sin(b * x) + (i+.5)*height/spectrumSplitWaves.length);
      }
      endShape();
    }
    strokeWeight(1);
  }
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
    if (key === 'ArrowLeft' && !micOn) {
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
    if (key === 'ArrowRight' && !micOn) {
      playingMusic = true;
      pausedMusic = false;
      if (songs[currentSong].isPlaying()) {
        songs[currentSong].stop();
      }
      currentSong = (currentSong + 1) % songs.length;
      songs[currentSong].play();
    }
    if ((key === 'ArrowUp' || key === ' ') && !micOn){
      waveform = fft.waveform();
      spectrum = fft.analyze();
      spectrumSplitWaves = fft2.analyze();

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
    if (key == 'ArrowDown' && !micOn) {
      playingMusic = false;
      pausedMusic = false;
      songs[currentSong].stop();
    }
    if (key == 'Backspace' && !micOn) {
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
    if(key == 'n'){
      if(displaySplitWave){displaySplitWave = false;}
      else{displaySplitWave = true;}
    }
    if(key == 'm'){
      if(!micOn){
        micOn = true;
        songs[currentSong].pause();
        playingMusic = false;
        setupMic();
      }
      else{
        micOn = false;
        playingMusic = true;
        resetSketch();
        songs[currentSong].play();
      }
    }
    if(key == ',') {
      channels /= 2;
      if(channels < 16) {channels = 16;}
      fft2 = new p5.FFT(0, channels);
      if(micOn){
        fft.setInput(mic);
        fft2.setInput(mic);
        waveform = fft.waveform();
        spectrum = fft.analyze();
        spectrumSplitWaves = fft2.analyze();
      }
      else{
        fft.setInput();
        fft2.setInput();
        waveform = fft.waveform();
        spectrum = fft.analyze();
        spectrumSplitWaves = fft2.analyze();
      }
    }
    if(key == '.') {
      channels *= 2;
      if(channels > 128) {channels = 128;}
      fft2 = new p5.FFT(0, channels);
      if(micOn){
        fft.setInput(mic);
        fft2.setInput(mic);
        waveform = fft.waveform();
        spectrum = fft.analyze();
        spectrumSplitWaves = fft2.analyze();
      }
      else{
        fft.setInput();
        fft2.setInput();
        waveform = fft.waveform();
        spectrum = fft.analyze();
        spectrumSplitWaves = fft2.analyze();
      }
    }
    if(key == "k") {
      baseFreq -= 1;
      if(baseFreq < 1) {baseFreq = 1;}
    }
    if(key == "l") {
      baseFreq += 1;
      if(baseFreq > 10) {baseFreq = 10;}
    }
  }
  if(controlsImageLoaded) {
    if(key == "h"){
      if(showKey){showKey = false;}
      else{showKey = true;}
    }
  }
}

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
}

function firstSongUploaded(song){
  songs.push(song);
  songNames.push(song.file);
  console.log(song.file);
  songLoaded = true;

  resetSketch();

  loadSound('assets/sounds/bensound-endlessmotion.mp3', secondSongUploaded);
}

function secondSongUploaded(song){
  songs.push(song);
  songNames.push(song.file);
  console.log(song.file);

  // Load the rest of the songs
  loadSound('assets/sounds/liqwyd-summer-nights.wav', songUploaded);
  loadSound('assets/sounds/bensound-acousticbreeze.mp3', songUploaded);
  loadSound('assets/sounds/bensound-anewbeginning.mp3', songUploaded);
  loadSound('assets/sounds/bensound-creativeminds.mp3', songUploaded);
  loadSound('assets/sounds/bensound-cute.mp3', songUploaded);
  loadSound('assets/sounds/bensound-dubstep.mp3', songUploaded);
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
}

function customSongUploaded(song){
  songs.push(song);
  songNames.push(song.file.name);
  console.log(song.file.name);
}

function setupMic() {
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
  // Patch the input to a volume analyzer
  analyzer.setInput(mic);
  // Setup fast Fourier Transform
  fft = new p5.FFT();
  fft2 = new p5.FFT(0, channels);
  // Set Input to microphone
  fft.setInput(mic);
  fft2.setInput(mic);

  waveform = fft.waveform();
  spectrum = fft.analyze();
  spectrumSplitWaves = fft2.analyze();
}

function drawKey(){
  imageMode(CENTER);
  newWidth = controlsImage.width;
  newHeight = controlsImage.height;
  if(newWidth > width || newHeight > height) {
    xAR = width/newWidth;
    yAR = height/newHeight;
    if(xAR < yAR){
      newWidth = newWidth * xAR;
      newHeight = newHeight * xAR;
    }
    else {
      newWidth = newWidth * yAR;
      newHeight = newHeight * yAR;
    }
  }
  image(controlsImage, width/2, height/2, newWidth, newHeight);
}

function drawSmallKey(){
  colorMode(RGB);
  stroke(1);
  strokeWeight(1);
  textAlign(CENTER);

  textSize(12);
  textAlign(RIGHT);
  textStyle(ITALIC);
  //textFont("Oswald");
  fill(255);
  text("Show/Hide Controls (H)", width-5, height-7);
}

function controlsImageLoadedSuccessful() {
  controlsImageLoaded = true;
}
