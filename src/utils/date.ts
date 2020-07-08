import { format as formatDateFns, parseISO } from "date-fns";

export function parse(dateString: string) {
  return parseISO(dateString);
}

export function format(date: Date, format = "dd/MM/yyyy") {
  return formatDateFns(date, format);
}
