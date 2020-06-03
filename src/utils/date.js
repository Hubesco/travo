import { format as formatDateFns, parseISO } from "date-fns";

export function parse(dateString) {
  return parseISO(dateString);
}

export function format(date, format = "dd/MM/yyyy") {
  return formatDateFns(date, format);
}
