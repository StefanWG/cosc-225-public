let NS = "http://www.w3.org/2000/svg";

function Line(x1, y1, x2, y2, color) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.moving = false;
    this.movingDiffX1 = null;
    this.movingDiffY1 = null;
    this.movingDiffX2 = null;
    this.movingDiffY2 = null;

    this.color = color;
    this.width = 8;
    this.elem = document.createElementNS(NS, "line");
    this.elem.setAttributeNS(null, "x1", x1);
    this.elem.setAttributeNS(null, "y1", y1);
    this.elem.setAttributeNS(null, "x2", x2);
    this.elem.setAttributeNS(null, "y2", y2);

    this.elem.setAttributeNS(null, "stroke", color);
    this.elem.setAttributeNS(null, "stroke-width", this.width);

    this.updateEndpoint = function(newX2, newY2) {
        this.elem.setAttributeNS(null, "x2", newX2);
        this.elem.setAttributeNS(null, "y2", newY2);
        this.x2 = newX2;
        this.y2 = newY2;
    }

    this.elem.addEventListener("click", (event)=> {
        if (currentAction == "move") {
            this.moving = !this.moving;
            if (this.moving) {
                moveElemToFront(this.elem);
                const rect = svg.getBoundingClientRect();
                const xPos = event.clientX - rect.left;
                const yPos = event.clientY - rect.top;
                this.movingDiffX1 = this.x1 - xPos;
                this.movingDiffY1 = this.y1 - yPos;
                this.movingDiffX2 = this.x2 - xPos;
                this.movingDiffY2 = this.y2 - yPos;
            }
        }
    });
    this.elem.addEventListener("mousemove", (event) => {
        if (currentAction == "move" && this.moving) {
            const rect = svg.getBoundingClientRect();
            const xPos = (event.clientX - rect.left);
            const yPos = (event.clientY - rect.top);
            this.elem.setAttributeNS(null, "x1", xPos + this.movingDiffX1);
            this.elem.setAttributeNS(null, "y1", yPos + this.movingDiffY1);
            this.elem.setAttributeNS(null, "x2", xPos + this.movingDiffX2);
            this.elem.setAttributeNS(null, "y2", yPos + this.movingDiffY2);
            this.x1 = xPos + this.movingDiffX1;
            this.y1 = yPos + this.movingDiffY1;
            this.x2 = xPos + this.movingDiffX2;
            this.y2 = yPos + this.movingDiffY2;
        }
    });
}

function Rect(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.startX = x;
    this.startY = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.movingDiffX = null;
    this.movingDiffY = null;
    this.moving = false;
    this.elem = document.createElementNS(NS, "rect");
    this.elem.setAttributeNS(null, "x", x);
    this.elem.setAttributeNS(null, "y", y);
    this.elem.setAttributeNS(null, "width", 0);
    this.elem.setAttributeNS(null, "height", 0);
    this.elem.setAttributeNS(null, "fill", color);

    this.updateRect = function(newX, newY) {
        if (newX >= this.startX) {
            this.elem.setAttribute("width", newX - this.startX);
        } else {
            this.elem.setAttribute("x", newX);
            this.x = newX
            this.elem.setAttribute("width", this.startX - newX);
        }
        if (newY >= this.startY) {
            this.elem.setAttribute("height", newY - this.startY);
        } else {
            this.elem.setAttribute("y", newY);
            this.y = y;
            this.elem.setAttribute("height", this.startY - newY);
        }
    }

    this.elem.addEventListener("click", (event)=> {
        if (currentAction == "move") {
            this.moving = !this.moving;
            if (this.moving) {
                moveElemToFront(this.elem);
                const rect = svg.getBoundingClientRect();
                const xPos = event.clientX - rect.left;
                const yPos = event.clientY - rect.top;
                this.movingDiffX = this.x - xPos;
                this.movingDiffY = this.y - yPos;
            }
        }
    });
    this.elem.addEventListener("mousemove", (event) => {
        if (currentAction == "move" && this.moving) {
            const rect = svg.getBoundingClientRect();
            const xPos = (event.clientX - rect.left);
            const yPos = (event.clientY - rect.top);
            this.elem.setAttributeNS(null, "x", xPos + this.movingDiffX);
            this.elem.setAttributeNS(null, "y", yPos + this.movingDiffY);
            this.x = xPos + this.movingDiffX;
            this.y = yPos + this.movingDiffY;
        }
    });
}

