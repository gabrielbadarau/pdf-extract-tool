export interface PDFData {
  [key: string]: string | number;
}

export interface BillInfo {
  serieFactura: string | null;
  numarFactura: string | null;
  dataFactura: string | null;
  moneda: string | null;
  codCumparator: string | null;
  cifFurnizor: string | null;
  cifCumparator: string | null;
  nrRegComCumparator: string | null;
  stornareFacturaNr: string | null;
}

export interface BillReferinta {
  referintaFurnizor: string | null;
  referintaFurnizorDinData: string | null;
  referintaClient: string | null;
  referintaClientDinData: string | null;
  referintaAdditionalInfo: string | null;
}

export interface BillLine {
  linePosition: string | null;
  lineId: string | null;
  lineClientId: string | null;
  lineDescription: string | null;
  lineQuantity: string | null;
  lineUM: string | null;
  linePrice: string | null;
  lineValue: string | null;
  lineCurrency: string | null;
  lineOriginCountry: string | null;
  lineVamalCode: string | null;
  lineAdditionalInfo: string | null;
}

export interface BillSuma {
  sume: Suma[];
}

export interface Suma {
  sumaNetaTotala: string | null;
  tvaCota: string | null;
  valoareFaraTva1: string | null;
  valoareFaraTva2: string | null;
  sumaDePlata: string | null;
  currency: string | null;
}

export interface BillExtraInfo {
  currencyExchangeRate: string | null;
  greutateBruta: {
    value: string | null;
    UM: string | null;
  };
  greutateNeta: {
    value: string | null;
    UM: string | null;
  };
  volum: {
    value: string | null;
    UM: string | null;
  };
  endDateOfPay: string | null;
  shipmentConditions: string | null;
  originCountries: Country[];
}

export interface Country {
  adnotation: string | null;
  value: string | null;
}
