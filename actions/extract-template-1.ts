import { PDFExtractResult } from 'pdf.js-extract';

import { extractBillInfo } from '@/actions/extract-bill-info';
import groupWordsByRows from '@/actions/group-words-by-row';
import extractBillReferinta from '@/actions/extract-bill-referinta';
import extractBillLines from '@/actions//extract-bill-lines';
import extractBillSuma from '@/actions/extract-bill-suma';
import extractBillExtraInfo from './extract-bill-extra-info';

const extractTemplate1 = (pdf: PDFExtractResult) => {
  const pages = pdf.pages;

  const billInfo = extractBillInfo(pages[0].content);
  const billReferinta = extractBillReferinta(pages[0].content);
  const billLines = extractBillLines(pages);
  const sume = extractBillSuma(pages);
  const extraInfo = extractBillExtraInfo(pages);
  const words = groupWordsByRows(pages[0].content);

  return extraInfo;
};

export default extractTemplate1;
