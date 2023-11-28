import { PDFExtractPage } from 'pdf.js-extract';

import groupWordsByRows from '@/actions/group-words-by-row';
import { BillSuma, Suma } from '@/lib/types';
import {
  firstLineSumaRegex,
  secondLineSumaRegex,
  thirdLineSumaRegex,
} from '@/lib/regex';

const extractBillSuma = (pages: PDFExtractPage[]) => {
  const allWords = pages.reduce((prev, currPage) => {
    const words = groupWordsByRows(currPage.content);

    return prev.concat(words);
  }, [] as string[]);

  // state of the suma step lines
  let sumaStepLine = 0;
  let suma: Suma = {
    sumaNetaTotala: null,
    tvaCota: null,
    valoareFaraTva1: null,
    valoareFaraTva2: null,
    sumaDePlata: null,
    currency: null,
  };

  const details = allWords.reduce(
    (prev, curr) => {
      // logic for suma step lines
      if (sumaStepLine === 3) {
        const matchThirdLine = curr.match(thirdLineSumaRegex);

        if (matchThirdLine?.length) {
          suma.sumaDePlata =
            matchThirdLine[1]?.replace(/-\s*(\d+)/, '-$1')?.trim() || null;
          suma.currency = matchThirdLine[3]?.trim() || null;
        }

        // push object and reset values
        prev.sume.push({ ...suma });
        for (const property in suma) {
          if (suma.hasOwnProperty(property)) {
            suma[property as keyof Suma] = null;
          }
        }

        sumaStepLine = 0;
      }

      // logic for suma step lines
      if (sumaStepLine === 2) {
        const matchSecondLine = curr.match(secondLineSumaRegex);

        if (matchSecondLine?.length) {
          suma.tvaCota = matchSecondLine[1]?.trim() + '%' || null;
          suma.valoareFaraTva1 =
            matchSecondLine[3]?.replace(/-\s*(\d+)/, '-$1')?.trim() || null;
          suma.valoareFaraTva2 =
            matchSecondLine[5]?.replace(/-\s*(\d+)/, '-$1')?.trim() || null;
        }

        sumaStepLine = 3;
      }

      // logic for suma step lines
      if (curr.match(firstLineSumaRegex)?.length) {
        // this means line is at step 1

        const matchFirstLine = curr.match(firstLineSumaRegex);

        if (matchFirstLine?.length) {
          suma.sumaNetaTotala =
            matchFirstLine[1]?.replace(/-\s*(\d+)/, '-$1')?.trim() || null;
        }

        sumaStepLine = 2;
      }

      return prev;
    },
    {
      sume: [],
    } as BillSuma
  );

  return details;
};

export default extractBillSuma;
