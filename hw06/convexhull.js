let NS = "http://www.w3.org/2000/svg";
const selectedPoints = [];



function Point(x, y) {
    this.x = x;
    this.y = y;
    this.selected = false;

    this.elem = document.createElementNS(NS, "circle");
    this.elem.setAttributeNS(null, "cx", x);
    this.elem.setAttributeNS(null, "cy", y);
    this.elem.classList.add("point");
    this.elem.addEventListener("click", (event) => {
        this.clicked(event)
    });

    const pointLayer = document.getElementById("pointLayer");
    pointLayer.appendChild(this.elem);

    this.clicked = function(event) {
        if (this.selected) {
            this.elem.classList.add("selected");
        } else {
            this.elem.classList.remove("selected");
        }
        this.selected = !this.selected;

        if (selectedPoints.length == 0) {
            selectedPoints.push(this);
        } else {
            const p = selectedPoints.pop();
            const l = new Line(p, this);
        }
    }
}

function Line(a, b) {
    this.x1 = a.x;
    this.y1 = a.y;
    this.x2 = b.x;
    this.y2 = b.y;
    
    this.elem = document.createElementNS(NS, "line");
    this.elem.setAttributeNS(null, "x1", this.x1);
    this.elem.setAttributeNS(null, "y1", this.y1);    
    this.elem.setAttributeNS(null, "x2", this.x2);
    this.elem.setAttributeNS(null, "y2", this.y2);
    this.elem.classList.add("line");

    const edgeLayer = document.getElementById("edgeLayer");
    edgeLayer.appendChild(this.elem);
}

function Graph() {
    this.edges = [];
    this.points = [];
}

function handleClick(event) {
    if (selectedPoints.length == 0) {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const p = new Point(x, y);
    }
}

const g = Graph();
const SVG = document.getElementById("svg");
const rect = SVG.getBoundingClientRect();
SVG.addEventListener("click", (e) => {
    handleClick(e);
});

