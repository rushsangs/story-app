
export function array_replace(array, index, item) {
    const newArray = [...array];
    newArray[index] = item;
    return newArray;
  }