const fs = require('fs');

let text = fs.readFileSync('aoc_10.txt').toString().split("\n")

text = text.map(x => x.split(""))

let m = {
    ')': 3,
    ']': 57,
    '}': 1197, 
    '>': 25137
}
let lookupBrackets = {
    ')': '(',
    ']': '[',
    '}': '{', 
    '>': '<'
}
let badFirstBrackets = []
for (let line of text){
    let queue = []
    for (let char of line){
        if (['(', '[', '{', '<'].includes(char)){
            queue.push(char)
        } else {
            // closing char
            let lastChar = queue.at(-1)
            let expectedChar = lookupBrackets[char]
            if (expectedChar !== lastChar){
                badFirstBrackets.push(char)
                break
            } else {
                queue.pop()
            }
        }
    }
}
let sum = 0
for (let [k,v] of Object.entries(m)){
    sum += badFirstBrackets.filter(x => x==k).length * v
}
console.log(sum)