import { PDFExtractText } from 'pdf.js-extract';

import groupWordsByRows from '@/actions/group-words-by-row';
import { BillReferinta } from '@/lib/types';
import { findBeginingOfReferinta, referintaLineRegex } from '@/lib/regex';

const extractBillReferinta = (data: PDFExtractText[]) => {
  const words = groupWordsByRows(data);

  // state of the referinta
  let isReferintaLine = false;

  const details = words.reduce(
    (prev, curr) => {
      if (isReferintaLine) {
        const matchReferintaLine = curr.match(referintaLineRegex);

        if (matchReferintaLine?.length) {
          prev.referintaFurnizor = matchReferintaLine[1]?.trim() || null;
          prev.referintaFurnizorDinData = matchReferintaLine[2]?.trim() || null;
          prev.referintaClient = matchReferintaLine[3]?.trim() || null;
          prev.referintaClientDinData = matchReferintaLine[4]?.trim() || null;
        }

        isReferintaLine = false;
      }

      if (curr.match(findBeginingOfReferinta)?.length) {
        isReferintaLine = true;
      }

      return prev;
    },
    {
      referintaFurnizor: null,
      referintaFurnizorDinData: null,
      referintaClient: null,
      referintaClientDinData: null,
    } as BillReferinta
  );

  return details;
};

export default extractBillReferinta;
