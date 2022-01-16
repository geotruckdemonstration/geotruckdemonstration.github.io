class Vector {
    constructor(origin, targetMag, dir, maxTextSize, showText) {
        this.alpha = 0;
        this.value = 0;
        this.textAlpha = 0;
        this.showArrowHead = true;
        this.title = "";
        this.titleAlpha = 0;
        this.textOffset = createVector(0, 0);
        this.textRotateOffset = 0;

        this.origin = origin;
        this.mag = 0;
        this.targetMag = targetMag / 4;
        this.magIncrease = targetMag / 75;
        this.dir = dir;
        this.value = targetMag;
        this.maxTextSize = maxTextSize;
        this.showText = showText;
        if (showText) this.textAlpha = 255;
        this.t = str(int(this.value));
        this.final = false;
    }

    show() {
        // Alpha and mag increases
        this.alpha = map(this.mag, 0, this.targetMag, 0, 255);
        if (this.mag < this.targetMag) {
            this.mag += this.magIncrease;
            this.mag = min(this.mag, this.targetMag);
        }

        // Color
        stroke(0, this.alpha);
        if (this.final) stroke(67, 191, 17, this.alpha);
        strokeWeight(3);

        // End point
        let end = p5.Vector.add(this.origin.copy(), this.dir.copy().normalize().setMag(this.mag));

        // Line
        line(this.origin.x, this.origin.y, end.x, end.y);
        // Arrow at end
        if (this.showArrowHead) {
            let newDir = this.dir.copy().normalize();
            newDir.setMag(map(min(this.mag, this.targetMag), 0, this.targetMag, 0, 35));
            newDir.mult(-1).rotate(radians(36));
            line(end.x, end.y, end.x + newDir.copy().x, end.y + newDir.copy().y);
            newDir.rotate(-radians(36 * 2));
            line(end.x, end.y, end.x + newDir.x, end.y + newDir.y);
        }

        // Text
        if (this.showText) {
            push();
            let size = map(this.mag, 0, this.targetMag, 0, this.maxTextSize);
            translate((this.origin.x + end.x) / 2, (this.origin.y + end.y) / 2);

            if (this.dir.heading() > -HALF_PI) {
                rotate(this.dir.heading() + this.textRotateOffset);
            } else {
                rotate(PI + this.dir.heading() + this.textRotateOffset);
            }
            if (size > 1) {
                textSize(size);
                if (this.textAlpha == 255) {
                    fill(0, this.alpha);
                } else {
                    this.textAlpha += 5;
                    fill(0, this.textAlpha);
                }
                text(this.t, this.textOffset.x, -5 * (this.maxTextSize / 30) + this.textOffset.y);
            }
            pop();
        }
        // Title at arrow head
        if (this.title != "") {
            push();
            let size = map(this.mag, 0, this.targetMag, 0, this.maxTextSize);
            translate(end.x, end.y);
            if (size > 1) {
                textSize(size);
                this.titleAlpha += 5;
                this.titleAlpha = min(this.titleAlpha, 255);
                fill(0, this.titleAlpha);
                text(this.title, 0, -10);
            }
            pop();
        }
    }
}