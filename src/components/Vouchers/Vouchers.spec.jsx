import React from "react";

import { act, render } from "@testing-library/react";

import Vouchers from "./index";

describe("Vouchers", () => {
  it("renders the component", async () => {
    let wrapper = await init({});

    wrapper.getByText("Your vouchers");
  });

  it("shows an empty list if user has no vouchers", async () => {
    let wrapper = await init({});

    wrapper.getByText("Company");
    wrapper.getByText("Expiry Date");
    wrapper.getByText("Code");
    wrapper.getByText("No vouchers :'(");
  });

  it("shows the list of vouchers if user has some", async () => {
    let wrapper = await init({ withData: true });

    wrapper.getByText("British Airways");
    wrapper.getByText("01/02/2022");
    wrapper.getByText("ABCDEF");

    wrapper.getByText("Eurostar");
    wrapper.getByText("01/03/2023");
    wrapper.getByText("GHIJKL");
  });
});

async function init({ withData }) {
  if (withData) {
    browser.storage.sync.set({
      vouchers: [
        {
          company: "British Airways",
          expiryDate: "2022-02-01",
          code: "ABCDEF",
        },
        {
          company: "Eurostar",
          expiryDate: "2023-03-01",
          code: "GHIJKL",
        },
      ],
    });
  }
  let wrapper;
  await act(async () => {
    wrapper = render(<Vouchers />);
  });
  return wrapper;
}
