let font;
let vehicles = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(452, 150);
  background(255);

  var points = font.textToPoints('Welcome!', 45, 150, 75, {
    sampleFactor: 0.25
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    let c = color(random(256), random(256), random(256));
    var vehicle = new Vehicle(pt.x, pt.y, c);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(255);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
