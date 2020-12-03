// neat honeycomb pulsating color background thing
// colors (or just grayscale shades) oscillate between
// two bounds at varying rates
const hex = [];

function setup() {

  let width = window.innerWidth;
  let height = window.innerHeight * 1.6
  createCanvas(width, height * 0.993);
  frameRate(24)
  initHex()
}

function initHex() {

  let width = window.innerWidth;
  let height = window.innerHeight * 1.6
  // start with approx desired spacing coef
  let seedSpacingCoef = 0.3
  // generate actual spacing to be at the correct width such that
  // the row of hexagons are symmetrical. 
  // looks more pleasing that way
  let spacingCoef = generateSpacingCoef(width, seedSpacingCoef);
  let space = width * spacingCoef; // x spacing
  // let hexWidth = space * 0.5766;
  let hexWidth = space * 0.578;
  let colLength = Math.ceil(height / space);
  // console.log('colLength', colLength)
  let rowLength = Math.ceil(width / space);


  function generateSpacingCoef(width, seedSpacingCoef) {
    let space = width * seedSpacingCoef
    let i = 0
    while (width % space > 2 && i < 100) {
      space = width * seedSpacingCoef
      seedSpacingCoef -= 0.001;
      i++
    }
    return seedSpacingCoef
  }


  // console.log('colLength', colLength)
  // console.log('rowLength', rowLength)
  let id = 0;
  let upperBound = 255;
  let lowerBound = 180;
  for (let y = 0; y < colLength; y++) {
    let py = y * space * sqrt(3) / 2; // y position
    for (let x = 0; x < rowLength + 1; x++) {
      let color = random(lowerBound, upperBound);
      if (y % 2 === 0) {
        hex[id] = new Hex(id, x * space, py, hexWidth,
          color, upperBound, lowerBound);
        hex[id].makeHexagon();
      } else {
        hex[id] = new Hex(id, space / 2 + x * space, py,
          hexWidth, color, upperBound, lowerBound);
        hex[id].makeHexagon();
      }
      id++;
      // console.log('id', id)
    }
  }
}

function draw() {
  background(255);
  hex.forEach((h) => {
    h.incrementColor()
    h.makeHexagon()
  })
  // console.log('frameRate()', frameRate())
}

function windowResized() {

  let width = window.innerWidth;
  let height = window.innerHeight * 1.6
  resizeCanvas(width, height * 0.993);

  initHex()
}

class Hex {
  constructor(id, x, y, radius, color, upperBound, lowerBound) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isIncreasing = Math.random() > 0.5 ? true : false;
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
  }



  incrementColor() {

    if (this.color > this.lowerBound && this.color < this.upperBound) {
      // if (random() > 0.1) {
      if (true) {
        if (this.isIncreasing) {
          // this.color+=floor(abs(randomGaussian(1, 1)))+1;
          if (random() > 0.999) {
            this.color += 80
          } else {
            this.color += random([0,1,1,1,1,1,2])
            // this.color += 2
          }
        } else {
          // this.color-=floor(abs(randomGaussian(1, 1)))+1;
          if (random() > 0.999) {
            this.color -= 80
          } else {
            this.color -= random([0,1,1,1,1,1,2])
            // this.color -= 2
          }

        }
      }
    }

    if (this.color >= this.upperBound) {
      this.color = this.upperBound
      // this.color-=random([1,2,3,3,3,4,4,4,4]);
      this.color -= floor(abs(randomGaussian(1, 1)));
      this.isIncreasing = false;
    }
    if (this.color <= this.lowerBound) {
      this.color = this.lowerBound
      // this.color+=random([1,2,3,3,3,4,4,4,4]);
      this.color += floor(abs(randomGaussian(1, 1)));
      this.isIncreasing = true;
    }
  }

  makeHexagon() {
    // fill(this.color, this.color, this.color, 255);
    fill(this.color, this.color, this.color, 255);
    noStroke();
    strokeWeight(5);
    // stroke(`#6478E633`);

    angleMode(DEGREES);
    beginShape();
    for (let a = 30; a < 390; a += 60) {
      let sx = this.x + cos(a) * this.radius;
      let sy = this.y + sin(a) * this.radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }



  display() {

  }
}