// neat honeycomb pulsating color background thing
// colors (or just grayscale shades) oscillate between
// two bounds at varying rates
const hex = [];
const colorSchemes = [
  ['#E8614F', '#F3F2DB', '#79C3A7', '#668065', '#4B3331'],
  ['#152A3B', '#158ca7', '#F5C03E', '#D63826', '#F5F5EB'],
  ['#0F4155', '#288791', '#7ec873', '#F04132', '#fcf068'],
  ['#152A3B', '#0D809C', '#F5C03E', '#D63826', '#EBEBD6'],
  ['#0F4155', '#5399A1', '#8CA96B', '#CB5548', '#E7E6F5'],
  ['#DBE5EC', '#336B87', '#2A3132', '#E94D35', '#EFAC55'],
  ['#8A867F', '#FFE8B7', '#FFBE87', '#E38A74', '#BF5967'],
  ['#2A5A26', '#3E742F', '#568D3B', '#6DA850', '#89C15F'],
  ['#0B1C26', '#234459', '#7AA5BF', '#A0C3D9', '#BF7950'],
  ['#234D51', '#9DD3D9', '#59C6D1', '#3B4F51', '#FF513F'],
];

function setup() {
  let width = window.innerWidth;
  let height = window.innerHeight * 1.6
  createCanvas(width, height * 0.993);
  frameRate(25)
  background(255);
  // noLoop()
  initHex()
}

function initHex() {
  let width = window.innerWidth;
  let height = window.innerHeight * 1.6
  // start with approx desired spacing coef
  let seedSpacingCoef = 0.105
  // let seedSpacingCoef = 0.3
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
  // console.log('rowLength', rowLength)

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

  let id = 0;
  let upperBound = 255;
  let lowerBound = 180;
  let upperAlphaBound = 110;
  let lowerAlphaBound = 0;
  let colorScheme = random(colorSchemes)
  for (let y = 0; y < colLength; y++) {
    let py = y * space * sqrt(3) / 2; // y position
    for (let x = 0; x < rowLength; x++) {
      // console.log('id', 'x', 'y', id, x, y)
      let color = random(colorScheme);
      let alpha = random(lowerAlphaBound, upperAlphaBound)
      let possibleNeighbors = generatePossibleNeighbors(colLength, rowLength, x, y);
      // console.log('possibleNeighbors', possibleNeighbors)
      let adjacencyList = {}
      if (y % 2 === 0) {
        hex[id] = new Hex(id, x * space, py, hexWidth,
          color, alpha, colorScheme, upperBound, lowerBound, upperAlphaBound, lowerAlphaBound, possibleNeighbors, adjacencyList);
        hex[id].makeHexagon();
        // let s = `${[id, x, y]}`
        // textSize(15);
        // fill(50);
        // text(s, x * space - 20, py);
      } else {
        hex[id] = new Hex(id, space / 2 + x * space, py,
          hexWidth, color, alpha, colorScheme, upperBound, lowerBound, upperAlphaBound, lowerAlphaBound, possibleNeighbors, adjacencyList);
        hex[id].makeHexagon();
        // let s = `${[id, x, y]}`
        // textSize(15);
        // fill(50);
        // text(s, space / 2 + x * space - 20, py);
      }
      id++;
    }

  }


}

function generatePossibleNeighbors(colLength, rowLength, x, y) {
  const possibleNeighbors = []
  if (x > 0 && x < rowLength) {
    possibleNeighbors.push([x - 1, y], [x + 1, y])
  }

  if (y > 0 && y < colLength) {
    possibleNeighbors.push([x - 1, y - 1], [x, y - 1], [x - 1, y + 1], [x, y + 1])
  }
  return possibleNeighbors
}

function draw() {
  background(255);
  hex.forEach((h) => {
    h.incrementAlpha()
    h.makeHexagon()
  })
}

class Hex {
  constructor(id, x, y, radius, color, alpha, colorScheme, upperBound, lowerBound, upperAlphaBound, lowerAlphaBound, possibleNeighbors, adjacencyList) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.alpha = alpha;
    this.colorScheme = colorScheme;
    this.isIncreasing = Math.random() > 0.5 ? true : false;
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
    this.upperAlphaBound = upperAlphaBound;
    this.lowerAlphaBound = lowerAlphaBound;
    this.possibleNeighbors = possibleNeighbors;
    this.adjacencyList = adjacencyList;

  }

  incrementAlpha() {
    if (this.alpha > this.lowerAlphaBound && this.alpha < this.upperAlphaBound) {
      if (this.isIncreasing) {
        this.alpha += random([0, 1, 1, 2, 2, 2, 3, 3, 3,4])
        // this.alpha += random([1,1,1,2,2,2,2,2,3,3,4,4])
        // this.alpha += random([0, 1, 1, 1, 1, 1, 2])
      } else {
        this.alpha -= random([0, 1, 1, 2, 2, 2, 3, 3, 3,4])
        // this.alpha -= random([1,1,1,2,2,2,2,2,3,3,4,4])
        // this.alpha -= random([0, 1, 1, 1, 1, 1, 2])
      }
    }
    if (this.alpha >= this.upperAlphaBound) {
      this.alpha = this.upperAlphaBound
      this.alpha -= 1;
      // this.alpha -= floor(abs(randomGaussian(1, 1)));
      this.isIncreasing = false;
    }
    if (this.alpha <= this.lowerAlphaBound) {
      this.alpha = this.lowerAlphaBound
      this.alpha += 1;
      this.color = random(this.colorScheme)
      this.isIncreasing = true;
    }
  }

  makeHexagon() {
    let c = color(this.color)
    fill(c.levels[0], c.levels[1], c.levels[2], this.alpha);
    noStroke();
    strokeWeight(5);
    angleMode(DEGREES);
    beginShape();
    for (let a = 30; a < 390; a += 60) {
      let sx = this.x + cos(a) * this.radius;
      let sy = this.y + sin(a) * this.radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}


function windowResized() {
  let width = window.innerWidth;
  let height = window.innerHeight * 1.6;
  if (width > 500) {
    resizeCanvas(width, height * 0.993);
    initHex()
  }
}


