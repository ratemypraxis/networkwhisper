let synth;
let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5"];
let interval;
let networkSpeed = 0;

//2 mins
let testDuration = 2 * 60 * 1000; 

// 10 secs
// let testDuration = 10000; 


let testInterval = 1000;
let startTime;
let endTime;
let showSpeed = false;
let speedDisplayDelay = 2000;
let startButton;
let listenAgainButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  fill(255);
  stroke(0);
  strokeWeight(2);
  
  startButton = new Button("Press Ear to Server", width / 2, height / 2, 300, 70, startTest);
}

function draw() {
  let blueShade = map(networkSpeed, 0, 1000, 255, 50);
  background(0, 0, blueShade);

  if (showSpeed) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`${networkSpeed.toFixed(2)} secrets per second`, width / 2, height / 2);
  }

  // Draw buttons
  startButton.display();
  if (listenAgainButton) {
    listenAgainButton.display();
  }
}

function mousePressed() {
  if (startButton.isClicked()) {
    startButton.action();
  }
  if (listenAgainButton && listenAgainButton.isClicked()) {
    listenAgainButton.action();
  }
}

function mouseMoved() {
  let pointerOverButton = startButton.isHovered() || (listenAgainButton && listenAgainButton.isHovered());

  if (pointerOverButton) {
    cursor('pointer');
  } else {
    cursor('default');
  }
}

function startTest() {
  startTime = Date.now();
  endTime = startTime + testDuration;

  setTimeout(() => {
    showSpeed = true;
  }, speedDisplayDelay);

  synth = new p5.PolySynth();
  playNote();
  
  getDownloadSpeed();
  
  startButton.hide();
}

function getDownloadSpeed() {
  if (Date.now() > endTime) {
    stopTest();
    return;
  }

  const imageSizeMB = 5.3;
  const downloadStartTime = Date.now();
  fetch('/oldBike.jpg')
    .then(response => {
      if (!response.ok) throw new Error('Cant download pic');
      return response.blob();
    })
    .then(() => {
      const downloadEndTime = Date.now();
      const downloadTime = (downloadEndTime - downloadStartTime) / 1000;
      const downloadSpeed = (imageSizeMB / downloadTime) * 8;
      updateNetworkSpeed(downloadSpeed);
    })
    .catch(error => console.error('Download speed not working', error));

  setTimeout(getDownloadSpeed, testInterval);
}

function updateNetworkSpeed(speed) {
  networkSpeed = speed;
  if (synth) {
    let speedRatio = map(networkSpeed, 1, 1500, 2, 8);
    synth.play(notes[int(random(notes.length))], 0.5, 0, speedRatio);
  }
  redraw();
}

function playNote() {
  try {
    let noteCount = int(random(1, 4));
    let duration = random(2, 6);
    let index = 0;

    while (index < noteCount) {
      let note = random(notes);
      let velocity = random(0.2, 0.5);
      synth.play(note, velocity, 0, duration);
      index++;
    }
  } catch (error) {
    console.error(error);
  } finally {
    between();
  }
}

function between() {
  let space = random(300, 1000) / map(networkSpeed, 0.1, 100, 0.5, 2);
  interval = setTimeout(playNote, space);
}

function stopTest() {
  if (synth) {
    synth.dispose();
  }
  clearInterval(interval);
  noLoop();
  redraw();

  showSpeed = false;
  createThankYouScreen();
}

function createThankYouScreen() {
  listenAgainButton = new Button("Listen Again?", width / 2, height / 2, 300, 70, () => {
    location.reload();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  startButton.updatePosition(width / 2, height / 2);
  if (listenAgainButton) {
    listenAgainButton.updatePosition(width / 2, height / 2);
  }
}

class Button {
  constructor(label, x, y, w, h, action) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.action = action;
    this.isVisible = true;
  }

  display() {
    if (!this.isVisible) return;

    fill(255);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 25);
    
    fill(0);
    noStroke();
    textSize(24);
    text(this.label, this.x, this.y);

    drawingContext.shadowOffsetX = 14;
    drawingContext.shadowOffsetY = 14;
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)';

    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 'rgba(0, 0, 0, 0)';
  }

  isClicked() {
    if (!this.isVisible) return false;
    return mouseX > this.x - this.w / 2 &&
           mouseX < this.x + this.w / 2 &&
           mouseY > this.y - this.h / 2 &&
           mouseY < this.y + this.h / 2;
  }

  isHovered() {
    return mouseX > this.x - this.w / 2 &&
           mouseX < this.x + this.w / 2 &&
           mouseY > this.y - this.h / 2 &&
           mouseY < this.y + this.h / 2;
  }

  hide() {
    this.isVisible = false;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
