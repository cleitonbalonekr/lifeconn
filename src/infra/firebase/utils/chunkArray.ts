export function chunkArray(inputArray: any[]) {
  const perChunk = 10; // items per chunk. firebase allow only 10 items to in operator

  const result = inputArray.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);

    if (!resultArray[chunkIndex]) {
      // eslint-disable-next-line no-param-reassign
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return result;
}
