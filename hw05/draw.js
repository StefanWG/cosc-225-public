let NS = "http://www.w3.org/2000/svg";

function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
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
            const points = currentShapeElem.getAttribute("points");
            currentShapeElem.setAttributeNS(null, "points", points + " "+xPos + "," + yPos)
        } else if (numClicks == 2) {
            const points = currentShapeElem.getAttribute("points");
            currentShapeElem.setAttributeNS(null, "points", points + " "+xPos + "," + yPos)
            isClicked = false;
            numClicks = 0;
        }
    } else {
        isClicked = !isClicked;

        if (isClicked) { //New Click
            clickX = xPos;
            clickY = yPos;
    
            if (currentShape == "circle") {
                const newCircle = document.createElementNS(NS, "circle");
                newCircle.setAttributeNS(null, "cx", xPos);
                newCircle.setAttributeNS(null, "cy", yPos);
                newCircle.setAttributeNS(null, "r", 0);
                newCircle.setAttributeNS(null, "fill", currentColor);
                currentShapeElem = newCircle;
                svg.appendChild(newCircle);
            } else if (currentShape == "rectangle") {
                const newRect = document.createElementNS(NS, "rect");
                newRect.setAttributeNS(null, "x", xPos);
                newRect.setAttributeNS(null, "y", yPos);
                newRect.setAttributeNS(null, "width", 0);
                newRect.setAttributeNS(null, "height", 0);
                newRect.setAttributeNS(null, "fill", currentColor);
                newRect.setAttributeNS(null, "startX", xPos);
                newRect.setAttributeNS(null, "startY", yPos);
                currentShapeElem = newRect;
                svg.appendChild(newRect);
            } else if (currentShape == "line") {
                const newLine = document.createElementNS(NS, "line");
                newLine.setAttributeNS(null, "x1", xPos);
                newLine.setAttributeNS(null, "y1", yPos);
                newLine.setAttributeNS(null, "x2", xPos);
                newLine.setAttributeNS(null, "y2", yPos);
                newLine.setAttributeNS(null, "stroke", currentColor);
                newLine.setAttributeNS(null, "stroke-width", 2);
                currentShapeElem = newLine;
                svg.appendChild(newLine);
            } else if (currentShape == "triangle") {
                const newTri = document.createElementNS(NS, "polygon");
                newTri.setAttributeNS(null, "points", xPos+","+yPos + " " +xPos+","+yPos + " " +xPos+","+yPos);
                newTri.setAttributeNS(null, "fill", currentColor);
                currentShapeElem = newTri;
                svg.appendChild(newTri);
                numClicks = 1;
            }
        currentShapeElem.addEventListener("click", clickObject);
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
            const cx = currentShapeElem.getAttribute("cx");
            const cy = currentShapeElem.getAttribute("cy");
            const dist = Math.sqrt(Math.abs(cx - xPos)**2 + Math.abs(cy - yPos)**2)
            currentShapeElem.setAttribute("r", dist);
        } else if (currentShape == "rectangle") {
            const startX = currentShapeElem.getAttribute("startX");
            const startY = currentShapeElem.getAttribute("startY");
            if (xPos >= startX) {
                currentShapeElem.setAttribute("width", xPos - startX);
            } else {
                currentShapeElem.setAttribute("x", xPos);
                currentShapeElem.setAttribute("width", startX - xPos);
            }
            if (yPos >= startY) {
                currentShapeElem.setAttribute("height", yPos - startY);
            } else {
                currentShapeElem.setAttribute("y", yPos);
                currentShapeElem.setAttribute("height", startY - yPos);
            }
        } else if (currentShape == "line") {
            currentShapeElem.setAttributeNS(null, "x2", xPos);
            currentShapeElem.setAttributeNS(null, "y2", yPos);
        } else if (currentShape == "triangle") {
            if (numClicks == 1) {
                const newPoints = currentShapeElem.getAttribute("points").split(" ")[0] + " " + xPos+","+yPos + " " + xPos+","+(yPos+3);
                currentShapeElem.setAttributeNS(null, "points", newPoints);
            } else if (numClicks == 2) {
                const newPoints = currentShapeElem.getAttribute("points").split(" ")[0] + " " + currentShapeElem.getAttribute("points").split(" ")[1] + " " + xPos+","+yPos;
                currentShapeElem.setAttributeNS(null, "points", newPoints);
            }
        }
    }
}

function clickObject(event) {
    if (currentAction == "draw") {return null;}
    const target = event.target;
    if (target.hasAttributeNS(null, "clicked")) {
        target.setAttributeNS(null, "stroke", "black");
        target.setAttributeNS(null, "stroke-width", 0);
        target.removeAttributeNS(null, "clicked");
    } else {
        target.setAttributeNS(null, "stroke", "black");
        target.setAttributeNS(null, "stroke-width", 3);
        target.setAttributeNS(null, "clicked", true);
    }


}

