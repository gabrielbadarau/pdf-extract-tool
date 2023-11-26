// Bill Info
export const serieFacturaRegex = /^Serie:\s?(.+)$/;
export const numarFacturaRegex = /^Numar Factura:\s?(\d+)$/;
export const dataFacturaRegex = /^Data Factura:\s?(\d{2}\.\d{2}\.\d{4})$/;
export const monedaRegex = /^Moneda:\s?([A-Z]+)$/;
export const codCumparatorRegex = /^Cod Cumparator:\s?(\d+)$/;
export const cifFurnizorRegex = /^C.?I.?F.? Furnizor:\s?([A-Z]+(\d+))$/;
export const cifCumparatorRegex = /^C.?I.?F.? Cumparator:\s?([A-Z]+(\d+))$/;
export const nrRegComCumparatorRegex =
  /^Nr.Reg.Com.Cumparator:\s?(.+\/.+\/.+)$/;
export const stornareFacturaNrRegex = /^Stornare factura nr.:\s?(\d+)$/;

// Bill referinta
export const referintaLineRegex =
  /^([^.]+)\s?(\d{2}\.\d{2}\.\d{4})\s?([^.]+)\s?(\d{2}\.\d{2}\.\d{4})?$/;

// Bill lines
export const firstLineRegex = /^(\d{6})\s+(\S+)\s+(.+)\s+(\d+)\s+([A-Z]{2})$/;
export const secondLineRegex =
  /^(-?\d+(\.\d+)?,\d+)\s+(-?\d+(\.\d+)?,\d+)\s+([A-Z]{3})$/;
export const thirdLineRegex = /^([A-Z]{2})\s+(\d+)$/;

// Bill suma
