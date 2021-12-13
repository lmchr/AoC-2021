const fs = require('fs');

let text = fs.readFileSync('aoc_06.txt')
text = text.toString().split(",").map(x => parseInt(x))

const numDays = 80
let numZeros = 0
for (let day=0; day<numDays; day++){
    numZeros = text.filter(x => x == 0).length
    text = text.map(x => x > 0? x-1:6)
    for (let i=0;i<numZeros; i++){
        text.push(8)
    }
    console.log(text)
}

console.log(text.length)