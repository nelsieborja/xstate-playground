import * as React from "react";
import { render } from "react-dom";

import SimpleSlideDemo from "./SimpleSlideDemo";
import SlideMachineDemo from "./SlideMachineDemo";

function App() {
  return (
    <>
      <SimpleSlideDemo />
      <br />
      <hr />
      <SlideMachineDemo />
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
