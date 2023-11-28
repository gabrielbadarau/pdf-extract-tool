import { PDFExtractText } from 'pdf.js-extract';

import groupWordsByRows from '@/actions/group-words-by-row';
import { BillReferinta } from '@/lib/types';
import {
  endReferintaRegex,
  findBeginingOfReferintaRegex,
  referintaLineRegex,
} from '@/lib/regex';

const extractBillReferinta = (data: PDFExtractText[]) => {
  const words = groupWordsByRows(data);

  // state of the referinta
  let isReferintaLineStep = 0;

  const details = words.reduce(
    (prev, curr) => {
      if (isReferintaLineStep >= 2) {
        console.log(curr);
        // we check to see if there is additional info after referinta and not started the table lines
        if (
          curr.match(endReferintaRegex) &&
          curr.match(endReferintaRegex)?.[0]
        ) {
          console.log(curr.match(endReferintaRegex))
          isReferintaLineStep = 0;
        } else {
          // console.log(curr)
          if (prev.referintaAdditionalInfo) {
            prev.referintaAdditionalInfo =
              prev.referintaAdditionalInfo + ' ' + curr;
          } else {
            prev.referintaAdditionalInfo = curr;
          }

          isReferintaLineStep++;
        }
      }

      if (isReferintaLineStep === 1) {
        const matchReferintaLine = curr.match(referintaLineRegex);

        if (matchReferintaLine?.length) {
          prev.referintaFurnizor = matchReferintaLine[1]?.trim() || null;
          prev.referintaFurnizorDinData = matchReferintaLine[2]?.trim() || null;
          prev.referintaClient = matchReferintaLine[3]?.trim() || null;
          prev.referintaClientDinData = matchReferintaLine[4]?.trim() || null;
        }

        isReferintaLineStep++;
      }

      if (curr.match(findBeginingOfReferintaRegex)?.length) {
        isReferintaLineStep = 1;
      }

      return prev;
    },
    {
      referintaFurnizor: null,
      referintaFurnizorDinData: null,
      referintaClient: null,
      referintaClientDinData: null,
      referintaAdditionalInfo: null,
    } as BillReferinta
  );

  return details;
};

export default extractBillReferinta;
