// Initial vectors/angle
let vector1;
let vector2;
let angle1;

// Vertical vectors
let vector3;
let vector4;
// Horizontal vectors
let vector5;
let vector6;
// Horizontal angles
let angle2;
let angle3;
// Right angles
let rightAngle1;
let rightAngle2;

// Final vector
let vectorFinal;

// Proving 54
// Vertical angles
let vector7;
let vector8;
let angle4;

let cooldown = 0;
let cooldownMax = 90;

let rightAngleSize = 40;

let angle4Spawned = false;
let passedVector2Formula = false;
let longFormula = true;

let formula = "";

let origin;
let playing = true;

let pauseButton;

function setup() {
    pauseButton = document.getElementById('pauseButton');
    createCanvas(1500, 900);
    origin = createVector(width / 2, height - height / 5);
    vector1 = new Vector(origin, 1700, createVector(0, -1).rotate(radians(36)), 30, true);
    vector2 = new Vector(origin, 1200, createVector(0, -1).rotate(radians(-36)), 30, true);
    angle1 = new Angle(origin, 100, -HALF_PI - radians(36), -HALF_PI + radians(36), createVector(7, -73), 1);
}

function fastForward() {
    cooldown = 1000;
}

function pause() {
    if (playing) {
        playing = false;
        pauseButton.innerHTML = "►";
    } else {
        playing = true;
        pauseButton.innerHTML = "❚ ❚";
    }
}

function show() {
    background(255);
    // Show formula in top left
    if (formula != "") {
        push();
        textSize(70);
        fill(0);
        textAlign(LEFT, CENTER);
        text(formula, 20, 50);
        pop();
    }
}

