const fs = require('fs');

let text = fs.readFileSync('aoc_04.txt')
text = text.toString().split("\n")

class Element {
    constructor(val, isDrawn=false){
        this.val = val
        this.isDrawn = isDrawn
    }
}

let drawnNumber = text[0].split(",").map(x => parseInt(x));
let fields = [];
let field = []
text = text.slice(2).map(x => x.split(" ").filter(x => x).map(x => parseInt(x)))
for (let line of text){
    if (line == ''){
        fields.push(field)
        field = [];
    } else {
        field.push(line.map(x => new Element(x)));
    }
}
fields.push(field)

function isDone(arr){
    // rows
    for (const r of arr){
        if (r.every(x => x.isDrawn)){
            return true
        }
    }
    // cols
    for (let idx=0; idx<arr[0].length; idx++){
        if (arr.every(x => x[idx].isDrawn)){
            return true
        }
    }
    return false
}

function markDrawn(arr, num){
    for (let x of arr){
        for (let y of x){
            if (y.val === num){
                y.isDrawn = true;
            }
        }
    }
    return arr
}

function sumUnmarked(arr) {
    let sum = 0;
    for (let x of arr){
        for (let y of x){
            if (!y.isDrawn){
                sum += y.val;
            }
        }
    }
    return sum
}

// start drawing
for (let x of drawnNumber) {
    for (let field of fields){
        markDrawn(field, x)
    }
    let doneIds = [];
    for (let [idx, field] of fields.entries()){
        done = isDone(field, x)
        if (done){
            doneIds.push(idx);
        }
    }
    if (doneIds.length > 0){
        // last board to win
        if (fields.length === 1){
            console.log(x * sumUnmarked(fields[0]))
            process.exit(0);
        }
        for (let doneId of doneIds.sort().reverse()){
            fields.splice(doneId, 1); 
        }

    }
}