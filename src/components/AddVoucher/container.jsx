import React from "react";

import { v4 as uuidv4 } from "uuid";

import storage, { STORAGE_KEYS } from "../../infrastructure/storage";
import { format } from "../../utils/date";
import AddVoucher from "./AddVoucher";

function AddVoucherContainer({ goToPageVouchers }) {
  const onSubmit = async (voucher) => {
    voucher.id = uuidv4();
    voucher.expiryDate = format(voucher.expiryDate, "yyyy-MM-dd");
    const item = await storage.get(STORAGE_KEYS.VOUCHERS);
    const newVouchers = { ...item.vouchers };
    newVouchers[voucher.id] = voucher;
    await storage.set({ vouchers: newVouchers });
    goToPageVouchers();
  };

  return <AddVoucher onSubmit={onSubmit} goToPageVouchers={goToPageVouchers} />;
}

export default AddVoucherContainer;
