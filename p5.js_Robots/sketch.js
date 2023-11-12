let robots = [];
let move = true;
let angle = 0;
let cnv;

function setup() {
  cnv = createCanvas(452, 250);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  
  robots.push([width/2-100, height/2, "#00cc99", "#9900ff", 65, 87, 83, 68, 3]);
  robots.push([width/2+100, height/2, "#3366ff", "#ffccff", 74, 73, 75, 76, 2]);
  robots.push([width/2, height/2, "#ffff66", "#ff0000", 37, 38, 40, 39, 5]);
}

function draw() {
  background(255, 70);
  
  drawRobots();
  
  if(move) {
    for(let i = 0; i < robots.length; i++) {
      angleMode(degrees);
      robots[i][1] = 0.25 * height * sin((angle + 200*i) / 20) + height/2; 
    }
    angle++;
  }
  
}

function drawRobot(x, y, limColor, shirtColor) {
  fill(shirtColor);
  rect(x - 20, y - 19, 40, 59);  // body
  fill(limColor);
  rect(x - 20, y - 41, 40, 20);  // head
  rect(x - 20, y + 41, 10, 20);  // left leg
  rect(x + 10, y + 41, 10, 20);  // right leg
  rect(x - 31, y -  0, 10, 10);  // left hand
  rect(x + 21, y -  0, 10, 10);  // right hand
  line(x - 16, y - 26, x + 16, y - 28)  // mouth
  fill("#ffffff");
  circle(x - 14, y - 34, 3);  // left eye
  circle(x + 14, y - 34, 3);  // right eye
  fill(0, 0);
  circle(x, y, 15);  // shirt circle
  fill(255);
  triangle(x - Math.random()*10 + 5, y - Math.random()*10,
           x-Math.random()*10, y+Math.random()*10,
           x+Math.random()*10, y+Math.random()*10);  // shirt triangle
}

function drawRobots() {
  for(let i = 0; i < robots.length; i++) {
    updateRobotLocation(i);
    drawRobot(robots[i][0], robots[i][1], robots[i][2], robots[i][3]);
  }
}

function updateRobotLocation(index) {
  if(keyIsDown(robots[index][4])) {
      robots[index][0] -= robots[index][8];
    }
    if(keyIsDown(robots[index][5])) {
      robots[index][1] -= robots[index][8];
    }
    if(keyIsDown(robots[index][6])) {
      robots[index][1] += robots[index][8];
    }
    if(keyIsDown(robots[index][7])) {
      robots[index][0] += robots[index][8];
    }
}

function mousePressed() {
  move = !move;
}

