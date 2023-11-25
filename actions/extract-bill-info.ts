import { PDFExtractText } from 'pdf.js-extract';

import groupWordsByRows from '@/actions/group-words-by-row';
import {
  cifCumparatorRegex,
  cifFurnizorRegex,
  codCumparatorRegex,
  dataFacturaRegex,
  monedaRegex,
  nrRegComCumparatorRegex,
  numarFacturaRegex,
  serieFacturaRegex,
  stornareFacturaNrRegex,
} from '@/lib/regex';
import { BillInfo } from '@/lib/types';

export const extractBillInfo = (data: PDFExtractText[]) => {
  const words = groupWordsByRows(data);

  const details = words.reduce((prev, curr) => {
    const matchSerieFactura = curr.match(serieFacturaRegex);
    if (matchSerieFactura?.length) {
      prev.serieFactura = matchSerieFactura[1];
      return prev;
    }

    const matchNumarFactura = curr.match(numarFacturaRegex);
    if (matchNumarFactura?.length) {
      prev.numarFactura = matchNumarFactura[1];
      return prev;
    }

    const matchDataFactura = curr.match(dataFacturaRegex);
    if (matchDataFactura?.length) {
      prev.dataFactura = matchDataFactura[1];
      return prev;
    }

    const matchMoneda = curr.match(monedaRegex);
    if (matchMoneda?.length) {
      prev.moneda = matchMoneda[1];
      return prev;
    }

    const matchCodCumparator = curr.match(codCumparatorRegex);
    if (matchCodCumparator?.length) {
      prev.codCumparator = matchCodCumparator[1];
      return prev;
    }

    const matchCifFurnizor = curr.match(cifFurnizorRegex);
    if (matchCifFurnizor?.length) {
      prev.cifFurnizor = matchCifFurnizor[1];
      return prev;
    }

    const matchCifCumparator = curr.match(cifCumparatorRegex);
    if (matchCifCumparator?.length) {
      prev.cifCumparator = matchCifCumparator[1];
      return prev;
    }

    const matchNrRegComCumparator = curr.match(nrRegComCumparatorRegex);
    if (matchNrRegComCumparator?.length) {
      prev.nrRegComCumparator = matchNrRegComCumparator[1];
      return prev;
    }

    const matchStornareFacturaNr = curr.match(stornareFacturaNrRegex);
    if (matchStornareFacturaNr?.length) {
      prev.stornareFacturaNr = matchStornareFacturaNr[1];
      return prev;
    }

    return prev;
  }, {} as BillInfo);

  return details;
};
