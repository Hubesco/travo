import "react-datepicker/dist/react-datepicker.css";

import React from "react";

import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";

import AddVoucher from "../components/AddVoucher";
import Vouchers from "../components/Vouchers";
import useStyles from "./styles";

function App({ page, goToPageAddVoucher, goToPageVouchers }) {
  const classes = useStyles();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Travo
          </Typography>
          <Button
            color="inherit"
            onClick={goToPageAddVoucher}
            data-testid="add-voucher-button"
          >
            Add voucher
          </Button>
        </Toolbar>
      </AppBar>
      {page === "pageVouchers" && (
        <>
          <Vouchers />
        </>
      )}
      {page === "pageAddVoucher" && (
        <>
          <AddVoucher goToPageVouchers={goToPageVouchers} />
          <Button
            onClick={goToPageVouchers}
            data-testid="cancel-add-voucher-button"
          >
            Cancel
          </Button>
        </>
      )}
    </Box>
  );
}

export default App;
