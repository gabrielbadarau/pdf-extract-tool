// Bill Info
export const serieFacturaRegex = /Serie\s*:?\s*([A-Za-z0-9]+)/;
export const numarFacturaRegex = /Numar\s*Factura\s*:?\s*(\d+)/;
export const dataFacturaRegex = /Data\s*Factura\s*:?\s*(\d{2}\.\d{2}\.\d{4})/;
export const monedaRegex = /Moneda\s*:?\s*([A-Z]+)/;
export const codCumparatorRegex = /Cod\s*Cumparator\s*:?\s*(\d+)/;
export const cifFurnizorRegex =
  /C\s*.?\s*I.?\s*F.?\s*Furnizor:?\s*([A-Z]+(\d+))/;
export const cifCumparatorRegex =
  /C\s*.?\s*I.?\s*F.?\s*Cumparator:?\s*([A-Z]+(\d+))/;
export const nrRegComCumparatorRegex =
  /Nr\s*.?\s*Reg\s*.?\s*Com\s*.?\s*Cumparator\s*:?\s*(([A-Z0-9]+)(\/[A-Z0-9]+)+)/;
export const stornareFacturaNrRegex =
  /Stornare\s*factura\s*nr\s*.?\s*:?\s*(\d+)/;

// Bill referinta
export const referintaLineRegex =
  /^([^.]+)\s?(\d{2}\.\d{2}\.\d{4})\s?([^.]+)\s?(\d{2}\.\d{2}\.\d{4})?$/;

// Bill lines
export const firstLineRegex = /^(\d{6})\s+(\S+)\s+(.+)\s+(\d+)\s+([A-Z]{2})$/;
export const secondLineRegex =
  /^(.+\d?\s)?(-?\d+(\.\d+)?,\d+)\s+(-?\d+(\.\d+)?,\d+)\s+([A-Z]{3})$/;
export const thirdLineRegex = /^([A-Z]{2})\s+(\d+)$/;

// Bill suma
export const firstLineSumaRegex = /^Suma neta totala\s?(-?\d+(\.\d+)?,\d+)$/;
export const secondLineSumaRegex =
  /^TVA Cota:\s?(-?\d+(\.\d+)?,\d+\s?%)\s?Valoare fara TVA:\s?(-?\d+(\.\d+)?,\d+)\s?(-?\d+(\.\d+)?,\d+)$/;
export const thirdLineSumaRegex =
  /^Suma de plata\s?(-?\d+(\.\d+)?,\d+)\s?([A-Z]{3})$/;

// Other bill suma related fields
export const greutateBrutaRegex =
  /Greutate bruta\s*:?\s*(\d+(\.\d+)?,\d+)\s*([A-Z]{2})/;
export const greutateNetaRegex =
  /Greutate neta\s*:?\s*(\d+(\.\d+)?,\d+)\s*([A-Z]{2})/;
export const volumRegex = /Volum\s*:?\s*(\d+(\.\d+)?(\.\d+)?,\d+)\s*(.+)/;
export const endDateOfPay =
  /Conditii\s*de\s*plata\s*:?\s*Pâna\s*la\s*?(\d{2}\.\d{2}\.\d{4})/;
export const conditiiDeLivrare = /Conditii\s*de\s*livrare\s*:?\s*(.+)/;
export const complicatedTaraDeOrigineLineRegex =
  /([A-Z]*)\s*([A-Za-z ]*)\s*(Greutate|Volum)(.+)?/;
export const simpleTaraDeOrigineLineRegex = /([A-Z]*)\s*([A-Za-z ]*)\s*/;
