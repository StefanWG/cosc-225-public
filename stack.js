function Stack() {
    this.stack = [];

    this.push = function(elem) {
        this.stack.push(elem);
    }

    this.pop = function(elem) {
        const toRet = this.stack[this.stack.length - 1];
        delete this.stack[this.stack.length - 1];
        return toRet;
    }

    this.peek = function() {
        return this.stack[this.stack.length - 1];
    }

    this.top = function() {
        return this.stack[0];
    }

    this.isEmpty = function() {
        return this.stack.length == 0;
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function isRightTurn(a, b, c) {
    //if both vertical, then right turn
    //
    //check for vertical line
    if (a.y == c.y) {

    } else if (a.y == b.y) {

    } else if (b.y == c.y) {
    }
    const slopeAB = (b.y - a.y) / (b.x - a.x);
    const slopeBC = (c.y - b.y) / (c.x - b.x);

    if (a.x > b.x) { //left to right
        return slopeAB < slopeBC;
    } else if (a.x == b.x){ //right to left
        return slopeAB > slopeBC;
    } else {
        return true;
    }
}

function isRightTurn2(a,b,c) {
    const cPrime = new Point(c.x - a.x, c.y - a.x);
    const rise = Math.abs(a.y - b.y);
    const run = Math.abs(a.x - b.x);
    const angle = Math.atan(rise/run);

    //Rotate
    const newy = y * Math.cos(angle) + x * Math.sin(angle);
    return newy < 0;
}