/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const colorInput = document.getElementById("color");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let drawing = false;
let changeMoonColor = false;
const particles = [];
let faulingStarArray = [];

window.addEventListener("mousemove", (e) => {
  particles.push(new Particle(e.offsetX, e.offsetY, 1, 0.20));
  if (drawing) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(e.offsetX, e.offsetY, 10, 0.01));
    }
  }
  if (
    e.offsetX > canvas.width - 250 &&
    e.offsetX < canvas.width - 150 &&
    e.offsetY < 350 &&
    e.offsetY > 250
  ) {
    changeMoonColor = true;
  } else {
    changeMoonColor = false;
  }
});

window.addEventListener("mouseover", (e) => {});

window.addEventListener("mousedown", () => {
  drawing = true;
});
window.addEventListener("mouseup", () => {
  drawing = false;
});

const faulingStar = {
  x: Math.random() * canvas.width,
  y: Math.random() * (canvas.height / 2),
  speedX: Math.random() * 2 - 1.5,
  speedY: Math.random() * 1 + 0.5,
  radius: Math.random() * 1.5 + 1,
  acceleration: Math.random() * 1 + 0.5,
  draw: function () {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  },
  update: function () {
    this.radius -= 0.01;
    this.x += this.speedX * this.acceleration;
    this.y += this.speedY * this.acceleration;
    if(this.radius < 0.05) this.radius = 0.05
  },
};

class Particle {
  constructor(x, y, size, degree) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.size = Math.random() * size + 4;
    this.color = Math.random() * 30 + 200;
    this.sizeDegree = degree;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size -= this.sizeDegree;
    if (this.size < 3) this.color = Math.random() * 30 + 180;
  }
  draw() {
    ctx.strokeStyle = `hsl(${this.color}, 100%, 50%)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.moveTo(0, 0 - this.size);
    for (let i = 0; i < 5; i++) {
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - this.size * 0.5);
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - this.size);
    }
    ctx.restore();
    ctx.closePath();
    ctx.stroke();
  }
}

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].size < 1) {
      particles.splice(i, 1);
      i--;
    }
  }
}

function handleFaulingStar() {
  for(let i = 0; i < 5; i++) {
    faulingStarArray[i] = faulingStar
  }
  for(let i = 0; i < faulingStarArray.length; i++) {
    faulingStarArray[i].update();
    faulingStarArray[i].draw();
    if (faulingStarArray[i].radius < 0.2) {
      faulingStarArray = []
      faulingStar.radius = Math.random() * 1.5 + 1
      faulingStar.speedX = Math.random() * 2 - 1.5
      faulingStar.speedY = Math.random() * 1 + 0.5,
    
      faulingStar.x = Math.random() * canvas.width
      faulingStar.y = Math.random() * (canvas.height / 2)
    }
  }
}

function createStaticBackground() {
  ctx.shadowBlur = 0;
  createEarth()
  createHouse();
  createRoof();
  createMoon();
}

function createEarth() {
  ctx.fillStyle = 'rgb(0, 32, 8)'
  ctx.beginPath()
  ctx.fillRect(0, 880, canvas.width, canvas.height)
  ctx.fill()
  ctx.closePath()
}

function createHouse() {
  ctx.strokeStyle = "rgb(100, 91, 3)";
  ctx.lineWidth = 80;
  ctx.beginPath();
  ctx.moveTo(200, 860);
  ctx.lineTo(560, 860);
  ctx.stroke();
  ctx.closePath();
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(375, 796);
  ctx.lineTo(375, 900);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeRect(200, 796, 350, 100);
  ctx.stroke();
  ctx.closePath();

}

function createRoof() {
  ctx.fillStyle = "#111";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(140, 786);
  ctx.lineTo(375, 680);
  ctx.lineTo(610, 786);
  ctx.fill();
  ctx.closePath();
}

function createMoon() {
  changeMoonColor === true
    ? ((ctx.fillStyle = "#ccc"),
      (ctx.shadowColor = "#fff"),
      (ctx.shadowBlur = 10))
    : (ctx.fillStyle = "#888");
  ctx.beginPath();
  ctx.arc(canvas.width - 200, 300, 60, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function animate() {
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.06)'
  // ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  createStaticBackground();
  changeMoonColor === true ? handleFaulingStar() : null;
  requestAnimationFrame(animate);
}

animate();
