import { PDFExtractPage } from 'pdf.js-extract';

import groupWordsByRows from '@/actions/group-words-by-row';
import { BillExtraInfo, Country } from '@/lib/types';
import {
  complicatedTaraDeOrigineLineRegex,
  conditiiDeLivrare,
  currencySumaRegex,
  endDateOfPayRegex,
  findStartTaraDeOrigine,
  greutateBrutaRegex,
  greutateNetaRegex,
  simpleTaraDeOrigineLineRegex,
  volumRegex,
} from '@/lib/regex';

const extractBillExtraInfo = (pages: PDFExtractPage[]) => {
  const allWords = pages.reduce((prev, currPage) => {
    const words = groupWordsByRows(currPage.content);

    return prev.concat(words);
  }, [] as string[]);

  // state of the tara de origine lines
  let isTaraDeOrigineLines = false;
  let originCountry: Country = {
    adnotation: null,
    value: null,
  };

  const details = allWords.reduce(
    (prev, curr) => {
      // logic for tara de origine lines
      if (isTaraDeOrigineLines) {
        const matchComplicatedTaraDeOrigine = curr.match(
          complicatedTaraDeOrigineLineRegex
        );

        if (matchComplicatedTaraDeOrigine && matchComplicatedTaraDeOrigine[0]) {
          originCountry.adnotation = matchComplicatedTaraDeOrigine[1];
          originCountry.value = matchComplicatedTaraDeOrigine[2];

          // push and reset values
          prev.originCountries.push({ ...originCountry });
          for (const property in originCountry) {
            if (originCountry.hasOwnProperty(property)) {
              originCountry[property as keyof Country] = null;
            }
          }
        } else {
          const matchSimpleTaraDeOrigine = curr.match(
            simpleTaraDeOrigineLineRegex
          );


          if (matchSimpleTaraDeOrigine && matchSimpleTaraDeOrigine[0]) {
            console.log(curr)
            originCountry.adnotation = matchSimpleTaraDeOrigine[1];
            originCountry.value = matchSimpleTaraDeOrigine[2];

            // push and reset values
            prev.originCountries.push({ ...originCountry });
            for (const property in originCountry) {
              if (originCountry.hasOwnProperty(property)) {
                originCountry[property as keyof Country] = null;
              }
            }
          } else {
            isTaraDeOrigineLines = false;
          }
        }
      }

      // logic for tara de origine lines
      if (curr.match(findStartTaraDeOrigine)?.length) {
        // this means wes start tara de origine lines
        isTaraDeOrigineLines = true;
      }

      const matchCurrencyExchangeRate = curr.match(currencySumaRegex);
      if (matchCurrencyExchangeRate?.length) {
        prev.currencyExchangeRate = matchCurrencyExchangeRate[1].trim();
      }

      const matchGreutateBruta = curr.match(greutateBrutaRegex);
      if (matchGreutateBruta?.length) {
        prev.greutateBruta.value = matchGreutateBruta[1].trim();
        prev.greutateBruta.UM = matchGreutateBruta[3].trim();
      }

      const matchGreutateNeta = curr.match(greutateNetaRegex);
      if (matchGreutateNeta?.length) {
        prev.greutateNeta.value = matchGreutateNeta[1].trim();
        prev.greutateNeta.UM = matchGreutateNeta[3].trim();
      }

      const matchVolum = curr.match(volumRegex);
      if (matchVolum?.length) {
        prev.volum.value = matchVolum[1].trim();
        prev.volum.UM = matchVolum[3].trim();
      }

      const matchEndDateOfPay = curr.match(endDateOfPayRegex);
      if (matchEndDateOfPay?.length) {
        prev.endDateOfPay = matchEndDateOfPay[1].trim();
      }

      const matchShipmentConditions = curr.match(conditiiDeLivrare);
      if (matchShipmentConditions?.length) {
        prev.shipmentConditions = matchShipmentConditions[1].trim();
      }

      return prev;
    },
    {
      currencyExchangeRate: null,
      greutateBruta: {
        value: null,
        UM: null,
      },
      greutateNeta: {
        value: null,
        UM: null,
      },
      volum: {
        value: null,
        UM: null,
      },
      endDateOfPay: null,
      shipmentConditions: null,
      originCountries: [],
    } as BillExtraInfo
  );

  return details;
};

export default extractBillExtraInfo;
