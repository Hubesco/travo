import React from "react";
import { useForm } from "react-hook-form";

function AddVoucher() {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => console.log(values);

  return (
    <div>
      <header>Add a new voucher</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            ref={register({
              required: "Please select a company",
            })}
          />
          {errors.company && <span>{errors.company.message}</span>}
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            name="expiryDate"
            ref={register({ required: "Please enter an expiry date" })}
          />
          {errors.expiryDate && <span>{errors.expiryDate.message}</span>}
        </div>
        <div>
          <label htmlFor="code">Code</label>
          <input
            id="code"
            name="code"
            ref={register({ required: "Please enter a voucher code" })}
          />
          {errors.code && <span>{errors.code.message}</span>}
        </div>

        <button type="submit" data-testid="add-voucher-submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddVoucher;
