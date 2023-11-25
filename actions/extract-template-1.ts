import { PDFExtractResult } from 'pdf.js-extract';

import { extractBillInfo } from '@/actions/extract-bill-info';
import groupWordsByRows from '@/actions/group-words-by-row';

const extractTemplate1 = (pdf: PDFExtractResult) => {
  const pages = pdf.pages;

  const billInfo = extractBillInfo(pages[0].content);

  // const words = groupWordsByRows(pages[3].content);

  return billInfo;
};

export default extractTemplate1;
