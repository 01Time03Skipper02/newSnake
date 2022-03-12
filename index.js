// Import stylesheets
import './style.css';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src =
  'https://raw.githubusercontent.com/San4ezzZ03/newSnake/master/ground.png';

const foodImg = new Image();
foodImg.src =
  'https://raw.githubusercontent.com/San4ezzZ03/newSnake/master/food.png';

let box = 32;

let score = 0;

let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
};

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
  if (event.keyCode == 37 && dir != 'right') dir = 'left';
  else if (event.keyCode == 38 && dir != 'down') dir = 'up';
  else if (event.keyCode == 39 && dir != 'left') dir = 'right';
  else if (event.keyCode == 40 && dir != 'up') dir = 'down';
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game);
  }
}
function spawnFood(length, snakeX, snakeY) {
  food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
  };
  for (let i = 0; i < length; i++) {
    if (
      (snakeX == food.x && snakeY == food.y) ||
      (snake[i].x == food.x && snake[i].y == food.y)
    ) {
      spawnFood(length, snakeX, snakeY);
    }
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? 'green' : 'red';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    spawnFood(snake.length, snakeX, snakeY);
  } else snake.pop();

  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  )
    clearInterval(game);

  if (dir == 'left') snakeX -= box;
  if (dir == 'right') snakeX += box;
  if (dir == 'up') snakeY -= box;
  if (dir == 'down') snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
