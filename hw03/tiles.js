let NUMROWS = 10;
let NUMCOLS = 10;

function getColor(row, col) {
    // Calc color
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
    // Remove old class
    for (const clas of classList) {
        if (clas.match(regex)) {
            hsl = clas;
            cell.classList.remove(clas);
        }
    }
    // Calculate new color
    hsl = hsl.slice(4, -1).split(",");
    const newH = ((parseInt(hsl[0])+90) % 360).toString()
    const newHsl = "hsl("+newH+","+hsl[1]+","+hsl[2]+")";
    // Add new class and update color
    cell.classList.add(newHsl);
    cell.style.backgroundColor = newHsl;

    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let r = row + i;
            let c = col + j;
            if (i != 0 || j != 0) {
                if (r > -1 & r < 10 & c > -1 & c < 10) {
                    updateColorNeighbor(r, c);
                }
            }
        }
    }

}

function updateColorNeighbor(row, col) {
    const cell = document.querySelector("#cell-"+row.toString()+"-"+col.toString());
    var classList = cell.classList;
    var hsl = 0;
    let regex = "^hsl";
    // Remove old class
    for (const clas of classList) {
        if (clas.match(regex)) {
            hsl = clas;
            cell.classList.remove(clas);
        }
    }
    // Calculate new color
    hsl = hsl.slice(4, -1).split(",");
    const newL = ((parseInt(hsl[2].replace("%",""))+10) % 100).toString();
    const newHsl = "hsl("+hsl[0]+","+hsl[1]+","+newL+"%)";
    console.log(newHsl);
    // Add new class and update color
    cell.classList.add(newHsl);
    cell.style.backgroundColor = newHsl;

}

function resetGrid() {
    for (let r = 0; r < NUMROWS; r++) {
        for (let c = 0; c < NUMCOLS; c++) {
            let cell = document.querySelector("#cell-"+r.toString()+"-"+c.toString());
            let classList = cell.classList
            //Remove old class
            for (const clas of classList) {
                if (clas.match("^hsl")) {
                    cell.classList.remove(clas);
                }
            }
            //Reset color and add new class
            const hsl = getColor(r, c);
            cell.classList.add(hsl);
            cell.style.backgroundColor = hsl;
        }
    }
}

function drawGrid() {
    const grid = document.querySelector(".grid");
    for (let r = 0; r < NUMROWS; r++) {
        // Create row and add csss
        let row = document.createElement("div");
        row.classList.add("gridRow");
        row.style.height = "10%"
        row.style.display = "flex";
        for (let c = 0; c < NUMCOLS; c++) {
            // Create cell
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = "cell-"+r.toString()+"-"+c.toString();
            // Add color and css
            const hsl = getColor(r, c);
            cell.classList.add(hsl);
            cell.style.backgroundColor = hsl;
            cell.style.height = "100%";
            cell.style.width = "100%";
            cell.style.boxSizing = "border-box";
            // Add event listener
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
