const fs = require('fs');

let text = fs.readFileSync('aoc_05.txt')
text = text.toString().split("\n")

let valueArray = []
for (const line of text){
    let newLine = line.split(" -> ")
    let [x1, y1] = newLine[0].split(",").map(x => parseInt(x))
    let [x2, y2] = newLine[1].split(",").map(x => parseInt(x))
    valueArray.push([x1,y1,x2,y2])
}
const maxSize = Math.max(...valueArray.map(x => Math.max(...x)))
let field = new Array(maxSize+1).fill(0).map(()=>new Array(maxSize+1).fill(0));
function getPoints(x1, y1, x2, y2){
    let pointsToFilled = [];
    // 1 2 3
    // 4 x 5
    // 6 7 8
    pointsToFilled.push([x1, y1, x2, y2])
    if (x1 != x2 && y1 != y2){
        return []
    }
    while (x1 != x2 || y1 != y2){
        if (x1 > x2 && y1==y2){
            x1--
        }
        if (x2 > x1 && y1==y2){
            x2--
        }
        if (y1 > y2 && x1==x2){
            y1--
        }
        if (y2 > y1 && x1==x2){
            y2--
        }
        pointsToFilled.push([x1, y1, x2, y2])
    }
    // reduce to 2 points
    let uniques = []
    for (const a of pointsToFilled.map(x => [[x[0], x[1]], [x[2], x[3]]]).flat()){
        if (!uniques.some(x => x[0] == a[0] && x[1] == a[1])){
            uniques.push(a)
        }
    }
    return uniques
}
for (const pair of valueArray){
    let pointsToFill = getPoints(...pair)
    for (const [x, y] of pointsToFill){
        field[x][y]++
    }
}
console.log(field.map(x => x.filter(x => x>=2).length).reduce((a,b) => a+b))
