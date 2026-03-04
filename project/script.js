const words = ["Fullstack Developer", "IT Specialist"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const textElement = document.querySelector(".type-text");
  if (!textElement) return;

  const currentWord = words[wordIndex];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  textElement.textContent = currentWord.substring(0, charIndex);

  let typeSpeed = isDeleting ? 100 : 200;

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    typeSpeed = 1000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }
  setTimeout(typeEffect, typeSpeed);
}

const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const taskList = document.getElementById("taskList");

if (addBtn && todoInput) {
  addBtn.onclick = function () {
    const val = todoInput.value;
    if (val.trim() !== "") {
      const li = document.createElement("li");
      li.innerHTML =
        "<span>" +
        val +
        "</span>" +
        "<button onclick='this.parentElement.remove()' style='background:#ef4444; color:white; border:none; padding:5px; border-radius:4px; cursor:pointer;'>Delete</button>";
      li.style.cssText =
        "display:flex; justify-content:space-between; align-items:center; background:#334155; padding:10px; margin-top:10px; border-radius:5px; color:white; list-style:none;";
      taskList.appendChild(li);
      todoInput.value = "";
    }
  };
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
  });
}

function appendToDisplay(input) {
  const display = document.getElementById("display");
  if (display) display.value += input;
}

function clearDisplay() {
  const display = document.getElementById("display");
  if (display) display.value = "";
}

function calculate() {
  const display = document.getElementById("display");
  if (display) {
    try {
      display.value = eval(display.value);
    } catch (e) {
      display.value = "Error";
    }
  }
}

function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  clock.textContent = h + ":" + m + ":" + s;
}
setInterval(updateClock, 1000);

const themeBtn = document.getElementById("theme-toggle");
if (themeBtn) {
  themeBtn.onclick = () => document.body.classList.toggle("light-mode");
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
  updateClock();
});

var el = document.getElementById("view");
el.ondblclick = Viewpro;
function Viewpro() {
  document.body.style.backgroundColor = "#fff";
}

var dagne = document.getElementById("view");
dagne.onclick = linkto;
function linkto() {
  window.location.href = "https://dagnachew.netlify.app/";
}

//snake game
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
// console.log(ctx);

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
snake[0] = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};

let food = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};

let d = "right";

document.onkeydown = direction;
function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}

let playGame = setInterval(draw, 100);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }
  //draw food
  ctx.fillStyle = "#ff0";
  ctx.strokeStyle = "red";
  ctx.fillRect(food.x, food.y, scale, scale);
  ctx.strokeRect(food.x, food.y, scale, scale);

  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  //  console.log(snakeX);
  if (d == "left") snakeX -= scale;
  if (d == "up") snakeY -= scale;
  if (d == "right") snakeX += scale;
  if (d == "down") snakeY += scale;

  if (snakeX > canvas.width) {
    snakeX = 0;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width;
  }
  if (snakeY < 0) {
    snakeY = canvas.height;
  }

  if (snakeX == food.x && snakeY == food.y) {
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (eatSelf(newHead, snake)) {
    clearInterval(playGame);
  }

  snake.unshift(newHead);
}
function eatSelf(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}
