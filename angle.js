class Angle {
    constructor(o, s, a, e, d, numRings) {
        this.origin = o;
        this.size = s;
        this.startAngle = a;
        this.endAngle = e;
        this.textDirFromOrigin = d;
        this.numRings = numRings;
        let angle = abs(round(degrees(this.endAngle - this.startAngle)));
        this.angleText = str(angle) + "°";
        this.alpha = 0;
    }

    show() {
        if (this.alpha < 255) this.alpha += 5;
        stroke(0, this.alpha);
        noFill();
        for (let i = this.numRings; i >= 1; i--) {
            arc(this.origin.x, this.origin.y, this.size + (.2 * this.size * i), this.size + (.2 * this.size * i), this.startAngle, this.endAngle);
        }
        textSize(32);
        textAlign(CENTER);
        fill(0, this.alpha);
        text(this.angleText, this.origin.x + (this.textDirFromOrigin.x * this.numRings), this.origin.y + (this.textDirFromOrigin.y * this.numRings));
        noFill();
    }
}