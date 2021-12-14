const fs = require('fs');

let text = fs.readFileSync('aoc_14.txt').toString().split("\n")

let letterArray = text[0].split("")
let rules = text.slice(2).map(x => x.split(" -> "))
let ruleLookup = {}
for (let rule of rules){
    ruleLookup[rule[0]] = rule[1]
}

function insert(pairCounts, key, val) {
    if (pairCounts[key]){
        pairCounts[key] = pairCounts[key] + val
    } else {
        pairCounts[key] = val
    }
}
function remove(pairCounts, key, val) {
    if (pairCounts[key] > 0){
        pairCounts[key] = pairCounts[key] - val
        if (pairCounts[key] === 0){
            delete pairCounts[key]

        }
    }
}
let pairCounts = {}
// init with existing pairs
for (let i=letterArray.length - 2; i>= 0; i--){
    let strPart = letterArray.slice(i, i + 2).join("")
    insert(pairCounts, strPart, 1)
}
for (let step=0; step<10; step++){
    let pairCountsTmp = {}
    Object.assign(pairCountsTmp, pairCounts)
    for (let [key, value] of Object.entries(pairCounts)){
        insertChar = ruleLookup[key]
        p1 = key[0] + insertChar
        p2 = insertChar + key[1]
        remove(pairCountsTmp, key, value)
        insert(pairCountsTmp, p1, value)
        insert(pairCountsTmp, p2, value)
    }
    Object.assign(pairCounts, pairCountsTmp)
    console.log(step)
}

var items = Object.keys(pairCounts).map(function(key) {
    return [key, pairCounts[key]];
});

// Sort the array based on the second element
items.sort(function(first, second) {
    return second[1] - first[1];
});

console.log(Object.values(items)[0][1] - Object.values(items).at(-1)[1])