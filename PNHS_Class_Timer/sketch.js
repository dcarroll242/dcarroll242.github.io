let startTimes = [[07,05], [08,09], [09,10], [10,11], [11,12], [12,13], [13,14]];
let periodLengths = [59, 56, 56, 56, 56, 56, 56];
let periodLength = periodLengths[0];
let countDownDate;
let select;
let period = 1;
let chime;
let bgd;
let bgdAspectRatio;
let canvas;
let checkbox;

function preload() {
  soundFormats('mp3');
  chime = loadSound('chime.mp3');
  bgd = loadImage('rock-wall-background.jpg');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.drop(droppedFile);
  checkbox = createCheckbox('Silence Chime', false);
  checkbox.changed(myCheckedEvent);
  checkbox.position(80, 0);
  checkbox.style('color', '#ffffff');
  select = createSelect();
  select.position(0, 0);
  select.option("Period 1");
  select.option("Period 2");
  select.option("Period 3");
  select.option("Period 4");
  select.option("Period 5");
  select.option("Period 6");
  select.option("Period 7");
  select.changed(selectChanged);
  
  textAlign(CENTER);
  if(width < height) {textSize(width/10);}
  else {textSize(height/10);}
  
  selectChanged();
  
  bgdAspectRatio = bgd.width / bgd.height;
}

function draw() {
  background(0);
  let wAspectRatio = width / height;
  
  if(bgdAspectRatio > wAspectRatio) {
    bgd.width = height * bgdAspectRatio;
    bgd.height = height;
  }
  else {
    bgd.width = width;
    bgd.height = width * bgdAspectRatio;
  }
  
  image(bgd,0,0);
  
  let now = new Date().getTime();
  let toggle = countDownDate > now;
  let distance = countDownDate - now;
  if(!toggle) {
    distance += periodLength * 1000 * 60;
  }
  let classEnded = false;
  if(distance < 0) {classEnded = true;}
  distance = Math.abs(distance);
  
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  if(!checkbox.checked() && hours*60 + minutes == 0 && seconds == 0) {
    if(!chime.isPlaying()){
      chime.play();
    }
  }
  
  // if(!toggle && hours*60 + minutes == 40 && seconds == 0) {
  //   if(!chime.isPlaying()){
  //     chime.play();
  //   }
  // }
  
  // if(!toggle && hours*60 + minutes >= 40) {
  //   fill(102,178,255);
  // }

  if(width < height) {textSize(width/10);}
  else {textSize(height/10);}
  
  if(toggle){
    text("Class Begins In:\n" + pad(hours*60 + minutes,2) + " : " + pad(Math.abs(seconds),2),
       width/2, height/2);
  }
  else if(!classEnded) {
    text("Class Ends In:\n" + pad(hours*60 + minutes,2) + " : " + pad(Math.abs(seconds),2),
       width/2, height/2);
  }
  else {
    text("Class Has Ended:\n" + "(" + pad(hours*60 + minutes,2) + " : " + pad(Math.abs(seconds),2) + ")",
       width/2, height/2);
  }
  
  let size;
  if(width < height) {size = width/29;}
  else {size = height/29;}
  
  textSize(size);
  
  text("minutes",width/2 - Math.pow(size,1.35), height/2 + Math.pow(size,1.3) + size*3);
  text("seconds",width/2 + Math.pow(size,1.01) + size*2, height/2 + Math.pow(size,1.3) + size*3);
}

function selectChanged() {
  fill(255);
  stroke(0);
  strokeWeight(3);
  let selection = select.value();
  if(selection == "Period 1") {
    period = 1;
    periodLength = periodLengths[0];
  }
  if(selection == "Period 2") {
    period = 2;
    periodLength = periodLengths[1];
  }
  if(selection == "Period 3") {
    period = 3;
    periodLength = periodLengths[2];
  }
  if(selection == "Period 4") {
    period = 4;
    periodLength = periodLengths[3];
  }
  if(selection == "Period 5") {
    period = 5;
    periodLength = periodLengths[4];
  }
  if(selection == "Period 6") {
    period = 6;
    periodLength = periodLengths[5];
  }
  if(selection == "Period 7") {
    period = 7;
    periodLength = periodLengths[6];
  }
  
  let now = new Date();
  countDownDate = new Date(now.getFullYear(),
                           now.getMonth(),
                           now.getDate(),
                           startTimes[period-1][0],
                           startTimes[period-1][1],
                           0).getTime();
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function droppedFile(file) {
  //bgd = createImg(file.data).hide();
  bgd = loadImage(file.data);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function myCheckedEvent() {
  
}