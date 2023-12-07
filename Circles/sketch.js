let numCircles = 100;
let x = [];
let y = [];
let sizes = [];
let colors = [];

let perlin = false;

let noiseValue = 0;
let noiseDelta = 0.007;

function setup() {
  createCanvas(452, 250);
  
  for(let i = 0; i < numCircles; i++) {
    x.push(Math.floor(Math.random() * .8*width + .1*width));
    y.push(Math.floor(Math.random() * .8*height + .1*height));
    sizes.push(Math.floor(Math.random() * 20 + 6));
    colors.push([Math.floor(Math.random()*256),
                 Math.floor(Math.random()*256),
                 Math.floor(Math.random()*256)]);
  }
}

function draw() {
  background(255);
  
  if(perlin) {
    for(let i = 0; i < numCircles; i++) {
      fill(colors[i]);
      let x = width * noise(noiseValue + i*42.4223);
      let y = height * noise(noiseValue + i*42.4223 + 100);
      circle(x, y, sizes[i]);
    }
    noiseValue += noiseDelta;
  }
  else {
    for(let i = 0; i < x.length; i++) {
      fill(colors[i]);
      circle(x[i], y[i], sizes[i]);
      x[i] += Math.floor(Math.random() * 5 - 2);
      y[i] += Math.floor(Math.random() * 5 - 2);
      if(x[i] < .1*width) x[i] = .1*width;
      if(x[i] > .9*width) x[i] = .9*width;
      if(y[i] < .1*height) y[i] = .1*height;
      if(y[i] > .9*height) y[i] = .9*height;
    }
  }
}

function mouseClicked() {
  perlin = !perlin;
}