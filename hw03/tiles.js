let NUMROWS = 10;
let NUMCOLS = 10;

function getColor(row, col) {
    let hue = ((row+col)*(row+col)).toString();
    let sat = (70-row*1).toString() + "%";
    let lig = (50-row*3).toString() + "%";
    let color = "hsl("+hue+","+sat+","+lig+")";
    return color;
}

function updateColor(row, col) {
    const cell = document.querySelector("#cell-"+row.toString()+"-"+col.toString());
    var classList = cell.classList;
    var hsl = 0;
    let regex = "^hsl";
    for (const clas of classList) {
        if (clas.match(regex)) {
            hsl = clas;
            cell.classList.remove(clas);
        }
    }

    hsl = hsl.slice(4, -1).split(",");
    const newH = ((parseInt(hsl[0])+60) % 360).toString()
    const newHsl = "hsl("+newH+","+hsl[1]+","+hsl[2]+")";

    cell.classList.add(newHsl);
    cell.style.backgroundColor = newHsl;

}

function resetGrid() {
    for (let r = 0; r < NUMROWS; r++) {
        for (let c = 0; c < NUMCOLS; c++) {
            let cell = document.querySelector("#cell-"+r.toString()+"-"+c.toString());
            let classList = cell.classList
            for (const clas of classList) {
                if (clas.match("^hsl")) {
                    cell.classList.remove(clas);
                }
            }
            const hsl = getColor(r, c);
            cell.classList.add(hsl);
            cell.style.backgroundColor = hsl;
        }
    }
}

function drawGrid() {
    const grid = document.querySelector(".grid");
    for (let r = 0; r < NUMROWS; r++) {
        let row = document.createElement("div");
        row.classList.add("gridRow");
        row.style.height = "10%"
        row.style.display = "flex";
        for (let c = 0; c < NUMCOLS; c++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = "cell-"+r.toString()+"-"+c.toString();
            const hsl = getColor(r, c);
            cell.classList.add(hsl);
            cell.style.backgroundColor = hsl;
            cell.style.height = "100%";
            cell.style.width = "100%";
            cell.style.boxSizing = "border-box";
            cell.addEventListener("click", function() {
                updateColor(r, c)}
            );
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }

    //Add listener to reset button
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGrid)

}
