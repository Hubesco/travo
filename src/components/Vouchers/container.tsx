import React, { useEffect, useState } from "react";

import storage, { STORAGE_KEYS } from "../../infrastructure/storage";
import Vouchers from "./Vouchers";

function VouchersContainer() {
  const [vouchers, setVouchers] = useState({});

  useEffect(() => {
    const fetchVouchers = async () => {
      const item: any = await storage.get("vouchers");
      setVouchers(item.vouchers || {});
    };
    fetchVouchers();
  }, []);

  async function removeVoucher(voucherId: string) {
    const item: any = await storage.get(STORAGE_KEYS.VOUCHERS);
    const newVouchers = { ...item.vouchers };
    delete newVouchers[voucherId];
    await storage.set({ vouchers: newVouchers });
    setVouchers(newVouchers);
  }

  return <Vouchers vouchers={vouchers} removeVoucher={removeVoucher} />;
}

export default VouchersContainer;
