// This project uses p5.js. More info at https://p5js.org/

// CONTROLS
const backgroundColour = 0;
const noiseAmount = 30;
// radius of the circle where the flow field appears
const circleRadius = 300;
// number of points in each row
const density = 50;
// how many vectors appear at the same time
const sameTimeVectors = 3;
// END OF CONTROLS

let points = [];
let angleChangeSpeed, r1, r2, g1, g2, b1, b2, max;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColour);
  // set the angle mode to degrees. Default is radians
  angleMode(DEGREES);
  // adjusts the character and level of detail produced by the Perlin noise function
  noiseDetail(noiseAmount);
  // distance between each point
  let space = width / density;
  // create starting points
  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height; y += space) {
      // create a random p5.Vector datatype for storing vectors for each x and y coordinate
      // pnt is for point, because point is reserved in p5
      let pnt = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(pnt);
    }
  }
  // randomize the order of elements in the points array to make the starting of the flow field more chaotic
  shuffle(points, true);
  // prepare color randomization for vectors and the speed at which the angle of the vector changes
  r1 = random(255);
  r2 = random(255);
  g1 = random(255);
  g2 = random(255);
  b1 = random(255);
  b2 = random(255);
  angleChangeSpeed = random(0.002, 0.01);
}

function draw() {
  // disables drawing the stroke (outline)
  noStroke();
  // make x amount of vectors appear at the same time if possible
  if (frameCount * sameTimeVectors <= points.length) {
    max = frameCount * sameTimeVectors;
  } else {
    max = points.length;
  }
  // set random colours and alpha to be used each time
  // and map the coordinates of the points to the rgb values
  for (let i = 0; i < max; i++) {
    // value of point[i].x is converted from a value in the range of 0 to  window 'width'
    // into a value that ranges between the two randomly generated r1 and r2 values
    // the same goes for g and b and alpha
    let r = map(points[i].x, 0, width, r1, r2);
    let g = map(points[i].y, 0, height, g1, g2);
    let b = map(points[i].x, 0, width, b1, b2);
    // calculates the distance between two points, in two dimensions
    // and maps the value to fade out the edges
    let alpha = map(
      dist(width / 2, height / 2, points[i].x, points[i].y),
      0,
      275,
      200,
      0
    );
    fill(r, g, b, alpha);
    // angle at which each point will move
    let angle = map(
      // noise() returns the Perlin noise value at specified coordinates
      noise(points[i].x * angleChangeSpeed, points[i].y * angleChangeSpeed),
      0,
      1,
      0,
      720
    );
    // create a p5.Vector datatype for storing vectors
    points[i].add(createVector(cos(angle), sin(angle)));
    // limit the flow field to a circle,
    // using the distance from the middle of the canvas and the points coordinates
    if (dist(width / 2, height / 2, points[i].x, points[i].y) < circleRadius) {
      // create a point
      ellipse(points[i].x, points[i].y, 1);
    }
  }
}
