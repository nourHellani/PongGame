let counter = 0;
let timeout;
let timer_on = 0;

/* Define Canvas */

var canvas;
var stage;

// Graphics
//[This variable stores the title background image]

var bgImg = new Image();
var bg;

//[Title View]
//These variables store its components.

var mainImg = new Image();
var main;
var startBImg = new Image();
var startB;
var creditsBImg = new Image();
var creditsB;

//[Title View Group]

var TitleView = new Container();

//[Credits]
//This view will show the credits, year and copyright of the game, these variables will be used to store it.

var creditsViewImg = new Image();
var credits;

//[Game View]
//The next variables store the individual graphics that appear in the Game View:

var playerImg = new Image();
var player;
var ballImg = new Image();
var ball;
var cpuImg = new Image();
var cpu;
var winImg = new Image();
var win;
var loseImg = new Image();
var lose;
var timeupImg = new Image();
var timeup;

//[Score]
//The score values will be handled by the next variables:

var playerScore;
var cpuScore;
var timer;
var time;

// Variables
var xSpeed = 5; //Horizontal speed of the ball
var ySpeed = 5; //Vertical speed of the ball
var gfxLoaded = 0; //used as a preloader, counts the already loaded items
var tkr = new Object(); //used as an event listener to the Ticker

// Main Function

function Main() {
  /* Link Canvas */

  canvas = document.getElementById("Pong");
  stage = new Stage(canvas);

  stage.mouseEventsEnabled = true;

  /* Sound */

  SoundJS.addBatch([
    { name: "hit", src: "assets/mp3/hit.mp3", instances: 1 }, // played when the ball hits a paddle
    { name: "playerScore", src: "assets/mp3/playerScore.mp3", instances: 1 }, //played when they player scores
    { name: "enemyScore", src: "assets/mp3/enemyScore.mp3", instances: 1 }, //played when the enemy scores
    { name: "wall", src: "assets/mp3/wall.mp3", instances: 1 }, //played when the ball hits the top or bottom boundary
  ]);

  /* Load GFX */

  bgImg.src = "assets/png/bg.png";
  bgImg.name = "bg";
  bgImg.onload = loadGfx;

  mainImg.src = "assets/png/main.png";
  mainImg.name = "main";
  mainImg.onload = loadGfx;

  startBImg.src = "assets/png/startB.png";
  startBImg.name = "startB";
  startBImg.onload = loadGfx;

  creditsBImg.src = "assets/png/creditsB.png";
  creditsBImg.name = "creditsB";
  creditsBImg.onload = loadGfx;

  creditsViewImg.src = "assets/png/credits.png";
  creditsViewImg.name = "credits";
  creditsViewImg.onload = loadGfx;

  playerImg.src = "assets/png/paddle.png";
  playerImg.name = "player";
  playerImg.onload = loadGfx;

  ballImg.src = "assets/png/ball.png";
  ballImg.name = "ball";
  ballImg.onload = loadGfx;

  cpuImg.src = "assets/png/paddle.png";
  cpuImg.name = "cpu";
  cpuImg.onload = loadGfx;

  winImg.src = "assets/png/win.png";
  winImg.name = "win";
  winImg.onload = loadGfx;

  loseImg.src = "assets/png/lose.png";
  loseImg.name = "lose";
  loseImg.onload = loadGfx;

  timeupImg.src = 'assets/png/timesUp.png';
	timeupImg.name = 'timeup';
	timeupImg.onload = loadGfx;

  /* Ticker */

  Ticker.setFPS(30);
  Ticker.addListener(stage);
}

//Every time a graphic is loaded this function will run.
//It will assign each image to a bitmap object and check
// thatall the elements are loaded before proceeding
function loadGfx(e) {
  if ((e.target.name = "bg")) {
    bg = new Bitmap(bgImg);
  }
  if ((e.target.name = "main")) {
    main = new Bitmap(mainImg);
  }
  if ((e.target.name = "startB")) {
    startB = new Bitmap(startBImg);
  }
  if ((e.target.name = "creditsB")) {
    creditsB = new Bitmap(creditsBImg);
  }
  if ((e.target.name = "credits")) {
    credits = new Bitmap(creditsViewImg);
  }
  if ((e.target.name = "player")) {
    player = new Bitmap(playerImg);
  }
  if ((e.target.name = "ball")) {
    ball = new Bitmap(ballImg);
  }
  if ((e.target.name = "cpu")) {
    cpu = new Bitmap(cpuImg);
  }
  if ((e.target.name = "win")) {
    win = new Bitmap(winImg);
  }
  if ((e.target.name = "lose")) {
    lose = new Bitmap(loseImg);
  }
  if((e.target.name = 'timeup')){
    timeup = new Bitmap(timeupImg);
  }

  gfxLoaded++;

  if (gfxLoaded == 11) {
    addTitleView();
  }
}

// Add Title View Function
//When all the graphics are loaded the Title View is added to the stage by the following function:

function addTitleView() {
  startB.x = 240 - 31.5;
  startB.y = 160;
  startB.name = "startB";

  creditsB.x = 241 - 42;
  creditsB.y = 200;

  TitleView.addChild(main, startB, creditsB);
  stage.addChild(bg, TitleView);
  stage.update();

  // Button Listeners

  startB.onPress = tweenTitleView;
  creditsB.onPress = showCredits;
}

//The Credits screen is shown when the user clicks the credits button;
// a mouse listener is added to the full image to remove it.
function showCredits() {
  // Show Credits

  credits.x = 480;

  stage.addChild(credits);
  stage.update();
  Tween.get(credits).to({ x: 0 }, 300);
  credits.onPress = hideCredits;
}

