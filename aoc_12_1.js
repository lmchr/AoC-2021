const fs = require('fs');

let text = fs.readFileSync('aoc_12.txt').toString().split("\n")

text = text.map(x => x.split("-"))

class Cave{
    constructor(name, connectedTo=[]){
        this.name = name
        this.connectedTo = connectedTo
    }
    connectTo(newCave){
        let duplicates = this.connectedTo.filter(c => c.name===newCave.name)
        if (duplicates.length === 0){
            this.connectedTo.push(newCave)
        } else {
            console.log(`Duplicate caves: ${newCave.name}!`)
        }
    }
}

// create system
let caveLookup = {}
for (t of text.flat()){
    if (!caveLookup[t]){
        caveLookup[t] = new Cave(t)
    }
}
for (let [cave1Name, cave2Name] of text){
    let cave1 = caveLookup[cave1Name]
    let cave2 = caveLookup[cave2Name]
    caveLookup[cave1Name].connectTo(cave2)
    caveLookup[cave2Name].connectTo(cave1)
}
function isUpperCase(str) {
    return str === str.toUpperCase();
}

function isLowerCase(str) {
    return str === str.toLowerCase();
}

function visit(cave, collect, s){
    s.push(cave.name)
    if (cave.name === 'end'){
        collect.push(s)
    } else {
        for (let connectedCave of cave.connectedTo){
            if (connectedCave.name !== 'start' && (isUpperCase(connectedCave.name) || !s.includes(connectedCave.name))){
                visit(connectedCave, collect, s.slice())  // copy
            }
        }
    }   
    
}
res = []
visit(caveLookup['start'], res, [])
console.log(res.length)