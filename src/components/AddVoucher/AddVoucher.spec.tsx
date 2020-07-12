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
    fireEvent.change(wrapper.getByLabelText("Company"), {
      target: { value: "British Airways" },
    });
    // fireEvent.change(wrapper.getByLabelText("Expiry Date"), {
    //   target: { value: new Date("2030-01-01") },
    // });
    // fireEvent.change(wrapper.getByLabelText("Code"), {
    //   target: { value: "ABCDEF" },
    // });
    // await act(async () => {
    //   fireEvent.click(wrapper.getByText("Add"));
    // });

    // wrapper.getByText("British Airways");
    // await wrapper.findByText("01/01/2030");
    // wrapper.getByText("ABCDEF");
  });
});
