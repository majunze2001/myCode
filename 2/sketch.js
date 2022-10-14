// an array to add multiple particles
const particles = [];
const nums = 1;
function setup() {
    createCanvas(720, 400);
    for (let i = 0; i < width / 10; i++) {
        // for (let i = 0; i < nums; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    // background('#0f0f0f');
    background(255);
    for (let i = 0; i < particles.length; i++) {
        particles[i].display();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
    }
}

// this class describes the properties of a single particle.
class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
    constructor() {
        this.x = random(0, width);
        this.y = random(0, height);
        this.r = random(1, 8);
        this.xSpeed = random(-1, 1);
        this.ySpeed = random(-0.5, 0.5);
        this.curSpeedX = this.xSpeed;
        this.curSpeedY = this.ySpeed;
        this.c = color('rgba(17,144,111,0.5)');
    }

    // creation of a particle.
    display() {
        noStroke();
        // fill('rgba(200,169,169,0.5)');
        fill(this.c);
        circle(this.x, this.y, this.r);
    }

    // setting the particle in motion.
    moveParticle() {
        if (this.x < 0 || this.x > width)
            this.xSpeed *= -1;
        if (this.y < 0 || this.y > height)
            this.ySpeed *= -1;

        const d = dist(this.x, this.y, mouseX, mouseY);
        if (d <= this.r * 5) {
            const v = Math.sqrt(Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2));
            let angle;
            if (mouseY > this.y) {
                angle = atan((mouseX - this.x) / (mouseY - this.y));
            } else {
                angle = atan((mouseX - this.x) / (mouseY - this.y)) + PI;
            }
            this.curSpeedX = v * sin(angle);
            this.curSpeedY = v * cos(angle);
            this.x += this.curSpeedX;
            this.y += this.curSpeedY;
        } else {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
        }
    }

    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
    joinParticles(particles) {
        for (let i = 0, n = particles.length; i < n; i++) {
            const d = dist(this.x, this.y, particles[i].x, particles[i].y);
            if (d < 85) {
                stroke('rgba(17,144,111,0.06)');
                line(this.x, this.y, particles[i].x, particles[i].y);
            }
        }
    }
}


