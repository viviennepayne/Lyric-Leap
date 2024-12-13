let interval = 80;
let balls = [];
let taylorpic;
let mic;
let easing = 0.01;
let moveThreshold = 0.1;
let moveStep = 5;
let Taylor;
let gameOver = false; 
let startTime; 
let score = 0 

function preload() {
  bg = loadImage("BG.jpeg"); 
  taylorpic = loadImage("icon.png");
}

function setup() {
  createCanvas(500, 300);
  imageMode(CENTER);

  Taylor = new Tay(100, 200, 4);
  mic = new p5.AudioIn();
  mic.start();

  frameRate(30);
  
  startTime = millis();
}

function draw() {
  image(bg, width / 2, height / 2, 500, 300);
  
  if (!gameOver) {  
    score = int((millis() - startTime) / 1000); 
  }
  fill(247, 30, 193); 
  rect(5, 20, 85, 30); 

  fill("white");
  textSize(18);
  textStyle(BOLD);
  text("Score: " + score, 10, 40); 


  if (frameCount % interval === 0 && !gameOver) {
  let randomY = random(height * 2 / 3, height);  
  let b = new Ball(width, randomY, -3); 
  balls.push(b);
}

    

  for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall();
    balls[i].moveBall();
    balls[i].collision();
  }

  let micVolume = mic.getLevel();
  let targetY = map(micVolume * 10, 0, 1, height, 0);

  if (micVolume > moveThreshold && !gameOver) { 
    Taylor.y += (targetY - Taylor.y * 10) * easing;
  } else {
    Taylor.y += 5; 
  }

  Taylor.y = constrain(Taylor.y, 0, height - 68);
  Taylor.x = constrain(Taylor.x, 0, width);

  if (!gameOver) {  
    Taylor.drawTay();
  }
}

class Ball {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  drawBall() {
    strokeWeight(0);
    fill("black");
    rect(this.x + 7, this.y - 5, 20, 10); 
    fill("rgba(128,128,128,0.85)");
    ellipse(this.x, this.y, 20, 20); 
  }

  moveBall() {
    this.x = this.x + this.speed;
  }

  collision() {
    if (this.x <= 110 && this.y > Taylor.y - 70 && this.y < Taylor.y + 70) {
      fill("pink");
      rect(0, 0, 550, 350);
      fill("white");
      textSize(50);
      textFont("IM Fell DW Pica");
      text("GAME OVER", 100, 155);
      textSize(20);
      text("final score: " + score, 200, 200); 
      text("press space to restart", 165, 250);
      balls = [];  
      gameOver = true; 
      noLoop();  
    }
  }
}

class Tay {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  drawTay() {
    let scaleFactor = 2;
    let newWidth = 90 * scaleFactor;
    let newHeight = 90 * scaleFactor;
    image(taylorpic, this.x, this.y, newWidth, newHeight);
  }
}

function keyPressed() {
  if (key === ' ' || key === 'Spacebar') {  
    resetGame();  
  }
}

function resetGame() {
  balls = []; 
  Taylor = new Tay(100, 200, 4); 
  gameOver = false; 
  startTime = millis (); 
  score = 0
  loop();
}
