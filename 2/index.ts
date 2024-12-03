const fs = require("node:fs/promises");
async function aoc2_1() {
  try {
    const data = await fs.readFile("./input.txt", { encoding: "utf8" });

    let reports: Array<Array<number>> = [];

    for (const report of data.split("\n")) {
      const current = report.split(" ");
      let currentArray: Array<number> = [];
      for (const num of current) {
        const next = parseInt(num);
        if (!isNaN(next)) {
          currentArray.push(next);
          continue;
        }
        throw new Error("Not a number");
      }
      reports.push(currentArray);
    }

    let numberOfValidReports = 0;

    for (const report of reports) {
      if(isSafe(report)) {
        numberOfValidReports++;
      }      
    }

    console.log(numberOfValidReports);
  } catch (err) {
    console.log(err);
  }
}


async function aoc2_2() {
  try {
    const data = await fs.readFile("./input.txt", { encoding: "utf8" });

    let reports: Array<Array<number>> = [];

    for (const report of data.split("\n")) {
      const current = report.split(" ");
      let currentArray: Array<number> = [];
      for (const num of current) {
        const next = parseInt(num);
        if (!isNaN(next)) {
          currentArray.push(next);
          continue;
        }
        throw new Error("Not a number");
      }
      reports.push(currentArray);
    }

    let numberOfValidReports = 0;

    for (const report of reports) {
      if (isSafe(report)) {
        numberOfValidReports++;
      } else {
        for (let i = 0; i < report.length; i++) {
          const dampened = [...report];
          dampened.splice(i, 1);
          if (isSafe(dampened)) {
            numberOfValidReports++;
            break;
          }
        }
      }
    }
    console.log(numberOfValidReports);
  } catch (err) {
    console.log(err);
  }
}

const isSafe = (report: Array<number>) => {
    let direction = 0;
    for (let i = 1; i < report.length; i++) {
      const distance = report[i] - report[i - 1];
  
      // if the direction changes, the report is invalid
      const currentDirection = distance > 0 ? 1 : 2;
      if (direction !== 0 && currentDirection !== direction) {
        return false;
      }
      direction = currentDirection;
      const absoluteDistance = Math.abs(distance);
      // when the distance is greater than 3 or 0, the report is invalid
      if (absoluteDistance > 3 || absoluteDistance === 0) {
        return false;
      }
    }
    return true;
  };
  

aoc2_1();
aoc2_2();