function Circle(cx, cy, r, color) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.color = color;
    this.moving = false;
    this.movingDiffX = null;
    this.movingDiffY = null;
    this.elem = document.createElementNS(NS, "circle");
    this.elem.setAttributeNS(null, "cx", cx);
    this.elem.setAttributeNS(null, "cy", cy);
    this.elem.setAttributeNS(null, "r", r);
    this.elem.setAttributeNS(null, "fill", color);
    this.elem.addEventListener("click", (event)=> {
        if (currentAction == "move") {
            this.moving = !this.moving;
            if (this.moving) {
                moveElemToFront(this.elem);
                const rect = svg.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                this.movingDiffX= this.cx - x;
                this.movingDiffY = this.cy - y;
            }
        }
    });
    this.elem.addEventListener("mousemove", (event) => {
        if (currentAction == "move" && this.moving) {
            const rect = svg.getBoundingClientRect();
            const xPos = (event.clientX - rect.left);
            const yPos = (event.clientY - rect.top);
            this.elem.setAttributeNS(null, "cx", xPos + this.movingDiffX);
            this.elem.setAttributeNS(null, "cy", yPos + this.movingDiffY);
            this.cx = xPos + this.movingDiffX;
            this.cy = yPos + this.movingDiffY;
        }
    });

    this.updateRadius = function(newX, newY) {
        this.r = Math.sqrt(Math.abs(this.cx - newX)**2 + Math.abs(this.cy - newY)**2)
        this.elem.setAttribute("r", this.r);
    }
}

function Triangle(x, y, color) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = null;
    this.y2 = null;
    this.x3 = null;
    this.y3 = null;
    this.moving = false;
    this.numClicks = 1;
    this.color = color;
    this.movingDiffX1 = null;
    this.movingDiffY1 = null;
    this.movingDiffX2 = null;
    this.movingDiffY2 = null;
    this.movingDiffX3 = null;
    this.movingDiffY3 = null;
    this.elem = document.createElementNS(NS, "polygon");
    this.elem.setAttributeNS(null, "fill", color);
    this.elem.setAttributeNS(null, "points", x+","+y + " "+x+","+y + " "+x+","+y);

    this.setP2 = function(x, y) {
        this.x2 = x;
        this.y2 = y;
        this.elem.setAttributeNS(null, "points", this.x1+","+this.y1 + " "+x+","+y + " "+x+","+(y+3));
        this.numClicks ++;
    }
    this.setP3 = function(x, y) {
        this.x3 = x;
        this.y3 = y;
        this.elem.setAttributeNS(null, "points", this.x1+","+this.y1 + " "+this.x2+","+this.y2 + " "+x+","+y);
        this.numClicks ++;
    }

    this.updatePoints = function(x, y) {
        if (numClicks == 1) {
            this.elem.setAttributeNS(null, "points", this.x1+","+this.y1+ " " + x+","+y + " " + x+","+(y+3));
        } else if (numClicks == 2) {
            this.elem.setAttributeNS(null, "points", this.x1+","+this.y1+ " " + this.x2+","+this.y2+" "+x+","+y);
        }
    }


    this.elem.addEventListener("click", (event)=> {
        if (currentAction == "move") {
            this.moving = !this.moving;
            if (this.moving) {
                moveElemToFront(this.elem);
                const rect = svg.getBoundingClientRect();
                const xPos = event.clientX - rect.left;
                const yPos = event.clientY - rect.top;
                this.movingDiffX1 = this.x1 - xPos;
                this.movingDiffY1 = this.y1 - yPos;
                this.movingDiffX2 = this.x2 - xPos;
                this.movingDiffY2 = this.y2 - yPos;
                this.movingDiffX3 = this.x3 - xPos;
                this.movingDiffY3 = this.y3 - yPos;
            }
        }
    });
    this.elem.addEventListener("mousemove", (event) => {
        if (currentAction == "move" && this.moving) {
            const rect = svg.getBoundingClientRect();
            const xPos = (event.clientX - rect.left);
            const yPos = (event.clientY - rect.top);
            this.x1 = xPos + this.movingDiffX1;
            this.y1 = yPos + this.movingDiffY1;
            this.x2 = xPos + this.movingDiffX2;
            this.y2 = yPos + this.movingDiffY2;
            this.x3 = xPos + this.movingDiffX3;
            this.y3 = yPos + this.movingDiffY3;
            this.elem.setAttributeNS(null, "points", this.x1+","+this.y1+" "+this.x2+","+this.y2+" "+this.x3+","+this.y3)
        }
    });
}

