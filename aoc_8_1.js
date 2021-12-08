const fs = require('fs');

let text = fs.readFileSync('aoc_8.txt').toString().split("\r\n")
text = text.map(x => x.split(" | "));
const letters = {
    0: ["abcefg"],
    1: ["cf"],
    2: ["acdeg"],
    3: ["acdfg"],
    4: ["bcdf"],
    5: ["abdfg"],
    6: ["abdefg"],
    7: ["acf"],
    8: ["abcdefg"],
    9: ["abcdfg"]
}

count_1478 = {
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0,
    8:0,
    9:0
}
for (let [inp, out] of text){
    for (let token of out.split(" ")){
        switch (token.length){
            case 2:
                count_1478[1]++
                break
            case 3:
                count_1478[7]++
                break
            case 4:
                count_1478[4]++
                break
            case 7:
                count_1478[8]++
                break
        }
    }

}
 console.log(Object.values(count_1478).reduce((a,b) => a+b))