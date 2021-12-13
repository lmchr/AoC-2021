const fs = require('fs');

let text = fs.readFileSync('aoc_9.txt').toString().split("\n")

text = text.map(x => x.split("").map(y=>parseInt(y)))

let risks = []
for (let x = 0; x < text.length; x++) {
    for (let y = 0; y < text[x].length; y++) {
        let el = text[x][y]
        let surrounding = []
        if (x-1 >= 0) {
            surrounding.push(text[x-1][y])
        }
        if (x + 1 < text.length) {
            surrounding.push(text[x+1][y])
        }
        if (y - 1 >= 0) {
            surrounding.push(text[x][y-1])
        }
        if (y + 1 < text[0].length) {
            surrounding.push(text[x][y+1])
        }
        if (surrounding.length > 0 && surrounding.every(x => x >el)){
            risks.push([x, y])
        }
    }
}

function isSetInArray(arr, x, y){
    for (let r of arr){
        if (r[0] == x && r[1] == y){
            return true
        }
    }
    return false
}

function findBasin(x, y, lst){
    if (x >= 0 && x < text.length && y >= 0 && y < text[0].length && text[x][y] != 9 && !isSetInArray(lst, x, y)){
        lst.push([x, y])
        findBasin(x-1, y, lst)
        findBasin(x+1, y, lst)
        findBasin(x, y-1, lst)
        findBasin(x, y+1, lst)
    }
}
let basins = []
for (let risk of risks){
    let lst = []
    findBasin(risk[0], risk[1], lst)
    lst = lst.map(x=>text[x[0]][x[1]])
    basins.push(lst.length)
}
basins = basins.sort((a,b) => b-a).slice(0, 3)
console.log(basins.reduce((x,y) => x*y))