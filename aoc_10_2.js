const fs = require('fs');

let text = fs.readFileSync('aoc_10.txt').toString().split("\r\n")

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
let lookupBracketsReverse = {}
for (const [k,v] of Object.entries(lookupBrackets)){
    lookupBracketsReverse[v] = k
}
let completionPoints = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}
let aborted = false
let scores = []
for (let line of text){
    let queue = []
    aborted = false
    for (let char of line){
        if (['(', '[', '{', '<'].includes(char)){
            queue.push(char)
        } else {
            // closing char
            let lastChar = queue.at(-1)
            let expectedChar = lookupBrackets[char]
            if (expectedChar !== lastChar){
                // discard line
                aborted = true
                break
            } else {
                queue.pop()
            }
        }
    }
    if (!aborted){
        // fix line
        let score = 0
        for (let q of queue.reverse()){
            oppositeChar = lookupBracketsReverse[q]
            p = completionPoints[oppositeChar]
            score = score* 5 + p
        }
        scores.push(score)
    }
}
console.log(Math.floor(scores.sort((a,b) => b-a)[Math.floor(scores.length / 2)]))