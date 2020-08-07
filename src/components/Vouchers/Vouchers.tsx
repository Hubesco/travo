import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Voucher from "../../domain/voucher.type";
import { format, toDate } from "../../utils/date";
import useStyles from "./styles";
import type { Order, OrderBy } from "./types";

interface VouchersProps {
  onClickSort: (property: OrderBy) => void;
  order: Order;
  orderBy: OrderBy;
  removeVoucher: (voucherId: string) => void;
  vouchers: Array<Voucher>;
}

function Vouchers({
  onClickSort,
  order,
  orderBy,
  removeVoucher,
  vouchers,
}: VouchersProps) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === "company" ? order : false}>
              <TableSortLabel
                active={orderBy === "company"}
                direction={orderBy === "company" ? order : "asc"}
                onClick={() => onClickSort("company")}
              >
                Company
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === "expiryDate" ? order : false}>
              <TableSortLabel
                active={orderBy === "expiryDate"}
                direction={orderBy === "expiryDate" ? order : "asc"}
                onClick={() => onClickSort("expiryDate")}
              >
                Expiry Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Code</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(vouchers).length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>No vouchers :&apos;(</TableCell>
            </TableRow>
          )}
          {Object.values(vouchers).map((v: Voucher) => (
            <TableRow key={v.id}>
              <TableCell>
                <div
                  data-testid="company"
                  style={{
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {v.company}
                </div>
              </TableCell>
              <TableCell data-testid="expiryDate">
                {format(toDate(v.expiryDate))}
              </TableCell>
              <TableCell>
                <div
                  style={{
                    maxWidth: "60px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v.code}
                </div>
              </TableCell>
              <TableCell>
                <button onClick={() => removeVoucher(v.id)} type="button">
                  Remove
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Vouchers;
