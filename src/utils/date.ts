import { format as formatDateFns, parse as parseDateFns } from "date-fns";

export function parse(dateString: string, format = "dd/MM/yyy") {
  return parseDateFns(format, dateString, new Date());
}

export function format(date: Date, format = "dd/MM/yyyy") {
  return formatDateFns(date, format);
}

export function toDate(timestamp: number) {
  return new Date(timestamp);
}
