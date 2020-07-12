import { format as formatDateFns, parse as parseDateFns } from "date-fns";

export function parse(dateString: string, pattern = "dd/MM/yyy") {
  return parseDateFns(pattern, dateString, new Date());
}

export function format(date: Date, pattern = "dd/MM/yyyy") {
  return formatDateFns(date, pattern);
}

export function toDate(timestamp: number) {
  return new Date(timestamp);
}
