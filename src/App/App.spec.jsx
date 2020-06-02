import React from "react";

import { act, render } from "@testing-library/react";

import App from "./index";

describe("App", () => {
  it("renders app without crashing", async () => {
    let wrapper;

    await act(async () => {
      wrapper = render(<App />);
    });
    wrapper.getByText("Travo");
    wrapper.getByText("Your vouchers");
  });
});
