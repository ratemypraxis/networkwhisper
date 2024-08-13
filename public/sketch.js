let synth;
let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5"];
let interval;
let networkSpeed = 0;
//2 mins
// let testDuration = 2 * 60 * 1000; 

// 10 secs
let testDuration = 10000; 

let testInterval = 1000; 
let startTime;
let endTime;
let showSpeed = false;
let speedDisplayDelay = 2000; 
let thankYouText;
let listenAgainButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(2);
  
  let startButton = createButton("listen closely");
  startButton.position(width / 2 - startButton.width / 2, height / 2 - startButton.height / 2);
  startButton.mousePressed(startTest);
  startButton.style('background-color', '#ffffff');
  startButton.style('border', '2px solid #333333');
  startButton.style('border-radius', '20px');
  startButton.style('padding', '10px 20px');
  startButton.style('font-size', '24px');
  startButton.style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.2)');
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
  
  select('button').hide();
}

function getDownloadSpeed() {
  if (Date.now() > endTime) {
    stopTest(); 
    return;
  }

  //specific to oldBike pic
  const imageSizeMB = 5.3; 
  const downloadStartTime = Date.now();
  fetch('/oldBike.jpg')
    .then(response => {
      if (!response.ok) throw new Error('cant download pic');
      return response.blob();
    })
    .then(() => {
      const downloadEndTime = Date.now();
      const downloadTime = (downloadEndTime - downloadStartTime) / 1000; 
      const downloadSpeed = (imageSizeMB / downloadTime) * 8; 
      updateNetworkSpeed(downloadSpeed);
    })
    .catch(error => console.error('download speed not working', error));

  setTimeout(getDownloadSpeed, testInterval);
}

function updateNetworkSpeed(speed) {
  networkSpeed = speed;
  if (synth) {
    let speedRatio = map(networkSpeed, 0.1, 2000, 0.5, 2); 
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
  thankYouText = createP("Thank you for taking the test!");
  thankYouText.position(width / 2, height / 2);
  thankYouText.style('font-size', '32px');
  thankYouText.style('color', '#ffffff');

  listenAgainButton = createButton("Listen Again?");
  listenAgainButton.position(width / 2 - listenAgainButton.width / 2, height / 2 - listenAgainButton.height / 2 + 50);
  listenAgainButton.mousePressed(() => {
    location.reload(); 
  });
  listenAgainButton.style('background-color', '#ffffff');
  listenAgainButton.style('border', '2px solid #333333');
  listenAgainButton.style('border-radius', '20px');
  listenAgainButton.style('padding', '10px 20px');
  listenAgainButton.style('font-size', '24px');
  listenAgainButton.style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.2)');
}

function draw() {
  let blueShade = map(networkSpeed, 0, 1000, 255, 50); 
  background(0, 0, blueShade);

  if (showSpeed) {
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text(`reaching u at`, width / 2, height / 3);
    text(`${networkSpeed.toFixed(2)} Mbps`, width / 2, height / 2);

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
