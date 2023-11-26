import { PDFExtractPage, PDFExtractText } from 'pdf.js-extract';

import groupWordsByRows from '@/actions/group-words-by-row';
import { BillLine } from '@/lib/types';
import { firstLineRegex, secondLineRegex, thirdLineRegex } from '@/lib/regex';

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
          lineStep = 1;
          // push object and reset values after
          prev.push({ ...line });
          for (const property in line) {
            if (line.hasOwnProperty(property)) {
              line[property as keyof BillLine] = null;
            }
          }
        } else if (
          // we check to see if it's the end of line => set lineStep to zero
          curr.toLowerCase().includes('suma neta') ||
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
            line.lineAdditionalInfo = line.lineAdditionalInfo + curr;
          } else {
            line.lineAdditionalInfo = curr;
          }

          lineStep++;
        }
      }

      if (lineStep === 3) {
        const matchThirdLine = curr.match(thirdLineRegex);

        if (matchThirdLine?.length) {
          line.lineOriginCountry = matchThirdLine[1]?.trim() || null;
          line.lineVamalCode = matchThirdLine[2]?.trim() || null;
        }

        lineStep = 4;
      }

      if (lineStep === 2) {
        const matchSecondLine = curr.match(secondLineRegex);

        if (matchSecondLine?.length) {
          line.linePrice = matchSecondLine[1]?.trim() || null;
          line.lineValue = matchSecondLine[3]?.trim() || null;
          line.lineCurrency = matchSecondLine[5]?.trim() || null;
        }

        lineStep = 3;
      }

      if (curr.match(firstLineRegex)?.length) {
        // this means lineStep is at 1
        lineStep = 1;

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