// Hide Credits

function hideCredits(e) {
  Tween.get(credits).to({ x: 480 }, 300).call(rmvCredits);
}

// Remove Credits

function rmvCredits() {
  stage.removeChild(credits);
}

// Tween Title View

function tweenTitleView() {
  // Start Game

  Tween.get(TitleView).to({ y: -320 }, 300).call(addGameView);
}

// Add Game View

function addGameView() {
  // Destroy Menu & Credits screen

  stage.removeChild(TitleView);
  TitleView = null;
  credits = null;

  // Add Game View

  player.x = 2;
  player.y = 160 - 37.5;
  cpu.x = 480 - 25;
  cpu.y = 160 - 37.5;
  ball.x = 240 - 15;
  ball.y = 160 - 15;

  // Score

  playerScore = new Text("0", "bold 20px Arial", "#A3FF24");
  playerScore.maxWidth = 1000; //fix for Chrome 17
  playerScore.x = 211;
  playerScore.y = 20;

  cpuScore = new Text("0", "bold 20px Arial", "#A3FF24");
  cpuScore.maxWidth = 1000; //fix for Chrome 17
  cpuScore.x = 262;
  cpuScore.y = 20;

  timer = new Text('Timer:', 'bold 20px Arial', '#A3FF24');
	timer.maxWidth = 1000;	//fix for Chrome 17
	timer.x = 50;
	timer.y = 20;

	time = new Text('60', 'bold 20px Arial', '#A3FF24');
	time.maxWidth = 1000;	//fix for Chrome 17
	time.x = 120;
	time.y = 20;

  stage.addChild(playerScore, cpuScore,timer,time, player, cpu, ball);
  stage.update();

  // Start Listener

  bg.onPress = startGame;
}

// Player Movement

function movePaddle(e) {
  // Mouse Movement

  player.y = e.stageY;
}

// Start Game Function

function startGame(e) {
  bg.onPress = null;
  stage.onMouseMove = movePaddle;

  Ticker.addListener(tkr, false);
  tkr.tick = update;
}

/* Reset */

function reset() {
  ball.x = 240 - 15;
  ball.y = 160 - 15;
  player.y = 160 - 37.5;
  cpu.y = 160 - 37.5;

  stage.onMouseMove = null;
  Ticker.removeListener(tkr);
  bg.onPress = startGame;
}

// Update Function

function update() {
  // Ball Movement

  ball.x = ball.x + xSpeed;
  ball.y = ball.y + ySpeed;

  // Cpu Movement

  if (cpu.y < ball.y) {
    cpu.y = cpu.y + 2.5;
  } else if (cpu.y > ball.y) {
    cpu.y = cpu.y - 2.5;
  }

  // Wall Collision

  if (ball.y < 0) {
    ySpeed = -ySpeed;
    SoundJS.play("wall");
  } //Up
  if (ball.y + 30 > 320) {
    ySpeed = -ySpeed;
    SoundJS.play("wall");
  } //down

  if (!timer_on) {
    timer_on = 1;
    timedCount();
  }
  /* CPU Score */

  if (ball.x < 0) {
    xSpeed = -xSpeed;
    cpuScore.text = parseInt(cpuScore.text + 1);
    reset();
    SoundJS.play("enemyScore");
  }

  /* Player Score */

  if (ball.x + 30 > 480) {
    xSpeed = -xSpeed;
    playerScore.text = parseInt(playerScore.text + 1);
    reset();
    SoundJS.play("playerScore");
  }

  /* Cpu collision */

  if (
    ball.x + 30 > cpu.x &&
    ball.x + 30 < cpu.x + 22 &&
    ball.y >= cpu.y &&
    ball.y < cpu.y + 75
  ) {
    xSpeed *= -1;
    SoundJS.play("hit");
  }

  /* Player collision */

  if (
    ball.x <= player.x + 22 &&
    ball.x > player.x &&
    ball.y >= player.y &&
    ball.y < player.y + 75
  ) {
    xSpeed *= -1;
    SoundJS.play("hit");
  }

  /* Stop Paddle from going out of canvas */

  if (player.y >= 249) {
    player.y = 249;
  }

  /* Check for Win */

  if (playerScore.text == "10") {
    alert("win");
  }

  /* Check for Game Over */

  if (cpuScore.text == "10") {
    alert("lose");
  }
}
function timedCount() {
  
  if ( parseInt(time.text) > 0  ) {
    time.text = parseInt(time.text - 1);
  }
  else if(parseInt(time.text) > 0 && (parseInt(playerScore.text == "1" || cpuScore.text == "1" )){
    alert("lose");

  }
 else if (parseInt(time.text) = 0){ 
 
 clearTimeout(timeout);
 alert('timeup');

 parseInt(time.text)=60; 		//to avoid loop of timeout
 
 reset();
 timer_on = 0;


}

 timeout = setTimeout(timedCount, 1000);
}


function alert(e) {
  Ticker.removeListener(tkr);
  stage.onMouseMove = null;
  bg.onPress = null;

  if (e == "win") {
    win.x = 140;
    win.y = -90;

    stage.addChild(win);
    Tween.get(win).to({ y: 115 }, 300);
  } 
  else if(e == 'timeup')
	{
		timeup.x = 140;
		timeup.y = -90;
	
		stage.addChild(timeup);
		Tween.get(timeup).to({y: 115}, 300);
		
		
	}
  else if(e == 'lose')
  {
    lose.x = 140;
    lose.y = -90;

    stage.addChild(lose);
    Tween.get(lose).to({ y: 115 }, 300);
  }
}
