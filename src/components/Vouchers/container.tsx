import React, { useEffect, useState } from "react";

import orderBy from "lodash/fp/orderBy";

import Voucher from "../../domain/voucher.type";
import storage, { STORAGE_KEYS } from "../../infrastructure/storage";
import type { Order, OrderBy } from "./types";
import Vouchers from "./Vouchers";

function VouchersContainer() {
  const [vouchers, setVouchers] = useState({});
  const [order, setOrder] = useState<Order>("asc");
  const [orderByProperty, setOrderByProperty] = useState<OrderBy>("expiryDate");

  useEffect(() => {
    const fetchVouchers = async () => {
      const item: any = await storage.get("vouchers");
      setVouchers(item.vouchers || {});
    };

    fetchVouchers();
  }, []);

  const sortedVouchers = orderBy([orderByProperty])([order])(vouchers) as Array<
    Voucher
  >;

  async function removeVoucher(voucherId: string) {
    const item: any = await storage.get(STORAGE_KEYS.VOUCHERS);
    const newVouchers = { ...item.vouchers };
    delete newVouchers[voucherId];
    await storage.set({ vouchers: newVouchers });
    setVouchers(newVouchers);
  }

  function onClickSort(property: OrderBy) {
    if (property === orderByProperty) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrder("asc");
      setOrderByProperty(property);
    }
  }

  return (
    <Vouchers
      onClickSort={onClickSort}
      removeVoucher={removeVoucher}
      vouchers={sortedVouchers}
    />
  );
}

export default VouchersContainer;
