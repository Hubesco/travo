import React from "react";
import { render } from "@testing-library/react";
import App from "./index";

describe("App", () => {
  it("renders app without crashing", () => {
    const { getByText } = render(<App />);
    getByText("Travo");
  });
});
