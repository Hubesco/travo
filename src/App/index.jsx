import React from "react";

import Vouchers from "../components/Vouchers";
import { StyledApp, StyledSection } from "./styles";

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
