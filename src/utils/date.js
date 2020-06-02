import { format as formatDateFns, parseISO } from "date-fns";

export function parse(dateString) {
  return parseISO(dateString);
}

export function format(date) {
  return formatDateFns(date, "dd/MM/yyyy");
}
