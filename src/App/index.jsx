import "react-datepicker/dist/react-datepicker.css";

import React, { useEffect, useState } from "react";

import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AddVoucher from "../components/AddVoucher";
import Vouchers from "../components/Vouchers";
import storage, { STORAGE_KEYS } from "../infrastructure/storage";
import { StyledSection } from "./styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [page, setPage] = useState("pageVouchers");
  const classes = useStyles();

  useEffect(() => {
    const initStorage = async () => {
      const item = await storage.get(STORAGE_KEYS.VOUCHERS);
      if (!item.vouchers) {
        await storage.set({ vouchers: {} });
      }
    };
    initStorage();
  }, []);

  function goToPageAddVoucher() {
    setPage("pageAddVoucher");
  }

  function goToPageVouchers() {
    setPage("pageVouchers");
  }

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
      <StyledSection></StyledSection>
    </Box>
  );
}

export default App;
