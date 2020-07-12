import React, { ChangeEvent } from "react";
import { Controller, useForm } from "react-hook-form";

import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import companies from "../../domain/companies";
import Voucher from "../../domain/voucher.type";
import { format, toDate } from "../../utils/date";
import useStyles from "./styles";

interface AddVoucherProps {
  goToPageVouchers: () => void;
  onSubmit: (voucher: Voucher) => Promise<void>;
}

function AddVoucher({ goToPageVouchers, onSubmit }: AddVoucherProps) {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    control,
    errors,
  } = useForm({
    defaultValues: { company: "", expiryDate: new Date(), code: "" },
  });

  const companyHasError = !!errors.company;
  const expiryDateHasError = !!errors.expiryDate;
  const codeHasError = !!errors.code;

  return (
    <div style={{ padding: "4px 32px 4px 16px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className={classes.formControl} error={companyHasError}>
          <InputLabel id="company-label">Company</InputLabel>
          <Controller
            control={control}
            name="company"
            defaultValue=""
            rules={{ required: true }}
            error={companyHasError}
            render={(props) => (
              <Select
                labelId="company-label"
                onChange={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
                inputProps={{ "data-testid": "select-company" }}
                label="Company"
              >
                {Object.keys(companies).map((companyKey) => (
                  <MenuItem key={companyKey} value={companyKey}>
                    {companyKey}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {companyHasError && (
            <FormHelperText>Company is mandatory</FormHelperText>
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <Controller
            control={control}
            name="expiryDate"
            rules={{ required: true }}
            render={(props) => (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  label="Expiry Date"
                  format="dd/MM/yyyy"
                  disablePast
                  margin="normal"
                  disableToolbar
                  fullWidth
                  value={props.value}
                  onChange={props.onChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  inputProps={{ "data-testid": "expiry-date-datepicker" }}
                  error={errors.hasOwnProperty("expiryDate")}
                  helperText={errors.expiryDate && "Expiry date is mandatory"}
                />
              </MuiPickersUtilsProvider>
            )}
          />
        </FormControl>
        <FormControl className={classes.formControl} error={codeHasError}>
          <Controller
            control={control}
            name="code"
            rules={{ required: true }}
            as={TextField}
            label="Code"
            inputProps={{ "data-testid": "code-input" }}
            error={codeHasError}
          />
          {codeHasError && (
            <FormHelperText>Voucher code is mandatory</FormHelperText>
          )}
        </FormControl>
        <div style={{ paddingTop: "8px", width: "100%", textAlign: "right" }}>
          <Button
            style={{ marginRight: "8px" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add
          </Button>
          <Button
            onClick={goToPageVouchers}
            data-testid="cancel-add-voucher-button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddVoucher;
