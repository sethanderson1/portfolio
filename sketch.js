// neat honeycomb pulsating color background thing
// colors (or just grayscale shades) oscillate between
// two bounds at varying rates

// todo: mobile a bit glitchy when scroll 
// i think the reason might be: when at top of page,
// scroll bar isn't there, then when scroll down, 
// scroll bar appears and decreases the width slighly, 
// then setup funciton must run and mess things up??
// fix would be to maybe have width slot into notches type thing

// let height = document.body.scrollHeight
const hex = [];

function setup() {

  let width = window.innerWidth;
  let height = window.innerHeight * 1.6
  // const body = document.body,
  //   html = document.documentElement;

  // const height = Math.max(body.scrollHeight, body.offsetHeight,
  //   html.clientHeight, html.scrollHeight, html.offsetHeight);
  //   console.log('height', height)


  // todo: might have to have better way of controlling width
  // maybe set something to position relative. 
  // figure out something to prevent horizontal scroll par from appearing
  createCanvas(width, height * 0.993);
  frameRate(15)
  initHex()
}

function initHex() {

  let width = window.innerWidth;
  let height = window.innerHeight * 1.6
  // start with approx desired spacing coef
  let seedSpacingCoef = 0.2
  // generate actual spacing to be at the correct width such that
  // the row of hexagons are symmetrical. 
  // looks more pleasing that way
  let spacingCoef = generateSpacingCoef(width,seedSpacingCoef);
  let space = height * spacingCoef; // x spacing
  let hexWidth = space * 0.5766;
  let colLength = Math.ceil(height / space);
  let rowLength = Math.ceil(width / space);

  
  function generateSpacingCoef(width,seedSpacingCoef) {
    let space = height * seedSpacingCoef
    let i = 0
    while (width % space > 2 && i < 100) {
      space = height * seedSpacingCoef
      seedSpacingCoef -= 0.001;
      i++
    }
    return seedSpacingCoef
  }


  console.log('colLength', colLength)
  console.log('rowLength', rowLength)
  let id = 0;
  let upperBound = 255;
  let lowerBound = 220;
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
      console.log('id', id)
    }
  }
}

function draw() {
  background(255);
  hex.forEach((h) => {
    h.incrementColor()
    h.makeHexagon()
  })
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
      if (Math.random() > 0.25) {
        if (this.isIncreasing) {
          this.color++;
        } else {
          this.color--;
        }
      }
    }

    if (this.color >= this.upperBound) {
      this.color--;
      this.isIncreasing = false;
    }
    if (this.color <= this.lowerBound) {
      this.color++;
      this.isIncreasing = true;
    }
  }

  makeHexagon() {
    fill(this.color, this.color, this.color, 255);
    noStroke();
    // strokeWeight(1);
    // stroke(this.color/4,this.color/4,this.color/4,this.color/8);

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