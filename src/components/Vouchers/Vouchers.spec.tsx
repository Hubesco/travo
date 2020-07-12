import React from "react";

import { RenderResult, act, fireEvent, render } from "@testing-library/react";

import browser from "../../infrastructure/browser";
import Vouchers from "./index";

interface Options {
  withData?: boolean;
}

describe("Vouchers", () => {
  describe("when user opens the list of vouchers", () => {
    it("shows an empty list if user has no vouchers", async () => {
      let wrapper: RenderResult = await init({});

      wrapper.getByText("Company");
      wrapper.getByText("Expiry Date");
      wrapper.getByText("Code");
      wrapper.getByText("No vouchers :'(");
    });

    it("shows the list of vouchers if user has some", async () => {
      let wrapper: RenderResult = await init({ withData: true });

      wrapper.getByText("British Airways");
      wrapper.getByText("01/02/2022");
      wrapper.getByText("ABCDEF");

      wrapper.getByText("Eurostar");
      wrapper.getByText("01/03/2023");
      wrapper.getByText("GHIJKL");
    });
  });

  describe("when user wants to remove a voucher", () => {
    let wrapper: RenderResult;
    beforeEach(async () => {
      wrapper = await init({ withData: true });
    });

    it("shows a button to delete a voucher", async () => {
      const removeButtons = wrapper.getAllByText("Remove");
      expect(removeButtons.length).toBe(2);
    });

    it("deletes the voucher if user clicks on remove button", async () => {
      const removeButtons = wrapper.getAllByText("Remove");
      await act(async () => {
        fireEvent.click(removeButtons[0]);
      });
      // should have only one button now
      wrapper.getByText("Remove");

      wrapper.getByText("Eurostar");
      wrapper.getByText("01/03/2023");
      wrapper.getByText("GHIJKL");
    });
  });
});

async function init({ withData = false }: Options) {
  if (withData) {
    await browser.storage.sync.set({
      vouchers: {
        uuid1: {
          id: "uuid1",
          company: "British Airways",
          expiryDate: new Date("2022-02-01").getTime(),
          code: "ABCDEF",
        },
        uuid2: {
          id: "uuid2",
          company: "Eurostar",
          expiryDate: new Date("2023-03-01").getTime(),
          code: "GHIJKL",
        },
      },
    });
  }
  let wrapper;
  await act(async () => {
    wrapper = render(<Vouchers />);
  });
  return wrapper;
}
