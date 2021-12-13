const fs = require('fs');

let text = fs.readFileSync('aoc_03.txt')
text = text.toString().split("\n")

const width = text[0].length;

function a(text_in, epsilonRate) {
    let heigth = undefined;
    for (let w=0; w<width; w++){
        heigth = text_in.length
    
        if (text_in.length == 1){
            break
        }
        let bit1Count = 0;
        for (const t of text_in){
            if (t[w] === "1"){
                bit1Count++;
            }
        }
        let mostCommon = undefined;
        if (epsilonRate){
            bo = bit1Count >= (heigth - bit1Count)
        } else {
            bo = bit1Count < (heigth - bit1Count)
        }
        if (bo){
            mostCommon = "1"
        } else {
            mostCommon = "0"
        }
        text_in = text_in.filter(x => x[w] == mostCommon)
    }
    return text_in[0]
}

epsilon_rate = parseInt(a(text.slice(), true), 2);
gamma_rate = parseInt(a(text.slice(), false), 2);
console.log(epsilon_rate * gamma_rate)
