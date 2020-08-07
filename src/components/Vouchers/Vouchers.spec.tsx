import React from "react";

import { act, fireEvent, render, screen } from "@testing-library/react";

import browser from "../../infrastructure/browser";
import Vouchers from "./index";

interface Options {
  withData?: boolean;
}

describe("Vouchers", () => {
  describe("when user opens the list of vouchers", () => {
    it("shows an empty list if user has no vouchers", async () => {
      await init();
      const { getByText } = screen;

      getByText("Company");
      getByText("Expiry Date");
      getByText("Code");
      getByText("No vouchers :'(");
    });

    it("shows the list of vouchers if user has some", async () => {
      await init({ withData: true });

      const { getByText } = screen;

      getByText("British Airways");
      getByText("01/02/2022");
      getByText("ABCDEF");

      getByText("Eurostar");
      getByText("01/03/2023");
      getByText("GHIJKL");
    });
  });

  describe("when user wants to sort the list of vouchers", () => {
    beforeEach(async () => {
      await init({ withData: true });
    });

    it("can sort by company", async () => {
      fireEvent.click(screen.getByText("Company"));
      let cells = screen.getAllByTestId("company");
      expect(cells[0].innerHTML).toBe("British Airways");
      expect(cells[1].innerHTML).toBe("Eurostar");

      fireEvent.click(screen.getByText("Company"));
      cells = screen.getAllByTestId("company");
      expect(cells[0].innerHTML).toBe("Eurostar");
      expect(cells[1].innerHTML).toBe("British Airways");
    });

    it("can sort by expiry Date", async () => {
      fireEvent.click(screen.getByText("Expiry Date"));
      let cells = screen.getAllByTestId("expiryDate");
      expect(cells[0].innerHTML).toBe("01/03/2023");
      expect(cells[1].innerHTML).toBe("01/02/2022");

      fireEvent.click(screen.getByText("Expiry Date"));
      cells = screen.getAllByTestId("expiryDate");
      expect(cells[0].innerHTML).toBe("01/02/2022");
      expect(cells[1].innerHTML).toBe("01/03/2023");
    });
  });

  describe("when user wants to remove a voucher", () => {
    beforeEach(async () => {
      await init({ withData: true });
    });

    it("shows a button to delete a voucher", async () => {
      const { getAllByText } = screen;

      const removeButtons = getAllByText("Remove");
      expect(removeButtons.length).toBe(2);
    });

    it("deletes the voucher if user clicks on remove button", async () => {
      const { getByText, getAllByText } = screen;
      const removeButtons = getAllByText("Remove");
      await act(async () => {
        fireEvent.click(removeButtons[0]);
      });
      // should have only one button now
      getByText("Remove");

      getByText("Eurostar");
      getByText("01/03/2023");
      getByText("GHIJKL");
    });
  });
});

async function init(options: Options = { withData: false }) {
  if (options.withData) {
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
  await act(async () => {
    render(<Vouchers />);
  });
}
