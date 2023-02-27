let NS = "http://www.w3.org/2000/svg";

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
}

function handleClick(event) {
    const svg = document.getElementById("svg");
    const rect = svg.getBoundingClientRect();
    let xPos = event.clientX - rect.left;
    let yPos = event.clientY - rect.top;
    isClicked = !isClicked;

    if (isClicked) { //New Click
        clickX = xPos;
        clickY = yPos;

        if (currentShape == "circle") {
            const newCircle = document.createElementNS(NS, "circle");
            newCircle.setAttribute("cx", xPos);
            newCircle.setAttribute("cy", yPos);
            newCircle.setAttribute("r", 0);
            newCircle.setAttribute("style", "fill:"+currentColor);

            currentShapeElem = newCircle;
            svg.appendChild(newCircle);

        } else {
            const newLine = document.createElementNS(NS, "line");
            newLine.setAttribute("x1", xPos);
            newLine.setAttribute("y1", yPos);
            newLine.setAttribute("x2", xPos);
            newLine.setAttribute("y2", yPos);
            newLine.setAttribute("style", "stroke:"+currentColor+";stroke-width:2");
            currentShapeElem = newLine;
            svg.appendChild(newLine);
        }

    } else { //Old Click
        clickX = null;
        clickY = null;
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

        } else {
            currentShapeElem.setAttribute("x2", xPos);
            currentShapeElem.setAttribute("y2", yPos);
        }
    }
}

