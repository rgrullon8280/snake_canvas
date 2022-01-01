const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 300;
const ROWS = 30;
const COLS = 50;
const BOX_SIZE = 10;
const FILL = BOX_SIZE * .9
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
  move: function() {

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

function move(event) {
  console.log(event)
  switch (event.key) {
    case "w":
    case "W":
    case "ArrowUp":
      Snake.direction = MOVES.UP;
      break;
    case "d":
    case "D":
    case "ArrowRight":
      Snake.direction = MOVES.LEFT;
      break;
    case "s":
    case "S":
    case "ArrowDown":
      Snake.direction = MOVES.DOWN;
      break;
    case "A":
    case "a":
    case "ArrowLeft":
      Snake.direction = MOVES.RIGHT;
      break;
  }

}
function step() {
  let tail = Snake.current.shift();
  let head = Snake.current[Snake.current.length - 1];

  ctx.clearRect(tail[0]*BOX_SIZE, tail[1]*BOX_SIZE,BOX_SIZE,BOX_SIZE);

  ctx.strokeRect(tail[0] * BOX_SIZE, tail[1] * BOX_SIZE, BOX_SIZE, BOX_SIZE);
  
  Snake.current.push(
    [head[0]+1,head[1]]
  );
  Snake.draw();
  setTimeout(() => {

  requestAnimationFrame(step);
  }, 1000/10);
}



document.addEventListener('keydown', move);
initalizeGrid();
//step();

