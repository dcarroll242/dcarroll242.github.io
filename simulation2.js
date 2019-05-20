let button1, button2, checkbox;
let results = [9, 10, 10, 10, 11, 12, 14, 14, 15, 15, 17, 17, 18, 20];
let simulations = [];
let maxSimulations = 100;
let showScores = false;
let allScores = [];

function setup() {
  createCanvas(1270, 1550);
  button1 = createButton('Generate Simulation');
  button1.position(50, 10);
  button1.mousePressed(generate);
  button2 = createButton('Generate 100 Simulations');
  button2.position(200, 10);
  button2.mousePressed(generateAll);
  button3 = createButton('Show Scores');
  button3.position(375, 10);
  button3.mousePressed(showAllScores);
}

function draw() {
  background(220);
  displaySimulations();

  if(simulations.length == maxSimulations){
    text("<Maximum of " + maxSimulations + " Simulations Allowed>", 50 + 4*250, 80 + (100-80)*60);
  }
}

function displaySimulations(){
  allScores = [];
  for(var i = 0; i < simulations.length; i++) {
    let simulation = simulations[i], stringBuild = "", fun = [], notFun = [], score, num;

    for(var j = 0; j < simulation.length; j++){
      if(j < 7){fun.push(simulation[j]);}
      else{notFun.push(simulation[j]);}
    }

    score = median(fun) - median(notFun);
    allScores.push(score);

    stringBuild += "       Fun: "
    for(var j = 0; j < fun.length; j++) {
      if(fun[j] < 10){stringBuild += "0";}
      stringBuild += fun[j] + " ";
    }
    stringBuild += "\nNot Fun: ";
    for(var j = 0; j < notFun.length; j++) {
      if(notFun[j] < 10){stringBuild += "0";}
      stringBuild += notFun[j] + " ";
    }

    if(showScores){score = "SCORE = " + score;}
    else{score = "";}

    if(i < 9){num = "0" + (i+1);}
    else{num = (i+1);}

    if(i < maxSimulations/5*1){text("SIMULATION " + num + ":  " + score + "\n" + stringBuild, 50 + 0*250, 80 + i*60);}
    else if(i < maxSimulations/5*2){text("SIMULATION " + num + ":  " + score + "\n" + stringBuild, 50 + 1*250, 80 + (i-20)*60);}
    else if(i < maxSimulations/5*3){text("SIMULATION " + num + ":  " + score + "\n" + stringBuild, 50 + 2*250, 80 + (i-40)*60);}
    else if(i < maxSimulations/5*4){text("SIMULATION " + num + ":  " + score + "\n" + stringBuild, 50 + 3*250, 80 + (i-60)*60);}
    else if(i < maxSimulations/5*5){text("SIMULATION " + num + ":  " + score + "\n" + stringBuild, 50 + 4*250, 80 + (i-80)*60);}
  }

  if(showScores){
    text("*** scroll to the bottom for a consolidated list of scores ***", 500, 20);
    let report1 = "Consolidated List of Scores:";
    let frequencies = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(var i = 0; i < allScores.length; i++){
      if(i % 10 == 0){report1 += "\n";}
      if(allScores[i] >= 0){report1 += " ";}
      report1 += allScores[i] + " ";
      frequencies[allScores[i]+7]++;
    }
    text(report1, 50, 1300);

    let report2 = "Score: Frequency\n";
    for(var i = 0; i < frequencies.length; i++){
      if(i-7 >= 0){report2 += " ";}
      report2 += (i-7) + ": " + frequencies[i] + "\n";
    }
    text(report2, 300, 1300);
  }
}

function generate() {
  if(simulations.length < maxSimulations) {
    simulations.push(shuffle(results, false));
  }
}

function generateAll(){
  for(var i = simulations.length-1; i < maxSimulations-1; i++){
    simulations.push(shuffle(results, false));
  }
}

function median(values){
  if(values.length === 0) return 0;

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

function showAllScores() {
  if(showScores){showScores = false;}
  else{showScores = true;}
}
