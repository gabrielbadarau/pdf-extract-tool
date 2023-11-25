import { PDFExtractText } from 'pdf.js-extract';

interface groupedRows {
  [key: string]: PDFExtractText[];
}

const groupWordsByRows = (words: PDFExtractText[]) => {
  const groupedRows: groupedRows = {};

  // Sort words in a row based on their Y position first
  words.sort((a, b) => a.y - b.y);

  // Group words by height position (y)
  words.forEach((word) => {
    const rowKey = word.y;

    if (!groupedRows[rowKey]) {
      groupedRows[rowKey] = [];
    }

    groupedRows[rowKey].push(word);
  });

  // Convert grouped rows to an array of strings
  const result = Object.values(groupedRows).map((rowWords) => {
    // Sort words in a row based on their X position
    rowWords.sort((a, b) => a.x - b.x);

    return rowWords.map((rowWord) => rowWord.str).join('');
  });

  return result;
};

export default groupWordsByRows;
