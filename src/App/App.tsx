import React from "react";

import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";

import AddVoucher from "../components/AddVoucher";
import Vouchers from "../components/Vouchers";
import useStyles from "./styles";

interface AppProps {
  page: string;
  goToPageVouchers: () => void;
  goToPageAddVoucher: () => void;
}

function App({ page, goToPageAddVoucher, goToPageVouchers }: AppProps) {
  const classes = useStyles();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Travo
          </Typography>
          {page !== "pageAddVoucher" && (
            <Button
              color="inherit"
              onClick={() => goToPageAddVoucher()}
              data-testid="add-voucher-button"
            >
              Add voucher
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {page === "pageVouchers" && (
        <>
          <Vouchers />
        </>
      )}
      {page === "pageAddVoucher" && (
        <AddVoucher goToPageVouchers={goToPageVouchers} />
      )}
    </Box>
  );
}

export default App;
