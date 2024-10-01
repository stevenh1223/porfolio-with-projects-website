const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() method returns drawing context of canvas
// drawing context enables to draw in canvas
const unit = 20;
const row = canvas.height / unit; //320 / 20 = 16
const column = canvas.width / unit; //320 / 20 = 16

//initial snake
let snake = []; // array of snake body (x, y)s
snake[0] = {
  x: 80,
  y: 0,
};
snake[1] = {
  x: 60,
  y: 0,
};
snake[2] = {
  x: 40,
  y: 0,
};
snake[3] = {
  x: 20,
  y: 0,
};

//random fruit constructor
class Fruit {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  //new random spot and not overlapping snake body
  pickALocation() {
    let overlapping;
    let new_x;
    let new_y;

    // the do-while loop ensures that the statement(s) are executed
    // at least once before evaluating the condition
    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      overlapping = false;
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          overlapping = true;
          break;
        }
      }
    } while (overlapping);

    this.x = new_x;
    this.y = new_y;
  }
}

//contruct random fruit object
let myFruit = new Fruit();
myFruit.pickALocation();

//control snake direction with arrow keys
addEventListener("keydown", changeDirection);
let d = "Right";
function changeDirection(e) {
  if (e.key == "ArrowRight" && d != "Left") {
    //&& d != "Left": snake cannot turn 180
    d = "Right";
  } else if (e.key == "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key == "ArrowUp" && d != "Down") {
    d = "Up";
  } else if (e.key == "ArrowDown" && d != "Up") {
    d = "Down";
  }
  //second change of direction not allowed before next interval
  //(for preventing the snake to turn 180)
  removeEventListener("keydown", changeDirection);
}

//highest score
let highestScore;
loadHighestScore();
document.getElementById("myScore2").innerText =
  "My Highest Score: " + highestScore;

//current score
let score = 0;
document.getElementById("myScore").innerText = "My Score: " + score;

function draw() {
  //check if snake head touches itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(myGame);
      alert("Game Over");
      return; //stop draw function
    }
  }

  //cover drawing context in black to clear previous snake
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //draw fruit
  myFruit.drawFruit();

  //draw snake
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    //x, y, width, length
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    //border style
    ctx.strokeStyle = "white";
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  //next position of snake head regarding current direction
  let snakeX = snake[0].x;
  //snake[0] is an object, but snake[0].x is a primitive value (not reference)
  let snakeY = snake[0].y;
  if (d == "Right") {
    snakeX += unit;
  } else if (d == "Left") {
    snakeX -= unit;
    // y axis is downward
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Down") {
    snakeY += unit;
  }

  //pass wall
  if (snakeX >= canvas.width) {
    snakeX = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width - unit;
  }
  if (snakeY >= canvas.width) {
    snakeY = 0;
  }
  if (snakeY < 0) {
    snakeY = canvas.width - unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //check if old snake head touches fruit
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    myFruit.pickALocation();
    score++;
    setHighestScore();
    document.getElementById("myScore").innerText = "My Score: " + score;
    document.getElementById("myScore2").innerText =
      "My Highest Score: " + highestScore;
  } else {
    snake.pop();
  }

  snake.unshift(newHead);

  addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100);

function loadHighestScore() {
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore"));
  }
}

function setHighestScore() {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
