import { PDFExtractPage, PDFExtractText } from 'pdf.js-extract';

import groupWordsByRows from '@/actions/group-words-by-row';
import { BillLine } from '@/lib/types';
import {
  findStartOfSumaRegex,
  firstLineRegex,
  secondLineRegex,
  thirdLineRegex,
} from '@/lib/regex';

const extractBillLines = (pages: PDFExtractPage[]) => {
  const allLines = pages.reduce((finalArray, curentPage) => {
    const words = groupWordsByRows(curentPage.content);

    // state of the line
    let lineStep = 0;
    let line: BillLine = {
      linePosition: null,
      lineId: null,
      lineDescription: null,
      lineQuantity: null,
      lineUM: null,
      lineClientId: null,
      linePrice: null,
      lineValue: null,
      lineCurrency: null,
      lineOriginCountry: null,
      lineVamalCode: null,
      lineAdditionalInfo: null,
    };

    const details = words.reduce((prev, curr) => {
      if (lineStep >= 4) {
        // we check to see if we have a new begining of line => no more additional info
        if (curr.match(firstLineRegex)?.length) {
          // push object and reset values after, the code will execute at step 1 later in the code
          prev.push({ ...line });
          for (const property in line) {
            if (line.hasOwnProperty(property)) {
              line[property as keyof BillLine] = null;
            }
          }
        } else if (
          // we check to see if it's the end of line => set lineStep to zero
          curr.match(findStartOfSumaRegex)?.length ||
          curr.toLowerCase().includes('furnizor')
        ) {
          {
            lineStep = 0;

            // push object and reset values after
            prev.push({ ...line });
            for (const property in line) {
              if (line.hasOwnProperty(property)) {
                line[property as keyof BillLine] = null;
              }
            }
          }
        } else {
          // additionalInfo continues on next line
          if (line.lineAdditionalInfo) {
            line.lineAdditionalInfo = line.lineAdditionalInfo + ' ' + curr;
          } else {
            line.lineAdditionalInfo = curr;
          }

          lineStep++;
        }
      }

      if (lineStep === 3) {
        const matchThirdLine = curr.match(thirdLineRegex);

        lineStep = 4;

        if (matchThirdLine?.length) {
          // normal flow
          line.lineOriginCountry = matchThirdLine[1]?.trim() || null;
          line.lineVamalCode = matchThirdLine[2]?.trim() || null;
        } else if (
          // safety for when the lineStep 3 is missing entirely but possibly starts additional info right away or a first line
          // if that's the case then we have additional
          // if not, we save the line into the array and set the right step
          !curr.match(findStartOfSumaRegex)?.length ||
          !curr.toLowerCase().includes('furnizor') ||
          !curr.match(firstLineRegex)
        ) {
          if (line.lineAdditionalInfo) {
            line.lineAdditionalInfo = line.lineAdditionalInfo + ' ' + curr;
          } else {
            line.lineAdditionalInfo = curr;
          }
        } else {
          // we are either at end of lines or at the beggining of a new one, so we save the current line
          // push object and reset values
          prev.push({ ...line });
          for (const property in line) {
            if (line.hasOwnProperty(property)) {
              line[property as keyof BillLine] = null;
            }
          }

          // now we see where we are so that we can setup the next line or not
          if (curr.match(findStartOfSumaRegex)?.length) {
            // this means we skipped directly to step one and we copy and paste what we do at step one
            const matchFirstLine = curr.match(firstLineRegex);

            if (matchFirstLine?.length) {
              line.linePosition = matchFirstLine[1]?.trim() || null;
              line.lineId = matchFirstLine[2]?.trim() || null;
              line.lineDescription = matchFirstLine[3]?.trim() || null;
              line.lineQuantity = matchFirstLine[4]?.trim() || null;
              line.lineUM = matchFirstLine[5]?.trim() || null;
            }

            lineStep = 2;
          } else {
            // we are the end of the lines
            lineStep = 0;
          }
        }
      }

      if (lineStep === 2) {
        const matchSecondLine = curr.match(secondLineRegex);

        if (matchSecondLine?.length) {
          line.lineClientId = matchSecondLine[1]?.trim() || null;
          line.linePrice = matchSecondLine[2]?.trim() || null;
          line.lineValue = matchSecondLine[4]?.trim() || null;
          line.lineCurrency = matchSecondLine[6]?.trim() || null;
        }

        lineStep = 3;
      }

      if (curr.match(firstLineRegex)?.length) {
        // this means line is at step 1

        const matchFirstLine = curr.match(firstLineRegex);

        if (matchFirstLine?.length) {
          line.linePosition = matchFirstLine[1]?.trim() || null;
          line.lineId = matchFirstLine[2]?.trim() || null;
          line.lineDescription = matchFirstLine[3]?.trim() || null;
          line.lineQuantity = matchFirstLine[4]?.trim() || null;
          line.lineUM = matchFirstLine[5]?.trim() || null;
        }

        lineStep = 2;
      }

      return prev;
    }, [] as BillLine[]);

    return finalArray.concat(details);
  }, [] as BillLine[]);

  return allLines;
};

export default extractBillLines;
