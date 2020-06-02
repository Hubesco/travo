import React from "react";
import { StyledApp, StyledSection } from "./styles";
import Vouchers from "../components/Vouchers";

function App() {
  return (
    <StyledApp>
      <header>Travo</header>
      <StyledSection>
        <Vouchers />
      </StyledSection>
    </StyledApp>
  );
}

export default App;
