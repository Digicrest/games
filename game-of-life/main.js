// Game of Life
let generation_counter = 0;
let duplicate_generations = 0;

const _cols = 40, _rows = 40;
let table = new Array(_rows).fill(0).map(() => new Array(_cols).fill(0));
let next = new Array(_rows).fill(0).map(() => new Array(_cols).fill(0));


function DrawTable(spawn_chance) {
    // create our elements
    let container = document.createElement("div");
    container.classList.add("container");

    for (let i = 0; i < table.length; i++) {
        let row = document.createElement("div")
        row.classList.add("row");

        for (let j = 0; j < table[0].length; j++) {
            table[i][j] = Math.random() < spawn_chance ? 1 : 0;

            let cell = document.createElement("div")
            cell.classList.add("always");
            // cell.style = `width: ${1000 / _cols}px;`;

            cell.classList.add("dead")
            if (table[i][j]) {
                cell.classList.add("alive")
                cell.classList.remove("dead")
                cell.style = "min"
            }

            row.appendChild(cell)
        }
        container.appendChild(row);
    }

    document.getElementById("app").appendChild(container);
}
document.addEventListener("DOMContentLoaded", () => {
    DrawTable(.4);
})

const countAliveCells = grid => grid.reduce((total, subarr) => total += subarr.reduce((sum, num) => {
    return num > 0 ? sum += num : sum;
}, 0), 0);

let myTimer = setInterval(GameOfLife, 50);


function GameOfLife() {

    run();
    checkGameEnded();
    if (duplicate_generations === 0) {
        generation_counter++;
        document.getElementById("generations").innerText = generation_counter;
    }

    table = next;
    next = new Array(_rows).fill(0).map(() => new Array(_cols).fill(0));
}

function checkGameEnded() {
    living_cells = countAliveCells(table);

    // POPULATION IS ZERO
    if (!living_cells) {
        document.querySelector("#app").innerHTML = "";
        DrawTable(0);
        clearInterval(myTimer);
    }

    // CHECKING FOR OSCILLATORS
    if (living_cells === countAliveCells(next)) duplicate_generations++
    else duplicate_generations = 0;

    // ONLY OSCILLATORS
    if (duplicate_generations > 50) {
        clearInterval(myTimer);
    }

}
function changeClasses(state, x, y) {
    if (state === "died") {
        document.querySelector(`#app > div > div:nth-child(${x}) > div:nth-child(${y})`).classList.remove("alive");
        document.querySelector(`#app > div > div:nth-child(${x}) > div:nth-child(${y})`).classList.add("dead");
    } else {
        document.querySelector(`#app > div > div:nth-child(${x}) > div:nth-child(${y})`).classList.remove("dead");
        document.querySelector(`#app > div > div:nth-child(${x}) > div:nth-child(${y})`).classList.add("alive");
    }
}
function run() {
    // iterate through every cell
    for (let i = 1; i < _rows - 1; i++) {
        for (let j = 1; j < _cols - 1; j++) {

            // check neighbors for cell in a 3x3
            let living_neighbors = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (x === 0 && y === 0) continue;
                    if (table[i + x][j + y] === 1) {
                        living_neighbors++;
                    }
                }
            }

            // compute next state based on current
            if (table[i][j] === 1 && living_neighbors < 2) {            // died due to loneliness
                next[i][j] = 0;
                changeClasses("died", i, j)
            }
            else if (table[i][j] === 1 && living_neighbors > 3) {       // died due to overpopulation
                next[i][j] = 0;
                changeClasses("died", i, j)
            }
            else if (table[i][j] === 0 && living_neighbors === 3) {     // born due to reproduction
                next[i][j] = 1;
                changeClasses("born", i, j)
            }
            else next[i][j] = table[i][j];
        }
    }
}