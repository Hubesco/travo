import React from "react";

import { RenderResult, act, fireEvent, render } from "@testing-library/react";

import App from "../../App";

describe("AddVoucher", () => {
  let wrapper: RenderResult;
  beforeEach(async () => {
    await act(async () => {
      wrapper = render(<App />);
    });
    fireEvent.click(wrapper.getByTestId("add-voucher-button"));
  });

  it("renders the component", () => {
    wrapper.getByText("Company");
    wrapper.getByText("Expiry Date");
    wrapper.getByText("Code");
    wrapper.getByText("Add");
    wrapper.getByText("Cancel");
  });

  it("shows validation messages when user submits form without filling fields", async () => {
    await act(async () => {
      fireEvent.click(wrapper.getByText("Add"));
    });
    wrapper.getByText("Company is mandatory");
    wrapper.getByText("Voucher code is mandatory");
  });

  it("adds the voucher to the list when user submits the form", async () => {
    const select = wrapper.getByTestId("select-company");
    fireEvent.change(select, {
      target: { value: "British Airways" },
    });
    fireEvent.change(wrapper.getByTestId("expiry-date-datepicker"), {
      target: { value: "01/01/2030" },
    });
    fireEvent.change(wrapper.getByTestId("code-input"), {
      target: { value: "ABCDEF" },
    });
    await act(async () => {
      fireEvent.click(wrapper.getByText("Add"));
    });

    wrapper.getByText("British Airways");
    wrapper.getByText("01/01/2030");
    wrapper.getByText("ABCDEF");
  });
});
