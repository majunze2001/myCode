const smartLines = [];
const nums = 100

function setup() {
    const cnv = createCanvas(1000, 1000);
    cnv.id('p5canvas');

    cnv.style('width', '');
    cnv.style('height', '');

    angleMode(DEGREES);
    noiseDetail(24);

    for (let i = 0; i < nums; i++) {
        smartLines.push(new smartLine(100, 1));
    }
}

function draw() {

    fill(255);
    noStroke();
    rect(0, 0, width, height);

    for (let l of smartLines) {
        l.move();
        l.display();
        l.vanish(smartLines);
    }

}

class smartLine {
    constructor(d, s) {
        this.x1 = random(0, width);
        this.y1 = random(0, height);
        this.c = color([random(255), random(255), random(255)]);
        this.s = s;
        this.l = random(d / 2, d * 1.5);
        this.noiseLocationX = random(100 * d / 2);
        this.noiseLocationY = random(100 * d);
        this.noiseLocationA = random(100 * d * 1.5);
        this.speedX = map(noise(this.noiseLocationX), 0, 1, this.s * -1, this.s);
        this.speedY = map(noise(this.noiseLocationY), 0, 1, this.s * -1, this.s);
        this.angle = random(-360, 360);

        this.x2 = this.x1 + cos(this.angle) * this.l
        this.y2 = this.y1 + cos(this.angle) * this.l
    }

    move() {
        this.x1 += this.speedX;
        this.y1 += this.speedY;


        this.x2 = this.x1 + cos(this.angle) * this.l
        this.y2 = this.y1 + sin(this.angle) * this.l

        this.speedX = map(noise(this.noiseLocationX), 0, 1, this.s * -1, this.s);
        this.speedY = map(noise(this.noiseLocationY), 0, 1, this.s * -1, this.s);
        // this.angle = (this.angle + noise(this.noiseLocationA)) % 360;
        if (this.angle < 0) {
            this.angle = this.angle - noise(this.noiseLocationA);
        } else {
            this.angle = this.angle + noise(this.noiseLocationA);
        }

        this.noiseLocationX += 0.1;
        this.noiseLocationY += 0.1;
        this.noiseLocationA += 0.1;
    }

    display() {
        stroke(this.c);
        strokeWeight(2);

        line(this.x1, this.y1, this.x2, this.y2);
        fill(this.c)
        const d = Math.abs(this.speedX) + Math.abs(this.speedY);
        circle(this.x1, this.y1, d);
        circle(this.x2, this.y2, d);
    }

    vanish(lines) {
        if (this.x1 < 0 && this.x2 < 0 || this.y1 < 0 && this.y2 < 0 ||
            this.x1 > width && this.x2 > width || this.y1 > height && this.y2 > height) {
            const i = lines.indexOf(this);
            if (i >= 0) {
                lines.splice(i, 1);
            }
        }

    }
}


