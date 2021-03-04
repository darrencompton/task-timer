import React from "react";

const TimerControl = (props) => {
  return (
    <div>
      <button onClick={props.start}>Start</button>
      <button onClick={props.pause}>Pause</button>
      <button onClick={props.reset}>Reset</button>
      <h2>{props.message}</h2>
    </div>
  );
};

export default TimerControl;
