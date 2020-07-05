import React from "react";

import { act, fireEvent, render } from "@testing-library/react";

import App from "../../App";

describe("AddVoucher", () => {
  let wrapper;
  beforeEach(async () => {
    await act(async () => {
      wrapper = render(<App />);
    });
    fireEvent.click(wrapper.getByTestId("add-voucher-button"));
  });

  it("renders the component", () => {
    wrapper.getByText("Add a new voucher");
    wrapper.getByText("Company");
    wrapper.getByText("Expiry Date");
    wrapper.getByText("Code");
    wrapper.getByText("Add");
  });

  it("shows validation messages when user submits form without filling fields", async () => {
    await act(async () => {
      fireEvent.click(wrapper.getByTestId("add-voucher-submit"));
    });
    wrapper.getByText("Company is mandatory");
    wrapper.getByText("Expiry date is mandatory");
    wrapper.getByText("Voucher code is mandatory");
  });

  it("adds the voucher to the list when user submits the form", async () => {
    fireEvent.change(wrapper.getByLabelText("Company"), {
      target: { value: "British Airways" },
    });
    fireEvent.change(wrapper.getByLabelText("Expiry Date"), {
      target: { value: new Date("2030-01-01") },
    });
    fireEvent.change(wrapper.getByLabelText("Code"), {
      target: { value: "ABCDEF" },
    });
    await act(async () => {
      fireEvent.click(wrapper.getByTestId("add-voucher-submit"));
    });

    wrapper.getByText("Your vouchers");
    wrapper.getByText("British Airways");
    wrapper.getByText("01/01/2030");
    wrapper.getByText("ABCDEF");
  });
});