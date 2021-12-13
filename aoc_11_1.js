const fs = require('fs');

let text = fs.readFileSync('aoc_11.txt').toString().split("\n")

text = text.map(x => x.split("").map(x => parseInt(x)))

class Octopus {
    constructor(timer, stepCount=0, flashCount=0){
        this.timer = timer
        this.stepCount = stepCount
        this.flashCount = flashCount
    }

    flash(step) {
        if (this.stepCount != step){
            this.timer++
        } else if (this.timer != 0){
            this.timer++
        }
        this.stepCount = step
        if (this.timer > 9){
            this.timer = 0
            this.flashCount++
            return true
        } else {
            return false
        }
    }
}

for (let x = 0; x < text.length; x++) {
    for (let y = 0; y < text[0].length; y++) {
        text[x][y] = new Octopus(text[x][y])
    }
}

function dod(x, y, step, text){
    if (x >= 0 && y >= 0 && x < text.length && y < text[0].length){
        flashed = text[x][y].flash(step)
        if (flashed){
            dod(x-1, y-1, step, text)
            dod(x-1, y, step, text)
            dod(x-1, y+1, step, text)
            dod(x, y-1, step, text)
            dod(x, y+1, step, text)
            dod(x+1, y-1, step, text)
            dod(x+1, y, step, text)
            dod(x+1, y+1, step, text)
        }
    }
}

for (let step=1; step <= 100; step++){
    console.log("\n" + text.map(x => x.map(y => y.timer).join("")).join("\n") + "\n")
    for (let x = 0; x < text.length; x++) {
        for (let y = 0; y < text[0].length; y++) {
            dod(x, y, step, text)
        }
    }
}

console.log(text.map(x => x.map(y => y.flashCount)).map(y => y.reduce((e,r) => e+r)).reduce((a,b) => a+b))