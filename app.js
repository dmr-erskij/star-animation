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
let resp = 1

const dim = {
  moonRadius: 60,
  earhWidth: 70,
  lineWidthWindow: 80,
  lineWidthMiddle: 50,
  window: {
    moveX: 200,
    moveY: 100,
    lineX: 560,
    lineY: 100
  },
  middleWindow: {
    moveX: 375,
    moveY: 150,
    lineX: 375,
    lineY: 50
  },
  house: {
    moveX: 200,
    moveY: 150,
    width: 350,
    height: 100
  },
  roof: {
    moveX: 140,
    moveY: 170,
    lineX1: 375,
    lineY1: 280,
    lineX2: 610,
    lineY2: 170,
  }

}

window.addEventListener("mousemove", (e) => {
  particles.push(new Particle(e.offsetX, e.offsetY, 1, 0.20));
  if (drawing) {
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle(e.offsetX, e.offsetY, 10, 0.01));
    }
  }
  if (
    e.offsetX > (canvas.width - (canvas.width * 0.2)) - (dim.moonRadius / 1.5) &&
    e.offsetX < (canvas.width - (canvas.width * 0.2)) + (dim.moonRadius / 1.5) &&
    e.offsetY < (canvas.height * 0.2) + (dim.moonRadius / 1.5) &&
    e.offsetY > (canvas.height * 0.2) - (dim.moonRadius / 1.5)
  ) {
    changeMoonColor = true;
  } else {
    changeMoonColor = false;
  }
});

window.addEventListener("mousedown", () => {
  drawing = true;
});
window.addEventListener("mouseup", () => {
  drawing = false;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.innerWidth < 992 
                          ? (dim.moonRadius = 45,
                            resp = 0.6) 
                          : (dim.moonRadius = 60,
                            resp = 1)

})

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
  ctx.fillRect(0, canvas.height - dim.earhWidth, canvas.width, canvas.height)
  ctx.fill()
  ctx.closePath()
}

function createHouse() {
  ctx.strokeStyle = "rgb(100, 91, 3)";
  ctx.lineWidth = dim.lineWidthWindow * resp;
  ctx.beginPath();
  ctx.moveTo(canvas.width - (canvas.width - dim.window.moveX * resp), canvas.height - dim.window.moveY * resp);
  ctx.lineTo(canvas.width - (canvas.width - dim.window.lineX * resp), canvas.height - dim.window.lineY * resp);
  ctx.stroke();
  ctx.closePath();
  ctx.strokeStyle = "#111";
  ctx.lineWidth = dim.lineWidthMiddle * resp;
  ctx.beginPath();
  ctx.moveTo(canvas.width - (canvas.width - dim.middleWindow.moveX * resp), canvas.height - dim.middleWindow.moveY * resp);
  ctx.lineTo(canvas.width - (canvas.width - dim.middleWindow.lineX * resp), canvas.height - dim.middleWindow.lineY * resp);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeRect(canvas.width - (canvas.width - dim.house.moveX * resp), canvas.height - dim.house.moveY * resp, dim.house.width * resp, dim.house.height * resp);
  ctx.stroke();
  ctx.closePath();

}

function createRoof() {
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.moveTo(canvas.width - (canvas.width - dim.roof.moveX * resp), canvas.height - dim.roof.moveY * resp);
  ctx.lineTo(canvas.width - (canvas.width - dim.roof.lineX1 * resp), canvas.height - dim.roof.lineY1 * resp);
  ctx.lineTo(canvas.width - (canvas.width - dim.roof.lineX2 * resp), canvas.height - dim.roof.lineY2 * resp);
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
  ctx.arc(canvas.width - canvas.width * 0.2, canvas.height * 0.2, dim.moonRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  createStaticBackground();
  changeMoonColor === true ? handleFaulingStar() : null;
  requestAnimationFrame(animate);
}

animate();
