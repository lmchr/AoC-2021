const fs = require('fs');

let text = fs.readFileSync('aoc_01.txt')
text = text.toString().split("\n").map(x => parseInt(x))
res = []
for (let i=0; i<text.length; i++){
    if (i==0){
        res.push(0)
    } else {
        res.push(text[i] > text[i - 1])
    }
}
res = res.reduce((pv, cv) => pv + cv, 0);
console.log(res);
