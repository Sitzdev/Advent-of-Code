import * as fs from "fs/promises";

const regex = /mul\(([0-9]*),([0-9]*)\)|don't\(\)|do\(\)/gm;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('mul\\(([0-9])*,([0-9])*\\)', 'gm')
const mul = (a: number, b: number) => a * b;

const readInput = async () => {
  const data = await fs.readFile("./input.txt", { encoding: "utf8" });

  return data.replace("\n", "");
};

const aoc3_1 = async () => {
  let cumSum = 0;
  let m;
  let multiplicationEnabled = true;

  const str = await readInput();

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    if (m[0] === "do()") {
      multiplicationEnabled = true;
    } else if (m[0] === "don't()") {
      multiplicationEnabled = false;
    } else {
      if (!multiplicationEnabled) {
        continue;
      }
      console.assert(m.length === 3, "Expected 3 matches");
      if (m.length !== 3) {
        throw new Error("Expected 3 matches");
      }
      cumSum += mul(parseInt(m[1]), parseInt(m[2]));
    }
  }

  console.log(cumSum);
};

// Reset `lastIndex` if this regex is defined globally
// regex.lastIndex = 0;

aoc3_1();
