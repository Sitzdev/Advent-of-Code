import {input} from "./input"

let left:Array<number> = []
let right:Array<number> = []

const splitted = input.split(';')

for(let i = 0; i < splitted.length; i++ ){
    if(i % 2 === 0){
        left.push(parseInt(splitted[i]))
        continue;
    }
    right.push(parseInt(splitted[i]))
}

left = left.sort()
right = right.sort()


let distance = 0

for(let i = 0; i < left.length; i++){
    distance += Math.abs(left[i] - right[i]) 
}

console.log(distance)

//part 2

const uniqueLeftEntries = new Set(left).values()
const groupedEntries:Map<number,number> = new Map()


for(let i = 0; i < right.length; i++){
    if(groupedEntries.has(right[i])){
        const currentValue = groupedEntries.get(right[i])! + 1
        groupedEntries.set(right[i],currentValue)
        continue;
    }
    groupedEntries.set(right[i],1)
}

let simmilarity = 0

for(const entry of uniqueLeftEntries){
    const entryOfGroupedEntries = groupedEntries.get(entry)
    if(entryOfGroupedEntries){
        simmilarity+= entry * entryOfGroupedEntries
    }
}
console.log(simmilarity)