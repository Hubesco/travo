import React, { ChangeEvent, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import Voucher from "../../domain/voucher.type";
import storage, { STORAGE_KEYS } from "../../infrastructure/storage";
import { parse } from "../../utils/date";
import AddVoucher from "./AddVoucher";

interface AddVoucherContainerProps {
  goToPageVouchers: () => void;
}

function AddVoucherContainer({ goToPageVouchers }: AddVoucherContainerProps) {
  const onSubmit = async ({ company, expiryDate, code }: any) => {
    const voucher: Voucher = {
      id: uuidv4(),
      company,
      expiryDate: expiryDate.getTime(),
      code,
    };
    const item: any = await storage.get(STORAGE_KEYS.VOUCHERS);
    const newVouchers = { ...item.vouchers };
    newVouchers[voucher.id] = voucher;
    await storage.set({ vouchers: newVouchers });
    goToPageVouchers();
  };

  return <AddVoucher goToPageVouchers={goToPageVouchers} onSubmit={onSubmit} />;
}

export default AddVoucherContainer;
