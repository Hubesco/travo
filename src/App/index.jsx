import "react-datepicker/dist/react-datepicker.css";

import React, { useState } from "react";

import AddVoucher from "../components/AddVoucher";
import Vouchers from "../components/Vouchers";
import { StyledApp, StyledSection } from "./styles";

function App() {
  const [page, setPage] = useState("pageVouchers");

  function goToPageAddVoucher() {
    setPage("pageAddVoucher");
  }

  function goToPageVouchers() {
    setPage("pageVouchers");
  }

  return (
    <StyledApp>
      <header>Travo</header>
      {page === "pageVouchers" && (
        <StyledSection>
          <Vouchers />
          <button onClick={goToPageAddVoucher} data-testid="add-voucher-button">
            Add voucher
          </button>
        </StyledSection>
      )}
      {page === "pageAddVoucher" && (
        <StyledSection>
          <AddVoucher />
          <button
            onClick={goToPageVouchers}
            data-testid="cancel-add-voucher-button"
          >
            Cancel
          </button>
        </StyledSection>
      )}
      <StyledSection></StyledSection>
    </StyledApp>
  );
}

export default App;
