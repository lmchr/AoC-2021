const fs = require('fs');

let text = fs.readFileSync('aoc_7.txt')
text = text.toString().split(",").map(x => parseInt(x))

const maxValue = Math.max(...text)

let fuels = {}
for (let i=0; i<=maxValue; i++){
    fuels[i] = 0
    for (let t of text){
        let n = Math.abs(t - i);
        n = (n**2 + n) / 2
        fuels[i] += n
    }
}
console.log(Math.min(...Object.values(fuels)))
