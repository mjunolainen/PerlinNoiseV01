let points = [];

let mult, r1, r2, g1, g2, b1, b2, max;

function setup() {
  // Why does this show error in my WebStorm IDE?
  createCanvas(windowWidth, windowHeight);
  background(30);
  angleMode(DEGREES);
  noiseDetail(1);

  let density = 50;
  let space = width / density;

  for (let x = 0; x < width; x += space) {
    for (let y = 0; y < height; y += space) {
      let p = createVector(x + random(-10, 10), y + random(-10, 10));
      points.push(p);
    }
  }

  shuffle(points, true);

  r1 = random(255);
  r2 = random(255);
  g1 = random(255);
  g2 = random(255);
  b1 = random(255);
  b2 = random(255);
  mult = random(0.002, 0.01);
}

function draw() {
  noStroke();

  if (frameCount * 3 <= points.length) {
    max = frameCount * 3;
  } else {
    max = points.length;
  }

  for (let i = 0; i < max; i++) {
    let r = map(points[i].x, 0, width, r1, r2);
    let g = map(points[i].y, 0, height, g1, g2);
    let b = map(points[i].x, 0, width, b1, b2);
    let alpha = map(
      dist(width / 2, height / 2, points[i].x, points[i].y),
      0,
      350,
      300,
      0
    );

    fill(r, g, b, alpha);

    let angle = map(
      noise(points[i].x * mult, points[i].y * mult),
      0,
      1,
      0,
      720
    );
    points[i].add(createVector(cos(angle), sin(angle)));

    if (dist(width / 2, height / 2, points[i].x, points[i].y) < 350) {
      ellipse(points[i].x, points[i].y, 1);
    }
  }
}