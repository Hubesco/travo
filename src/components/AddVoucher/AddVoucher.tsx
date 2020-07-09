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
  } = useForm<Voucher>({
    defaultValues: { company: "" },
  });

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const companyHasError = !!errors.company;

  return (
    <div style={{ padding: "4px 32px 4px 16px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl className={classes.formControl} error={companyHasError}>
          <InputLabel>Company</InputLabel>
          <Controller
            control={control}
            name="company"
            defaultValue=""
            rules={{ required: true }}
            error={companyHasError}
            as={
              <Select label="Company">
                {Object.keys(companies).map((companyKey) => (
                  <MenuItem key={companyKey} value={companyKey}>
                    {companyKey}
                  </MenuItem>
                ))}
              </Select>
            }
          />
          {companyHasError && (
            <FormHelperText>Company is mandatory</FormHelperText>
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
