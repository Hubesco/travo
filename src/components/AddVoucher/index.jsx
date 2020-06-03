import React from "react";
import DatePicker from "react-datepicker";
import { Controller, ErrorMessage, useForm } from "react-hook-form";

function AddVoucher() {
  const { control, handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => console.log(values);

  return (
    <div>
      <header>Add a new voucher</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="company">Company</label>
          <select
            id="company"
            name="company"
            ref={register({
              required: "Company is mandatory",
            })}
            defaultValue=""
          >
            <option value="" disabled>
              Please select a company
            </option>
            <option value="british_airways">British Airways</option>
            <option value="eurostar">Eurostar</option>
          </select>
          <ErrorMessage name="company" errors={errors} />
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
                placeholderText="Please select a date"
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
          <ErrorMessage name="expiryDate" errors={errors} />
        </div>
        <div>
          <label htmlFor="code">Code</label>
          <input
            id="code"
            name="code"
            ref={register({ required: "Voucher code is mandatory" })}
          />
          <ErrorMessage name="code" errors={errors} />
        </div>

        <button type="submit" data-testid="add-voucher-submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddVoucher;
