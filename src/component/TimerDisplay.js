import React from "react";

const TimerDisplay = (props) => {
  const timeleftInSeconds = props.timeLeft;
  const timeDisplayInMinutes = Math.floor(timeleftInSeconds / 60);
  const timeDisplayInSeconds = timeleftInSeconds - timeDisplayInMinutes * 60;
  return (
    <div>
      <h1>
        {timeDisplayInMinutes + ":" + ("00" + timeDisplayInSeconds).slice(-2)}
      </h1>
    </div>
  );
};

export default TimerDisplay;