function draw() {
    show();
    if (playing) cooldown++;

    let vector2title = false;
    if (vector2.title == "(-705, 971)" && !passedVector2Formula) {
        vector2title = true;

        if (cooldown >= cooldownMax * 2) {
            passedVector2Formula = true;
            formula = "Add vectors together: \n" + "X Force: -705 + 999 = 294 \n" + "Y Force: 971 + 1375 = 2346";
            cooldown = 0;
        }
    }
    if (vector1.title == "(999, 1375)" && vector2.title != "(-705, 971)") {
        if (vector2.title != "(-705, 971") {
            if (cooldown >= cooldownMax * 2) {
                vector2.title = "(-705, 971)";
                cooldown = 0;
            }
        }
    }
    if (formula != "" && !vector2title) {
        if (cooldown >= cooldownMax * 3.2) {
            if (formula == "y = 1700(sin(54°))") {
                formula = "y = 1375";
                vector3.textOffset = createVector(0, 0);
                vector3.textAlpha = 0;
                vector3.t = "1375";
            } else if (formula == "y = 1375") {
                formula = "x = 1375/tan(54°)";
                vector5.textAlpha = 0;
                vector5.t = "x";
                vector5.showText = true;
            } else if (formula == "x = 1375/tan(54°)") {
                formula = "x = 999";
                vector5.textAlpha = 0;
                vector5.t = "999";
                vector5.textRotateOffset = PI;
                vector5.textOffset = createVector(0, 40);
            } else if (formula == "x = 999") {
                vector4.textAlpha = 0;
                vector4.t = "y";
                vector4.showText = true;
                formula = "y = 1200(sin(54°))";
            } else if (formula == "y = 1200(sin(54°))") {
                formula = "y = 971";
                vector4.textAlpha = 0;
                vector4.t = "971";
            } else if (formula == "y = 971") {
                vector6.textAlpha = 0;
                vector6.t = "x";
                vector6.textOffset = createVector(0, 40);
                vector6.showText = true;
                formula = "x = 971/tan(54°)";
            } else if (formula == "x = 971/tan(54°)") {
                formula = "x = 705";
                vector6.textAlpha = 0;
                vector6.t = "705";
                vector6.textOffset = createVector(0, 40);
            } else if (formula == "x = 705") {
                vector1.title = "(999, 1375)";
                formula = "";
            } else if (formula.includes("Add vectors together:")) {
                formula = "Force man is feeling: (294, 2346)";
                vectorFinal = new Vector(origin, 2364, createVector(294, -2346).normalize(), 32, true);
                vectorFinal.final = true;
                longFormula = false;
            } else if (formula == "Force man is feeling: (294, 2346)") {
                formula = "Magnitude formula: √x²+y²";
            } else if (formula == "Magnitude formula: √x²+y²") {
                formula = "√294²+2346²";
            } else if (formula == "√294²+2346²") {
                formula = "Man is feeling 2364 Newtons of force";
                show();
                noLoop();
            }
            cooldown = 0;
        }
    }

    if (vectorFinal != null) vectorFinal.show();
    vector1.show();
    vector2.show();
    angle1.show();
    // Spawn vertical vectors
    if (vector1.mag >= vector1.targetMag && vector3 == null) {
        if (cooldown >= cooldownMax) {
            vector3 = new Vector(p5.Vector.add(vector1.origin.copy(), vector1.dir.copy().normalize().setMag(vector1.mag)), 1376, createVector(0, 1), 30, false);
            vector4 = new Vector(p5.Vector.add(vector2.origin.copy(), vector2.dir.copy().normalize().setMag(vector2.mag)), 971, createVector(0, 1), 30, false);
            cooldown = 0;
        }
    }
    if (vector3 != null) {
        vector3.show();
        vector4.show();
    }
    // Spawn horizontal vectors
    if (vector3 != null) {
        if (vector3.mag >= vector3.targetMag && vector5 == null) {
            if (cooldown >= cooldownMax) {
                vector3.showArrowHead = false;
                vector4.showArrowHead = false;
                vector5 = new Vector(p5.Vector.add(vector3.origin.copy(), vector3.dir.copy().normalize().setMag(vector3.mag)), 999, createVector(-1, 0), 30, false);
                vector6 = new Vector(p5.Vector.add(vector4.origin.copy(), vector4.dir.copy().normalize().setMag(vector4.mag)), 705, createVector(1, 0), 30, false);
                cooldown = 0;
            }
        }
    }
    if (vector5 != null) {
        vector5.show();
        vector6.show();
    }
    // Spawn right angles
    if (vector5 != null) {
        if (vector5.mag >= vector5.targetMag && rightAngle1 == null) {
            if (cooldown >= cooldownMax) {
                vector5.showArrowHead = false;
                vector6.showArrowHead = false;
                rightAngle1 = new RightAngle(vector5.origin.copy().sub(rightAngleSize / 2, rightAngleSize / 2), rightAngleSize);
                rightAngle2 = new RightAngle(vector6.origin.copy().sub(-rightAngleSize / 2, rightAngleSize / 2), rightAngleSize);
                cooldown = 0;
            }
        }
    }
    if (rightAngle1 != null) {
        rightAngle1.show();
        rightAngle2.show();
    }
    // Spawn vertical angles
    if (rightAngle1 != null) {
        if (angle4 == null && !angle4Spawned) {
            if (cooldown >= cooldownMax) {
                vector7 = new Vector(origin, 600, vector1.dir.copy().mult(-1), 30, false);
                vector8 = new Vector(origin, 600, vector2.dir.copy().mult(-1), 30, false);
                angle4 = new Angle(origin, 100, -radians(36) + HALF_PI, radians(36) + HALF_PI, createVector(7, 88), 1);
                angle4Spawned = true;
                cooldown = 0;
            }
        }
    }
    if (vector7 != null) {
        vector7.show();
        vector8.show();
        angle4.show();
    }
    // Spawn 108° angles
    if (vector7 != null) {
        if (vector7.mag >= vector7.targetMag && angle2 == null) {
            if (cooldown >= cooldownMax) {
                angle2 = new Angle(origin, 130, -radians(54), radians(54), createVector(70, -4), 2);
                angle2.angleText = "108°";
                angle3 = new Angle(origin, 130, PI - radians(54), PI + radians(54), createVector(-70, -4), 2);
                angle3.angleText = "108°";
                cooldown = 0;
            }
        }
    }
    if (angle2 != null) {
        angle2.show();
        angle3.show();
    }
    // Spawn 54° angles
    if (angle2 != null) {
        if (angle2.angleText == "108°") {
            if (cooldown >= cooldownMax * 3) {
                angle2 = new Angle(origin, 90, -PI / 3.5, -PI / 3.38 + radians(54), createVector(50, -10), 2);
                angle2.angleText = "54°";
                angle3 = new Angle(origin, 90, PI / -3.5 - (HALF_PI * 1.438), PI / -3.38 + radians(54) - (HALF_PI * 1.438), createVector(-50, -10), 2);
                angle3.angleText = "54°";
                cooldown = 0;
            }
        }
    }
    // Remove vertical angle markings and start formulas
    if (angle2 != null) {
        if (angle2.angleText == "54°" && vector7 != null) {
            if (cooldown >= cooldownMax * 2) {
                vector7 = null;
                vector8 = null;
                angle4 = null;
                vector3.t = "y";
                vector3.textOffset = createVector(5, 0);
                vector3.showText = true;
                formula = "y = 1700(sin(54°))";
                cooldown = 0;
            }
        }
    }
}
