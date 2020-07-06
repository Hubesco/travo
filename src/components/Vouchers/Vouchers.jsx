import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { format, parse } from "../../utils/date";
import useStyles from "./styles";

function Vouchers({ vouchers, setVouchers, removeVoucher }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Expiry Date</TableCell>
            <TableCell>Code</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(vouchers).length === 0 && (
            <TableRow>
              <TableCell colSpan="3">No vouchers :'(</TableCell>
            </TableRow>
          )}
          {Object.values(vouchers).map((v, index) => (
            <TableRow key={index}>
              <TableCell>{v.company}</TableCell>
              <TableCell>{format(parse(v.expiryDate))}</TableCell>
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
                <button onClick={() => removeVoucher(v.id)}>Remove</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Vouchers;