const fs = require('fs');

let text = fs.readFileSync('aoc_07.txt')
text = text.toString().split(",").map(x => parseInt(x))

const maxValue = Math.max(...text)

let fuels = {}
for (let i=0; i<=maxValue; i++){
    fuels[i] = 0
    for (let t of text){
        fuels[i] += Math.abs(t - i)
    }
}
console.log(Math.min(...Object.values(fuels)))
