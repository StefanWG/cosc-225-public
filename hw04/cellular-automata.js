let NUMCOLS = 101;
let NUMROWS = 50;

function origBoxes() {
    const grid = document.getElementById("ca");
    const row = document.createElement("div");
    row.classList.add("main-row");
    row.classList.add("row");

    for (let c = 0; c < NUMCOLS; c++) {
        let cell = document.createElement("div");
        cell.id = "main-cell-"+c.toString();
        cell.classList.add("cell");
        if (c == Math.floor(NUMCOLS/2)) {
            cell.classList.add("ca-on");

        } else {
            cell.classList.add("ca-off");

        }
        row.appendChild(cell);

        cell.addEventListener("click", function() {
            updateCA(c);
        });
    }
    grid.appendChild(row);

    for (let r = 0; r < NUMROWS; r++) {    
        const row = document.createElement("div");
        row.classList.add("row");
        for (let c = 0; c < NUMCOLS; c++) {
            let cell = document.createElement("div");
            cell.id = "cell-"+c.toString();
            cell.classList.add("cell");
            cell.classList.add("ca-off");
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }

    //Add listener to button
    const runButton = document.getElementById("runButton");
    runButton.addEventListener("click", animate);


    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGrid)


    const slider = document.getElementById("slider");
    slider.addEventListener("input", function() {
        const sliderVal = document.getElementById("sliderVal");
        sliderVal.innerHTML = "You Have Selected Rule Number " + slider.value;
    })

    //Set initial slider text
    const sliderVal = document.getElementById("sliderVal");
    sliderVal.innerHTML = "You Have Selected Rule Number " + slider.value;
}

function getInitialArray() {
    const array = [];
    let rows = document.getElementsByClassName("main-row");
    let row = rows[0];
    let children = row.children;
    for (let c = 0; c < NUMCOLS; c++) {
        let cell = children[c];
        const classList = cell.classList;
        for (const _class of classList) {
            if (_class.match("^ca-on")) {
                array.push(1);
            } else if (_class.match("^ca-off")) {
                array.push(0);
            }
        }
    }
    return array;
}

function updateCA(c) {
    const cell = document.getElementById("main-cell-"+c.toString());
    const classList = cell.classList;
    for (const _class of classList) {
        if (_class.match("^ca-on")) {
            cell.classList.remove(_class);
            cell.classList.add("ca-off");
        } else if (_class.match("^ca-off")) {
            cell.classList.remove(_class);
            cell.classList.add("ca-on");
        }
    }
}

function applyRule(config, rule) {
    const newConfig = [];
    for (let c = 0; c < config.length; c++) {
        //Get neighbors above
        var ruleNum = "";
        for (let i = -1; i < 2; i++) {
            let v = config[(c+i+NUMCOLS)%NUMCOLS];
            ruleNum = ruleNum + v.toString();
        }
        // console.log("RN " + ruleNum + " " + parseInt(ruleNum, 2) + " " + (rule >> ruleNum) % 2);
        newConfig.push((rule >> parseInt(ruleNum, 2)) % 2);
    }
    return newConfig;
}

function resetGrid() {
    const grid = document.getElementById("ca");
    var rows = grid.getElementsByClassName("row");
    //Delete Previous Rows
    while (rows.length > 1) {
        const secondRow = rows[1];
        secondRow.remove();
        rows = grid.getElementsByClassName("row");
    }
}


function animate() {
    const slider = document.getElementById("slider");
    const rule = slider.value;
    const grid = document.getElementById("ca");
    let id = null;
    let i = 0;
    //Reset Grid
    resetGrid();
    //Draw Initial Grid
    const rows = [];
    for (let r = 0; r < NUMROWS; r++) {    
        const row = document.createElement("div");
        row.classList.add("row");
        for (let c = 0; c < NUMCOLS; c++) {
            let cell = document.createElement("div");
            cell.id = "cell-"+c.toString();
            cell.classList.add("cell");
            if (Math.random() < 0.5) {
                cell.classList.add("ca-off");
            } else {
                cell.classList.add("ca-on");
            }
            row.appendChild(cell);
        }
        grid.appendChild(row);
        rows.push(row);
    }
    //Get final array
    const initConfig = getInitialArray();
    const finalConfig = [];
    finalConfig.push(applyRule(initConfig, rule));
    for (let i = 1; i < NUMROWS; i++) {
        finalConfig.push(applyRule(finalConfig[finalConfig.length - 1], rule));
    }
    //Animate
    clearInterval(id);
    setInterval(frame, 0);

    function frame() {
        if (i == 10+NUMROWS*2) {
            clearInterval(id);
        } else {
            for (let x = 0; x < NUMROWS; x++) {
                const r = rows[x];
                let cellNum = 0;
                const cells = r.getElementsByClassName("cell");
                for (const cell of cells) {
                    for (const _class of cell.classList) {
                        if (_class.match("^ca-")) {
                            cell.classList.remove(_class)
                        }
                    }
                    if ((i - x) * 2 > 10) {
                        if (finalConfig[x][cellNum] == 0) {
                            cell.classList.add("ca-off");
                        } else {
                            cell.classList.add("ca-on");
                        }
                    } else {
                        if (Math.random() < 0.5) {
                            cell.classList.add("ca-off");
                        } else {
                            cell.classList.add("ca-on");
                        }
                    }
                    cellNum++;
                }
            }
            i++;
        }
    }
}