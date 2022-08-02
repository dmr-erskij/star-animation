/** @type {HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const colorInput = document.getElementById("color");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let drawing = false;
ctx.lineWidth = 2
const particles = []


window.addEventListener('mousemove', e => {
  particles.push(new Particle(e.offsetX, e.offsetY, 1, 0.15))
  if(drawing) {
    for(let i = 0; i < 5; i++) {
      particles.push(new Particle(e.offsetX, e.offsetY, 10, 0.05))
    }
  }
})
window.addEventListener('mousedown', () => {
  drawing = true
})
window.addEventListener('mouseup', () => {
  drawing = false
})

class Particle {
  constructor(x, y, size, degree) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.size = Math.random() * size + 4;
    this.color = Math.random() * 30 + 200
    this.sizeDegree = degree
  }
  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.size -= this.sizeDegree
    if(this.size < 3) this.color = Math.random() * 30 + 180
  }
  draw() {
    ctx.strokeStyle = `hsl(${this.color}, 100%, 50%)`
    ctx.beginPath()
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.moveTo(0, 0 - this.size)
    for(let i = 0; i < 5; i++) {
      ctx.rotate(Math.PI / 5)
      ctx.lineTo(0, 0 - this.size * 0.5)
      ctx.rotate(Math.PI / 5)
      ctx.lineTo(0, 0 - this.size)
    }
    ctx.restore()
    ctx.closePath()
    ctx.stroke()
  }
}

function handleParticles() {
  for(let i = 0; i < particles.length; i++) {
    particles[i].update()
    particles[i].draw()
    if(particles[i].size < 1) {
      particles.splice(i, 1)
      i--
    }
  }
}

function animate() {
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.06)'
  // ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  handleParticles()
  requestAnimationFrame(animate)
}

animate()