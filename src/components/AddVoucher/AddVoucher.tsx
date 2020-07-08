import React from "react";
import { Controller, useForm } from "react-hook-form";

import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  FormControl,
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
import useStyles from "./styles";

interface AddVoucherProps {
  onSubmit: (voucher: Voucher) => Promise<void>;
  goToPageVouchers: () => void;
}

function AddVoucher({ onSubmit, goToPageVouchers }: AddVoucherProps) {
  const { control, handleSubmit, register, errors, setValue } = useForm<
    Voucher
  >();

  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ padding: "4px 32px 4px 16px" }}>
      <header>Add a new voucher</header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className={classes.formControl}>
          <InputLabel id="label-company">Company</InputLabel>
          <Select labelId="label-company" id="name" name="company">
            {Object.keys(companies).map((companyKey) => (
              <MenuItem key={companyKey} value={companyKey}>
                {companyKey}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <FormControl className={classes.formControl}>
            <KeyboardDatePicker
              id="expiryDate"
              name="expiryDate"
              label="Expiry Date"
              format="dd/MM/yyyy"
              disablePast
              margin="normal"
              disableToolbar
              fullWidth
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              error={errors.hasOwnProperty("expiryDate")}
              helperText={errors.expiryDate && errors.expiryDate.message}
            />
          </FormControl>
        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControl}>
          <TextField id="code" label="Code" />
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
