import React from "react";

import { act, fireEvent, render } from "@testing-library/react";

import App from "./index";

describe("App", () => {
  let wrapper;

  beforeEach(async () => {
    await act(async () => {
      wrapper = render(<App />);
    });
  });

  it("renders app without crashing", async () => {
    wrapper.getByText("Travo");
  });

  describe("when user wants to add a new voucher", () => {
    it("shows the form when clicking on the add voucher button", async () => {
      fireEvent.click(wrapper.getByTestId("add-voucher-button"));
      wrapper.getByText("Add a new voucher");
    });

    it("redirects to main page if user cancels the creation", async () => {
      fireEvent.click(wrapper.getByTestId("add-voucher-button"));
      await act(async () => {
        fireEvent.click(wrapper.getByTestId("cancel-add-voucher-button"));
      });
      wrapper.getByText("Company");
    });
  });
});
