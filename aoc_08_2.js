const fs = require('fs');

let text = fs.readFileSync('aoc_08.txt').toString().split("\n")
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

let finalResults = [];
for (let [inp, out] of text){
    let mapp = {
        0: undefined,
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
        9: undefined
    }
    let inp_split = inp.split(" ")
    for (let token of inp_split){
        switch (token.length){
            case 2:
                mapp[1] = token
                break
            case 3:
                mapp[7] = token
                break
            case 4:
                mapp[4] = token
                break
            case 7:
                mapp[8] = token
                break
        }
    }
    // easy numbers are determined
    let areSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
    function a(inp_split, mapp, index_mapp, offset_letters_length){
        // remove elements that were chosen before and are no longer important
        let removedElements = Object.values(mapp).filter(x=>x).map(x => new Set(x.split("")))
        let input_candidates =  inp_split.filter(x => removedElements.every(y => !areSetsEqual(y, new Set(x.split("")))))
    
        let candidates = input_candidates.filter(y=>y.length == mapp[index_mapp].length + offset_letters_length).map(seq => seq.split(""))
        let indexCandidate = candidates.map(x => mapp[index_mapp].split("").map(y=>x.includes(y)?y:undefined)).map(x => x.every(y=>y)).findIndex(x => x)
        return candidates[indexCandidate].join("")
    }

    function getRemainingCandidates(mapp, inp_split){
        let removedElements = Object.values(mapp).filter(x=>x).map(x => new Set(x.split("")))
        let input_candidates =  inp_split.filter(x => removedElements.every(y => !areSetsEqual(y, new Set(x.split("")))))
        return input_candidates
    }

    function b(inp_split, mapp, index_mapp, expectedLength, numSameSegments){
        // remove elements that were chosen before and are no longer important
        let input_candidates = getRemainingCandidates(mapp, inp_split)
        input_candidates = input_candidates.filter(x => x.length === expectedLength)
        let referenceMapp = mapp[index_mapp]
        let referenceMappSet = new Set(referenceMapp.split(""))
        for (let candidate of input_candidates){
            let cSet = new Set(candidate.split(""))
            let segmentsInCommon = [...cSet].filter(x => referenceMappSet.has(x))
            if (segmentsInCommon.length == numSameSegments){
                return candidate
            }
        }
        throw `No candidate found for ${referenceMapp}`
        console.log()
    }

    // 9 has 2 additional segments enabled in comparison to 4
    mapp[9] = a(inp_split, mapp, 4, 2)
    // 3 has 3 additional segments enabled in comparison to 1
    mapp[3] = a(inp_split, mapp, 1, 3)

    // 0 has 2 segments in common to 4 and has 5 segments in total
    mapp[2] = b(inp_split, mapp, 4, 5, 2)

    // 0 has 2 segments in common to 1 and has 6 segments in total
    mapp[0] = b(inp_split, mapp, 1, 6, 2)

    // 6 has 6 segments in common to 8 and has 6 segments in total
    mapp[6] = b(inp_split, mapp, 8, 6, 6)
    let input_candidates = getRemainingCandidates(mapp, inp_split)
    mapp[5] = input_candidates[0]
    // sort mapp
    for (const key in Object.keys(mapp)){
        mapp[key] = mapp[key].split("").sort().join("")
    }
    
    // finally decode output
    let digit = "";
    for (const outp of out.split(" ").map(x => x.split("").sort().join(""))){
        for (const [key, value] of Object.entries(mapp)) {
            if (value === outp){
                digit += key;
                break
            }
        }
    }
    finalResults.push(parseInt(digit))
}
console.log(finalResults)
console.log(finalResults.reduce((a,b) => a+b))