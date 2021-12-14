const fs = require('fs');

let text = fs.readFileSync('aoc_14.txt').toString().split("\n")
console.log("")

let letterArray = text[0].split("")
let rules = text.slice(2).map(x => x.split(" -> "))
let ruleLookup = {}
for (let rule of rules){
    ruleLookup[rule[0]] = rule[1]
}
for (let step=0; step<10; step++){
    let l = letterArray.length
    for (let i=l - 2; i>= 0; i--){
        let strPart = letterArray.slice(i, i + 2)
        insertChar = ruleLookup[strPart.join("")]
        letterArray.splice(i + 1, 0, insertChar)
    }    
}
const counts = {};

for (const num of letterArray) {
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}
var items = Object.keys(counts).map(function(key) {
    return [key, counts[key]];
});

// Sort the array based on the second element
items.sort(function(first, second) {
    return second[1] - first[1];
});

console.log(Object.values(items)[0][1] - Object.values(items).at(-1)[1])