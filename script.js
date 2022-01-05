const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 300;
const ROWS = 30;
const COLS = 50;
const BOX_SIZE = 10;
const FILL = BOX_SIZE * .9

function clearTail(tail) {
    ctx.clearRect(tail[0]*BOX_SIZE, tail[1]*BOX_SIZE,BOX_SIZE,BOX_SIZE);
    ctx.strokeRect(tail[0] * BOX_SIZE, tail[1] * BOX_SIZE, BOX_SIZE, BOX_SIZE);
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
  current: null,
  draw: function() {
    for (let [x, y] of this.current) {
      ctx.fillRect(x*BOX_SIZE,y*BOX_SIZE,FILL, FILL);
    }
  },
  direction: MOVES.RIGHT,
  addDirection: function (dir) {
    if ((this.direction === MOVES.RIGHT && dir === MOVES.LEFT) || (this.direction === MOVES.LEFT && dir === MOVES.RIGHT)) {
      return
    } else if ((this.direction === MOVES.UP && dir === MOVES.DOWN) || (this.direction === MOVES.UP && dir === MOVES.DOWN)){
      return
    }
    this.direction = dir
  },

  move: function() {
    let tail = Snake.current.shift();
    let head = Snake.current[Snake.current.length - 1];
    clearTail(tail);
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
    Snake.current.push(newHead);
  }
}
ctx.canvas.width = CANVAS_WIDTH;
ctx.canvas.height = CANVAS_HEIGHT;

function initalizeGrid() {
  ctx.strokeStyle = "gray"
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      ctx.strokeRect(j * BOX_SIZE, i * BOX_SIZE, BOX_SIZE, BOX_SIZE);

    }
  }
  Snake.current = Snake.init_snake;
  Snake.draw();

}

function handleInput(event) {
  switch (event.key) {
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

function step() {
  Snake.move();
  Snake.draw();
  setTimeout(() => {
  requestAnimationFrame(step);
  }, 1000/10);
}


document.addEventListener('keydown', handleInput);
initalizeGrid();
step();
