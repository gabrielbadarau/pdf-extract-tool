const filterWords = (words: string[], filterArray: string[]) => {
  const filteredArray = words.filter(
    (str) => !filterArray.some((sub) => str.includes(sub))
  );

  return filteredArray;
};

export default filterWords;
