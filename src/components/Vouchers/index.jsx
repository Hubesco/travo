import React, { useEffect, useState } from "react";

import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import storage, { STORAGE_KEYS } from "../../infrastructure/storage";
import { format, parse } from "../../utils/date";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 320,
  },
});

function Vouchers() {
  const [vouchers, setVouchers] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const fetchVouchers = async () => {
      const item = await storage.get("vouchers");
      setVouchers(item.vouchers || {});
    };
    fetchVouchers();
  }, []);

  async function removeVoucher(voucherId) {
    const item = await storage.get(STORAGE_KEYS.VOUCHERS);
    const newVouchers = item.vouchers;
    delete newVouchers[voucherId];
    await storage.set({ vouchers: newVouchers });
    setVouchers(newVouchers);
  }

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
              <TableCell>{v.code}</TableCell>
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
