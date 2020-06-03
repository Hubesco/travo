import React from "react";

import { act, fireEvent, render } from "@testing-library/react";

import AddVoucher from "./index";

describe("AddVoucher", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = render(<AddVoucher />);
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
    wrapper.getByText("Please select a company");
    wrapper.getByText("Please enter an expiry date");
    wrapper.getByText("Please enter a voucher code");
  });
});
