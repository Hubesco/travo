import React from "react";

import { v4 as uuidv4 } from "uuid";

import Voucher from "../../domain/voucher.type";
import storage, { STORAGE_KEYS } from "../../infrastructure/storage";
import { format } from "../../utils/date";
import AddVoucher from "./AddVoucher";

interface AddVoucherContainerProps {
  goToPageVouchers: () => void;
}

function AddVoucherContainer({ goToPageVouchers }: AddVoucherContainerProps) {
  const onSubmit = async (voucher: Voucher) => {
    voucher.id = uuidv4();
    voucher.expiryDate = format(new Date(voucher.expiryDate), "yyyy-MM-dd");
    const item: any = await storage.get(STORAGE_KEYS.VOUCHERS);
    const newVouchers = { ...item.vouchers };
    newVouchers[voucher.id] = voucher;
    await storage.set({ vouchers: newVouchers });
    goToPageVouchers();
  };

  return <AddVoucher onSubmit={onSubmit} goToPageVouchers={goToPageVouchers} />;
}

export default AddVoucherContainer;
