export interface PDFData {
  [key: string]: string | number;
}

export interface BillInfo {
  serieFactura?: string;
  numarFactura?: string;
  dataFactura?: string;
  moneda?: string;
  codCumparator?: string;
  cifFurnizor?: string;
  cifCumparator?: string;
  nrRegComCumparator?: string;
  stornareFacturaNr?: string;
}
