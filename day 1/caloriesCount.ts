import fs from "fs/promises"


function getSortedTotalCalories(caloriesInput: number [][]): number[] {
  const totalCalories = caloriesInput.map(elfCalories => {
    return elfCalories.reduce((acc, itemCal) => {

      return acc + itemCal
    },0)
  })

  return totalCalories.sort((a, b) => b - a)
}

function getMaxCalories(caloriesInput: number[] ): number {
  return caloriesInput[0]
}

function getTop3TotalCalories(caloriesInput: number[] ): number {

  return caloriesInput[0] + caloriesInput[1] + caloriesInput[2];
}


fs.readFile('./input.txt').then((data: Buffer) => {
  const rawData = data.toString();

  const parsedData: number[][] = [];
  let buffer: number[] = [];

  rawData.split('\n').forEach(value => {
    if(value !=="") {
      buffer.push(parseInt(value))
    }
    else {
      parsedData.push(buffer);
      buffer = [];
    }
  })

  const sortedTotalCalories = getSortedTotalCalories(parsedData);

  console.log(getMaxCalories(sortedTotalCalories))
  console.log(getTop3TotalCalories(sortedTotalCalories))
}) 