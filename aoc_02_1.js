let horizontalPos = 0;
let depth = 0;

const fs = require('fs');

let text = fs.readFileSync('aoc_02.txt')
text = text.toString().split("\n")

for (let i=0; i<text.length; i++){
    let t = text[i].split(" ")
    const val = parseInt(t[1]);

    switch (t[0]){
        case "forward":
            horizontalPos+=val
            break;
        case "down":
            depth+=val;
            break;
        case "up":
            depth-=val;
            break;
    }
}

console.log(horizontalPos * depth);