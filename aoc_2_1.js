let horizontalPos = 0;
let depth = 0;

const fs = require('fs');

let text = fs.readFileSync('aoc_2.txt')
text = text.toString().split("\r\n")

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