import React, { useEffect, useState } from "react";

import Storage from "../../infrastructure/storage";
import { format, parse } from "../../utils/date";

function Vouchers() {
  const [vouchers, setVouchers] = useState({});

  useEffect(() => {
    const fetchVouchers = async () => {
      const item = await Storage.get("vouchers");
      setVouchers(item.vouchers || {});
    };
    fetchVouchers();
  }, []);

  async function removeVoucher(voucherId) {
    const item = await Storage.get("vouchers");
    const newVouchers = item.vouchers;
    delete newVouchers[voucherId];
    await Storage.set({ vouchers: newVouchers });
    setVouchers(newVouchers);
  }

  return (
    <div>
      <header>Your vouchers</header>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Expiry Date</th>
            <th>Code</th>
            <th></th>
          </tr>
        </thead>
        {Object.keys(vouchers).length === 0 && (
          <tbody>
            <tr>
              <td colSpan="3">No vouchers :'(</td>
            </tr>
          </tbody>
        )}
        {Object.keys(vouchers).length > 0 && (
          <tbody>
            {Object.values(vouchers).map((v, index) => (
              <tr key={index}>
                <td>{v.company}</td>
                <td>{format(parse(v.expiryDate))}</td>
                <td>{v.code}</td>
                <td>
                  <button onClick={() => removeVoucher(v.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default Vouchers;
