const fs = require('fs');

let text = fs.readFileSync('aoc_13.txt').toString().split("\n")

let folds = text.filter(x => x.startsWith('fold along ')).map(x => x.slice("fold along ".length)).map(x => x.split("=")).map(x => [x[0], parseInt(x[1])])
let coordinates = text.filter(x => !x.startsWith('fold along ') && x).map(x => x.split(",")).map(x => [parseInt(x[0]), parseInt(x[1])])

const heigth = Math.max(...coordinates.map(x => x[0]))
const width = Math.max(...coordinates.map(x => x[1]))

let field = new Array(width+1).fill(false).map(()=>new Array(heigth+1).fill(false));
for (let coord of coordinates){
    field[coord[1]][coord[0]] = true
}

for (let fold of folds){
    let val = fold[1]
    if (fold[0] == 'x'){ // fold down
        reversedLowerPart = field.map(x => x.slice(-val).reverse())
        for (let x=0; x<reversedLowerPart.length; x++){
            for (let y=0; y<reversedLowerPart[0].length; y++){
                field[x][y] = Math.max(field[x][y], reversedLowerPart[x][y])
            }
        }
        //take left part
        field = field.map(x => x.slice(0, val))
    } else { // fold up
        reversedLowerPart = field.slice(-val).reverse()
        for (let x=0; x<reversedLowerPart.length; x++){
            for (let y=0; y<reversedLowerPart[0].length; y++){
                field[x][y] = Math.max(field[x][y], reversedLowerPart[x][y])
            }
        }
        //take upper part
        field = field.slice(0, val)
    }
    console.log(field.map(x => x.reduce((a,b) => a+b)).reduce((a, b) => a+b))
    break
}