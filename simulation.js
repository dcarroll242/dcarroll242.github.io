let button, checkbox;
let results = ["W", "W", "W", "W", "L", "L", "L", "L", "L", "L"];
let simulations = [];

function setup() {
  createCanvas(1000, 500);

  button = createButton('Generate');
  button.position(50, 10);
  button.mousePressed(generate);
  checkbox = createCheckbox('Show Scores', false);
}

function draw() {
  background(220);
  for(var r = 0; r < simulations.length; r++) {
    let stringBuild = "", num, score = 0, winLast = 0, winFirst = 0;

    for(var c = 0; c < simulations[r].length; c++) {
      stringBuild += simulations[r][c] + " ";
      if(c < 5 && simulations[r][c] == "W"){winFirst += 1;}
      if(c >=5 && simulations[r][c] == "W"){winLast += 1;}
    }
    score = winLast - winFirst;

    if(r < 9){num = "0" + (r+1);}
    else{num = (r+1);}

    if(checkbox.checked()){score = "Score = " + score;}
    else{score = "";}

    if(r < 20){text("Simulation " + num + ":     " + stringBuild + "  " + score, 50, 50 + r*20);}
    else{text("Simulation " + num + ":     " + stringBuild + "  " + score, 450, 50 + (r-20)*20);}
  }
}

function generate() {
  if(simulations.length < 40) {
    simulations.push(shuffle(results, false));
  }
}
