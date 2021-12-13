const fs = require('fs');

let text = fs.readFileSync('aoc_01.txt')
text = text.toString().split("\n").map(x => parseInt(x))
res = []
for (let i=0; i<text.length - 2; i++){
    res.push(text[i] + text[i+1] + text[i + 2])
}
console.log(res)
sum = 0;
for (let index = 0; index < res.length - 1; index++) {
    if (res[index + 1] > res[index]){
        sum++;
    }
}
console.log(sum);
