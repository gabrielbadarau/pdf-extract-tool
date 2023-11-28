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
export const findBeginingOfReferintaRegex =
  /Referinta\s*furnizor\s*Din\s*data\s*:?\s*Referinta\s*client\s*Din\s*data\s*:?/;
export const referintaLineRegex =
  /^(\d+)\s+(\d{2}\.\d{2}\.\d{4})?\s?([^.]+)\s?(\d{2}\.\d{2}\.\d{4})?$/;
export const endReferintaRegex =
  /(Poz.doc.)?\s*(Cod\s*material\/serviciu)?\s*(Descriere\s*material\s*sau\s*serviciu)?\s*(Cant.)?\s*(UM)?/;

// Bill lines
export const firstLineRegex =
  /^(\d{6})\s+([A-Z_.0-9]+)\s+(.+)\s+(\d+)\s+([A-Z]+)$/;
export const secondLineRegex =
  /^([A-Z0-9][^,. ]+)?\s?(-?\d+(\.\d+)*,\d+)\s+(-?\d+(\.\d+)*,\d+)\s+([A-Z]+)$/;
export const thirdLineRegex = /^([A-Z]+)?\s+(\d+)?$/;
export const findStartOfSumaRegex = /Suma\s*neta\s*totala/;

// Bill suma
export const firstLineSumaRegex =
  /Suma\s*neta\s*totala\s*(-?\s*\d+(\.\d+)*,\d+)/;
export const secondLineSumaRegex =
  /TVA\s*Cota\s*:?\s*(\d+(\.\d+)*,\d+)\s*%\s*Valoare\s*fara\s*TVA\s*:?\s*(-?\s*\d+(\.\d+)*,\d+)\s*(-?\s*\d+(\.\d+)*,\d+)/;
export const thirdLineSumaRegex =
  /Suma\s*de\s*plata\s*:?(-?\s*\d+(\.\d+)*,\d+)\s*([A-Z]+)/;

// Other bill suma related fields
export const greutateBrutaRegex =
  /Greutate\s*bruta\s*:?\s*(\d+(\.\d+)*,\d+)\s*([A-Z]+)/;
export const greutateNetaRegex =
  /Greutate\s*neta\s*:?\s*(\d+(\.\d+)*,\d+)\s*([A-Z]+)/;
export const volumRegex = /Volum\s*:?\s*(\d+(\.\d+)*,\d+)\s*([A-Z0-9]+)/;
export const endDateOfPayRegex =
  /Conditii\s*de\s*plata\s*:?\s*Până\s*la\s*(\d{2}\.\d{2}\.\d{4})/;
export const conditiiDeLivrare = /Conditii\s*de\s*livrare\s*:?\s*(.+)/;
export const complicatedTaraDeOrigineLineRegex =
  /([A-Z]+)\s*([A-Za-z ]+)\s*(Greutate|Volum)(.+)?/;
export const simpleTaraDeOrigineLineRegex = /([A-Z]+)\s*([A-Za-z ]+)/;
