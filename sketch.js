// The Starting Line Game
// By Lauren Race and Terrick Gutierrez
// runs on p5.js, tested on the alpha editor, chrome, macbook
// November 2017
// Updated Dec 12
// W YES and NO printed
// with array for images
// with serial
// with images changing as moderator button is pressed

// red value #e50022
//add "Yes" and/or "No" on the screen after ppl answer


let serial;
let portName = '/dev/cu.usbmodem1411';

let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];

let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;

let percentage1 = 0;
let percentage2 = 0;
let scoreCalculated = false;

let myFont;

let mySound = [];

let randomString0 = " ";
let randomString1 = " ";
let randomString2 = " ";
let randomString3 = " ";

// preload the imgages (img[0] is not working... make sure to debug)
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  img[12] = loadImage("TSL/SL12.png");
  myFont = loadFont('RobotoMono-Bold.ttf');

  soundFormats('mp3', 'ogg');
  mySound[0] = loadSound('Sound/Answer_Y.mp3');
  mySound[1] = loadSound('Sound/Answer_N.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a serial port
  serial.on('data', serialEvent); // callback for when new data arrives

}


function draw() {
  background(220);

  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(170);
  textAlign(CENTER);
  if (imageIndex > 11) {
    // fill('red');
    fill(0, 173, 231);
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7 + 25);
    // fill('orange');
    fill(82, 82, 82);
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7 + 25);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);

  if (imageIndex <= 11) {

    rect(windowWidth / 16 - 13, windowHeight * 3 / 5 + 2, percentage1 * 5, 15);
    rect(windowWidth * 9 / 16 - 7, windowHeight * 3 / 5 + 2, percentage2 * 5, 15);

  }
  if ( imageIndex > 1 && imageIndex < 12 ) {
    textAlign(CENTER);
    textSize(70);
    fill(58, 164, 128);
    // YES
    text(randomString0, windowWidth * 1 / 4 - 5, 300);
    text(randomString2, windowWidth * 3 / 4 - 5, 300);
    
    fill(229, 32, 42);
    // NO
    text(randomString1, windowWidth * 1 / 4 - 5, 300);
    text(randomString3, windowWidth * 3 / 4 - 5, 300);
  }
 

}


function serialEvent() {
  var data = serial.readLine();
  console.log(data);

  if (data == "0") {
    console.log(data);
    mySound[0].play();
    randomString0 = "Yes";
  } else if (data == "1") {
    console.log(data);
    mySound[1].play();
    randomString1 = "No";

  } else if (data == "2") {
    console.log(data);
    mySound[0].play();
    randomString2 = "Yes";
  } else if (data == "3") {
    console.log(data);
    mySound[1].play();
    randomString3 = "No";
  } else if (data.length > 0) {
    console.log(data);
    if (data.length >= 2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {


        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}

function calculateScore(data) {
  if (data[0] == 1) {
    score[0]++;
  }


  if (data[2] == 1) {
    score[1]++;
  }
  //console.log(score);
  currentQuestion++;
  imageIndex++;
  scoreCalculated = false;
  randomString0 = " ";
  randomString1 = " ";
  randomString2 = " ";
  randomString3 = " ";

  if (imageIndex > 12) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;
   

  }


  // if we are on imageIndex 11 print percentage at this location for both players
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}

//for resizing the canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}