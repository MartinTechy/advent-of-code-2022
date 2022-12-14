import fs from 'fs/promises';

function getItemPriority(item: string): number {

  const lowerCaseItem = item.toLowerCase();
  const itemPriority = (lowerCaseItem.codePointAt(0) ?? 96) - 96;

  return item === lowerCaseItem ? itemPriority : itemPriority + 26;
}

function getCommonItem(itemList1: string, itemList2: string, itemList3?: string): string {
  let commonItem = '';
  itemList1.split('').forEach(item => {
    if(itemList3) {
      if(itemList2.includes(item) && itemList3.includes(item)) {
        commonItem = item;
        return;
      }
    } else {
      if(itemList2.includes(item)) {
        commonItem = item;
        return;
      }
    }
  }
  );

  return commonItem;
}

// Part 1
fs.readFile('./input.txt').then((data: Buffer) => {
  const rawData = data.toString();


  console.log('step 1',rawData.split('\n').reduce((acc, value) => {
    const compartment1 = value.slice(0, value.length /2);
    const compartment2 = value.slice(value.length /2);

    return acc + getItemPriority(getCommonItem(compartment1, compartment2));   
  }, 0));

}); 

// Part 2
fs.readFile('./input.txt').then((data: Buffer) => {
  const rawData = data.toString();

  const rugsacksGroups: string[][] = new Array([]);

  rawData.split('\n').forEach((value, index) => {
    const groupIndex = Math.floor(index /3 );

    if(rugsacksGroups[groupIndex]){
      rugsacksGroups[groupIndex].push(value);
    } else {
      rugsacksGroups[groupIndex] = [value];
    }
  });

  console.log('step 2', rugsacksGroups.reduce((acc, rugsacks) => {
    return acc + getItemPriority(getCommonItem(rugsacks[0], rugsacks[1], rugsacks[2]));
  }, 0));

}); 