function init() {
    const svg = document.getElementById("svg");
    svg.addEventListener("click", (handleClick));
    svg.addEventListener("mousemove", handleMousemove);

    //Global Variables
    isClicked = false;
    clickX = null;
    clickY = null;
    currentShapeElem = null;
    currentColor = "black";
    currentColorButton = null;
    currentShape = "line";
    currentShapeButton = null;
    currentAction = "draw";
    currentActionButton = null;
    numClicks = 0;

    //Set up color buttons
    const colorButtons = document.getElementById("color-buttons").getElementsByTagName("button");
    for (const button of colorButtons) {
        if (button.id == "black") {
            currentColorButton = button;
            button.classList.add("current-color");
        }
        button.style.backgroundColor = button.id;
        button.addEventListener("click", () => {
            currentColorButton.classList.remove("current-color");
            currentColor = button.id;
            button.classList.add("current-color");
            currentColorButton = button;
        })
    }

    //Set up shape buttons
    const shapeButtons = document.getElementById("shape-buttons").getElementsByTagName("button");
    for (const button of shapeButtons) {
        if (button.id == "line") {
            currentShapeButton = button;
            button.classList.add("current-shape");
        }
        button.addEventListener("click", () => {
            currentShapeButton.classList.remove("current-shape");
            currentShape = button.id;
            button.classList.add("current-shape");
            currentShapeButton = button;
        })
    }

        //Set up action buttons
        const actionButtons = document.getElementById("action-buttons").getElementsByTagName("button");
        for (const button of actionButtons) {
            if (button.id == "draw") {
                currentActionButton = button;
                button.classList.add("current-action");
            }
            button.addEventListener("click", () => {
                currentActionButton.classList.remove("current-action");
                currentAction = button.id;
                button.classList.add("current-action");
                currentActionButton = button;
            })
        }
}

function handleClick(event) {
    if (currentAction == "move") {return null;}
    const svg = document.getElementById("svg");
    const rect = svg.getBoundingClientRect();
    let xPos = event.clientX - rect.left;
    let yPos = event.clientY - rect.top;

    if (isClicked && currentShape == "triangle") { //Intermediate trangle clicks
        if (numClicks == 1) {
            numClicks++;
            currentShapeElem.setP2(xPos, yPos);
        } else if (numClicks == 2) {
            currentShapeElem.setP3(xPos, yPos);
            isClicked = false;
            numClicks = 0;
        }
    } else {
        isClicked = !isClicked;

        if (isClicked) { //New Click
            clickX = xPos;
            clickY = yPos;
    
            if (currentShape == "circle") {
                const circle = new Circle(xPos, yPos, 0, currentColor);
                currentShapeElem = circle;
                svg.appendChild(circle.elem);
            } else if (currentShape == "rectangle") {
                const rect = new Rect(xPos, yPos, 0, 0, currentColor);
                const newRect = document.createElementNS(NS, "rect");
                currentShapeElem = rect;
                svg.appendChild(rect.elem);
            } else if (currentShape == "line") {
                const line = new Line(xPos, yPos, xPos, yPos, currentColor);
                currentShapeElem = line;
                svg.appendChild(line.elem);
            } else if (currentShape == "triangle") {
                const tri = new Triangle(xPos, yPos, currentColor)
                currentShapeElem = tri;
                svg.appendChild(tri.elem);
                numClicks = 1;
            }
        } else { //Old Click
            clickX = null;
            clickY = null;
        }
    }
}

function handleMousemove(event) {
    const svg = document.getElementById("svg");
    const rect = svg.getBoundingClientRect();
    let xPos = event.clientX - rect.left;
    let yPos = event.clientY - rect.top;

    if (isClicked) {
        if (currentShape == "circle") {
            currentShapeElem.updateRadius(xPos, yPos);
        } else if (currentShape == "rectangle") {
            currentShapeElem.updateRect(xPos, yPos);
        } else if (currentShape == "line") {
            currentShapeElem.updateEndpoint(xPos, yPos);
        } else if (currentShape == "triangle") {
            currentShapeElem.updatePoints(xPos, yPos);
        }
    }
}

function moveElemToFront(elem) {
    const children = svg.children;
    for (const child of children) {
        if (child == elem) {
            child.remove();
            svg.appendChild(child);
        }
    }
}