let button;
let results = ["W", "W", "W", "W", "L", "L", "L", "L", "L", "L"];
let simulations = [];

function setup() {
  createCanvas(1000, 500);

  button = createButton('Generate');
  button.position(50, 10);
  button.mousePressed(generate);
}

function draw() {
  background(220);
  for(var r = 0; r < simulations.length; r++) {
    let stringBuild = "";
    for(var c = 0; c < simulations[r].length; c++) {
      stringBuild += simulations[r][c] + " ";
    }
    let num;
    if(r < 9){num = "0" + (r+1);}
    else{num = (r+1);}
    if(r < 20){text("Simulation " + num + ":     " + stringBuild, 50, 50 + r*20);}
    else{text("Simulation " + num + ":     " + stringBuild, 450, 50 + (r-20)*20);}
  }
}

function generate() {
  if(simulations.length < 40) {
    simulations.push(shuffle(results, false));
  }
}
