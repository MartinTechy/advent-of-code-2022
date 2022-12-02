import fs from 'fs/promises';


function getShapeValue(shape: string): string {
  switch(shape){
  case 'A':
  case 'X':
    return 'R';
  case 'B':
  case 'Y':
    return 'P';

  case 'C':
  case 'Z':
    return 'S';

  default:
    return '';
  }
}

function getOwnShapeByOutcome(opponentShape: string, outcome: string) : string  {
  if(opponentShape === 'R') {
    if(outcome === 'X') return 'S';
    if(outcome === 'Y') return 'R';
    if(outcome === 'Z') return 'P';

  } else if(opponentShape === 'P') {
    if(outcome === 'X') return 'R';
    if(outcome === 'Y') return 'P';
    if(outcome === 'Z') return 'S';
  } else if (opponentShape ==='S') {
    if(outcome === 'X') return 'P';
    if(outcome === 'Y') return 'S';
    if(outcome === 'Z') return 'R';
  }

  return '';
}

function getShapeScore(shape: string): number {
  switch(shape) {
  case 'R':
    return 1;
  case 'P':
    return 2;
  case 'S':
    return 3;
  default: 
    return 0;
  }
}

function getResultScore(opponentShape: string, ownShape: string ): number {

  // Draw
  if(opponentShape === ownShape) return 3;

  // Win
  else if((opponentShape === 'R' && ownShape === 'P') || (opponentShape === 'P' && ownShape === 'S') || (opponentShape === 'S' && ownShape === 'R')) return 6;

  // Loose 
  else  if((opponentShape === 'S' && ownShape === 'P') || (opponentShape === 'R' && ownShape === 'S') || (opponentShape === 'P' && ownShape === 'R')) return 0;

  return 0;
}


// Part 1
fs.readFile('./input.txt').then((data: Buffer) => {
  const rawData = data.toString();


  console.log( rawData.split('\n').reduce((acc, value) => {
    const shapes = value.split(' ');

    const opponentShape = shapes[0];
    const ownShape = shapes[1];

    if(opponentShape && ownShape) {

      const opponentShapeValue = getShapeValue(opponentShape);
      const ownShapeValue = getShapeValue(ownShape);

      const shapeScore = getShapeScore(ownShapeValue);
      const resultScore = getResultScore(opponentShapeValue, ownShapeValue);
  
      return acc + shapeScore + resultScore;
    }

    return acc;
  }, 0));

}); 

// Part 2
fs.readFile('./input.txt').then((data: Buffer) => {
  const rawData = data.toString();


  console.log( rawData.split('\n').reduce((acc, value) => {
    const shapes = value.split(' ');

    const opponentShape = shapes[0];
    const outcome = shapes[1];

    if(opponentShape && outcome) {

      const opponentShapeValue = getShapeValue(opponentShape);
      
      const ownShapeValue = getOwnShapeByOutcome(opponentShapeValue, outcome);
      const shapeScore = getShapeScore(ownShapeValue);
      const resultScore = getResultScore(opponentShapeValue, ownShapeValue);
  
      return acc + shapeScore + resultScore;
    }

    return acc;
  }, 0));

}); 
