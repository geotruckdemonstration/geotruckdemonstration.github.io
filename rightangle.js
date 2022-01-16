class RightAngle {
    constructor(pos, size) {
        this.pos = pos;
        this.size = size;
        this.alpha = 0;
    }
  
    show() {
        if (this.alpha < 255) this.alpha += 5;
        rectMode(CENTER);
        stroke(0, this.alpha);
        noFill();
        rect(this.pos.x, this.pos.y, this.size, this.size);
    }
}