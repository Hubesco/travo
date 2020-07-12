import React, { useEffect, useState } from "react";

import storage, { STORAGE_KEYS } from "../infrastructure/storage";
import App from "./App";

function AppContainer() {
  const [page, setPage] = useState("pageVouchers");

  useEffect(() => {
    const initStorage = async () => {
      const item: any = await storage.get(STORAGE_KEYS.VOUCHERS);
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
    <App
      page={page}
      goToPageVouchers={goToPageVouchers}
      goToPageAddVoucher={goToPageAddVoucher}
    />
  );
}

export default AppContainer;
