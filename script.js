const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 300;
const ROWS = 30;
const COLS = 50;
const BOX_SIZE = 10;
const FILL = BOX_SIZE * .8;
const LINE_WIDTH = 1;
let GAME_ACTIVE;
let requestId;

function initializeGrid() {
  canvas.style.borderColor = "black";
  ctx.strokeStyle = "gray"
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      ctx.strokeRect(j * BOX_SIZE, i * BOX_SIZE, BOX_SIZE, BOX_SIZE);
    }
  }
}

function initializeSnake() {
  Snake.body = [...Snake.init_snake];
  Snake.direction = MOVES.RIGHT;
  Snake.draw();
}

function startGame() {
  initializeGrid();
  initializeSnake();
  GAME_ACTIVE = true;
  console.log(GAME_ACTIVE);
  step();
}

function endGame() {
  cancelAnimationFrame(requestId);
  GAME_ACTIVE = false;
  canvas.style.borderColor = "red";
}

function restartGame() {
  endGame();
  ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
  startGame();
}

function clearTail([col, row]) {
  let top = row * BOX_SIZE;
  let left = col * BOX_SIZE;
  ctx.clearRect(left+LINE_WIDTH, top+LINE_WIDTH, FILL, FILL);
}

let MOVES = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
}

let Snake = {
  init_snake: [
    [0,0],
    [1,0],
    [2,0],
    [3,0],
    [4,0]
  ],
  body: null,
  draw: function() {
    for (let [x, y] of this.body) {
      ctx.fillRect((x*BOX_SIZE)+LINE_WIDTH,(y*BOX_SIZE)+LINE_WIDTH,FILL, FILL);
    }
  },
  direction: MOVES.RIGHT,
  addDirection: function (dir) {
    if ((this.direction === MOVES.RIGHT && dir === MOVES.LEFT) || (this.direction === MOVES.LEFT && dir === MOVES.RIGHT)) {
      return
    } else if ((this.direction === MOVES.UP && dir === MOVES.DOWN) || (this.direction === MOVES.DOWN && dir === MOVES.UP)){
      return
    }
    this.direction = dir
  },

  move: function() {
    let tail = Snake.body.shift();
    let head = Snake.body[Snake.body.length - 1];
    let newHead;
    if (this.direction === MOVES.RIGHT) {
      newHead = [head[0]+1,head[1]]
    } else if (this.direction === MOVES.LEFT) {
      newHead = [head[0]-1,head[1]]
    } else if (this.direction === MOVES.UP) {
      newHead = [head[0],head[1]-1]
    } else if (this.direction === MOVES.DOWN) {
      newHead = [head[0],head[1]+1]
    } 
    if(hasCollided(newHead)){
      endGame();
      return
    }
    clearTail(tail);
    Snake.body.push(newHead);
  }
}
ctx.canvas.width = CANVAS_WIDTH;
ctx.canvas.height = CANVAS_HEIGHT;


function handleInput(event) {
  switch (event.key) {
    case "r":
    case "R":
      restartGame();
      break;
    case "w":
    case "W":
    case "ArrowUp":
      Snake.addDirection(MOVES.UP);
      break;
    case "d":
    case "D":
    case "ArrowRight":
      Snake.addDirection(MOVES.RIGHT);
      break;
    case "s":
    case "S":
    case "ArrowDown":
      Snake.addDirection(MOVES.DOWN);
      break;
    case "A":
    case "a":
    case "ArrowLeft":
      Snake.addDirection(MOVES.LEFT);
      break;
  }
}

function hasCollided([col, row]) {
  let top = row * BOX_SIZE;
  let left = col * BOX_SIZE;
  let ans = false;
  if ((top >= CANVAS_HEIGHT) || (top < 0) || (left >= CANVAS_WIDTH) || (left < 0)) {
    ans = true;
  }
  return ans
} 

function step() {
  console.log(GAME_ACTIVE,"at step");
  Snake.move();
  if (GAME_ACTIVE) {
    setTimeout(() => {
    requestId = requestAnimationFrame(step);
    }, 1000/10);
  }
  Snake.draw();
}

document.addEventListener('keydown', handleInput);
startGame();
