const fs = require('fs');

let text = fs.readFileSync('aoc_3.txt')
text = text.toString().split("\r\n")

let gamma_rate = "";
let epsilon_rate = "";

const width = text[0].length;
const heigth = text.length
for (let w=0; w<width; w++){
    let bit1Count = 0;
    for (const t of text){
        if (t[w] === "1"){
            bit1Count++;
        }
    }
    if (bit1Count > Math.ceil(heigth/2)){
        gamma_rate += "1"
        epsilon_rate += "0"
    } else {
        gamma_rate += "0"
        epsilon_rate += "1"
    }
}
epsilon_rate = parseInt(epsilon_rate, 2);
gamma_rate = parseInt(gamma_rate, 2);
console.log(gamma_rate * epsilon_rate)
