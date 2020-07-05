import React from "react";
import DatePicker from "react-datepicker";
import { Controller, ErrorMessage, useForm } from "react-hook-form";

function AddVoucher({ onSubmit, goToPageVouchers }) {
  const { control, handleSubmit, register, errors } = useForm();

  return (
    <div>
      <header>Add a new voucher</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="company">Company</label>
          <select
            id="company"
            name="company"
            data-testid="select-company"
            ref={register({
              required: "Company is mandatory",
            })}
            defaultValue=""
          >
            <option value="" disabled>
              Please select a company
            </option>
            <option value="British Airways">British Airways</option>
            <option value="Eurostar">Eurostar</option>
          </select>
          <ErrorMessage as="p" name="company" errors={errors} />
        </div>
        <div>
          <label htmlFor="expiryDate">Expiry Date</label>
          <Controller
            as={
              <DatePicker
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                showTimeSelect={false}
                todayButton="Today"
                placeholderText="Select a date"
                dropdownMode="select"
                isClearable
                shouldCloseOnSelect
              />
            }
            control={control}
            rules={{ required: "Expiry date is mandatory" }}
            name="expiryDate"
            id="expiryDate"
            valueName="selected"
            onChange={([selected]) => {
              return selected;
            }}
          />
          <ErrorMessage as="p" name="expiryDate" errors={errors} />
        </div>
        <div>
          <label htmlFor="code">Code</label>
          <input
            id="code"
            name="code"
            ref={register({ required: "Voucher code is mandatory" })}
          />
          <ErrorMessage as="p" name="code" errors={errors} />
        </div>

        <button type="submit" data-testid="add-voucher-submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddVoucher;
