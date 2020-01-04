import * as React from "react";
import SlideMachine from "./SlideMachine";

export default function() {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <h1>Using XState + Greensock</h1>
      <button onClick={() => setVisible(!visible)}>Toggle Content</button>
      <br />
      <br />
      <SlideMachine onToggle={setVisible} visible={visible}>
        <div style={{ background: "#000", color: "pink", padding: 20 }}>
          Slide Up
          <br />
          Slide Down
        </div>
      </SlideMachine>
    </>
  );
}
