import * as React from "react";
import SimpleSlide from "./SimpleSlide";

export default function() {
  const [visible, setVisible] = React.useState(true);
  return (
    <>
      <h1>No dependecies</h1>
      <button onClick={() => setVisible(!visible)}>Toggle Content</button>
      <br /> <br />
      <SimpleSlide visible={visible}>
        <div style={{ background: "#000", color: "pink", padding: 20 }}>
          Slide Up
          <br />
          Slide Down
        </div>
      </SimpleSlide>
    </>
  );
}
