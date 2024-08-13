let synth;
let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5"];
let interval;
let networkSpeed = 1;
let testDuration = 2 * 60 * 1000; // 2 minutes in milliseconds
let testInterval = 1000; // 1 second
let startTime;
let endTime;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textSize(32);
  fill(255);
  stroke(0);
  strokeWeight(2);
  
  // Create the start button
  let button = createButton("Start Test");
  button.position(width / 2 - button.width / 2, height / 2 - button.height / 2);
  button.mousePressed(startTest);
  button.style('background-color', '#ffffff');
  button.style('border', '2px solid #333333');
  button.style('border-radius', '20px');
  button.style('padding', '10px 20px');
  button.style('font-size', '24px');
  button.style('box-shadow', '0px 4px 8px rgba(0, 0, 0, 0.2)');
  
  noLoop(); // Prevent continuous loop until button is pressed
}

function startTest() {
  startTime = Date.now();
  endTime = startTime + testDuration;

  // Start the sound
  synth = new p5.PolySynth();
  playNote();
  
  // Start the network speed test
  getDownloadSpeed();
  
  // Hide the button
  select('button').hide();
}

function getDownloadSpeed() {
  if (Date.now() > endTime) {
    stopTest(); // Stop the test and sound
    return;
  }

  // Measure download speed
  const imageSizeMB = 5.3; // Size of oldBike.jpg in MB
  const downloadStartTime = Date.now();
  fetch('/oldBike.jpg')
    .then(response => {
      if (!response.ok) throw new Error('Failed to download file');
      return response.blob();
    })
    .then(() => {
      const downloadEndTime = Date.now();
      const downloadTime = (downloadEndTime - downloadStartTime) / 1000; // seconds
      const downloadSpeed = (imageSizeMB / downloadTime) * 8; // Mbps
      updateNetworkSpeed(downloadSpeed);
    })
    .catch(error => console.error('Error during download speed test:', error));

  setTimeout(getDownloadSpeed, testInterval);
}

function updateNetworkSpeed(speed) {
  networkSpeed = speed;
  // Update sound speed
  if (synth) {
    let speedRatio = map(networkSpeed, 0.1, 100, 0.5, 2); // Map speed to a ratio
    synth.play(notes[int(random(notes.length))], 0.5, 0, speedRatio);
  }
  redraw(); // Request a redraw to update the canvas
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
    synth.dispose(); // Stop all sounds
  }
  clearInterval(interval); // Clear the interval
  noLoop(); // Stop the p5.js loop
  redraw(); // Request one final redraw to update the canvas
}

function draw() {
  clear(); // Clear the canvas

  // Display network speed
  textSize(64);
  textAlign(CENTER, CENTER);
  text(`Download Speed: ${networkSpeed.toFixed(2)} Mbps`, width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
