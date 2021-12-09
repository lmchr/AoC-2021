const fs = require('fs');

let text = fs.readFileSync('aoc_9.txt').toString().split("\r\n")

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
            risks.push(el + 1);
        }
    }
}
console.log(risks.reduce((x,y) => x+y))
