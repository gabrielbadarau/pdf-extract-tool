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

  const details = words.reduce(
    (prev, curr) => {
      const matchSerieFactura = curr.match(serieFacturaRegex);
      if (matchSerieFactura?.length) {
        prev.serieFactura = matchSerieFactura[1].trim();
      }

      const matchNumarFactura = curr.match(numarFacturaRegex);
      if (matchNumarFactura?.length) {
        prev.numarFactura = matchNumarFactura[1].trim();
      }

      const matchDataFactura = curr.match(dataFacturaRegex);
      if (matchDataFactura?.length) {
        prev.dataFactura = matchDataFactura[1].trim();
      }

      const matchMoneda = curr.match(monedaRegex);
      if (matchMoneda?.length) {
        prev.moneda = matchMoneda[1].trim();
      }

      const matchCodCumparator = curr.match(codCumparatorRegex);
      if (matchCodCumparator?.length) {
        prev.codCumparator = matchCodCumparator[1].trim();
      }

      const matchCifFurnizor = curr.match(cifFurnizorRegex);
      if (matchCifFurnizor?.length) {
        prev.cifFurnizor = matchCifFurnizor[1].trim();
      }

      const matchCifCumparator = curr.match(cifCumparatorRegex);
      if (matchCifCumparator?.length) {
        prev.cifCumparator = matchCifCumparator[1].trim();
      }

      const matchNrRegComCumparator = curr.match(nrRegComCumparatorRegex);
      if (matchNrRegComCumparator?.length) {
        prev.nrRegComCumparator = matchNrRegComCumparator[1].trim();
      }

      const matchStornareFacturaNr = curr.match(stornareFacturaNrRegex);
      if (matchStornareFacturaNr?.length) {
        prev.stornareFacturaNr = matchStornareFacturaNr[1].trim();
      }

      return prev;
    },
    {
      serieFactura: null,
      numarFactura: null,
      dataFactura: null,
      moneda: null,
      codCumparator: null,
      cifFurnizor: null,
      cifCumparator: null,
      nrRegComCumparator: null,
      stornareFacturaNr: null,
    } as BillInfo
  );

  return details;
};
