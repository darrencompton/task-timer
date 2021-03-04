import React from "react";

const BreakTimer = (props) => {
  const button1Render = props.enabled ? (
    <button
      className="positive ui button"
      onClick={() => props.onChangeTimer(props.breakTime + 1)}
    >
      <h2>+</h2>
    </button>
  ) : (
    <button className="ui disabled button">
      <h2>+</h2>
    </button>
  );
  const button2Render = props.enabled ? (
    <button
      className="negative ui button"
      onClick={() => props.onChangeTimer(props.breakTime - 1)}
    >
      <h2>-</h2>
    </button>
  ) : (
    <button className="ui disabled button">
      <h2>-</h2>
    </button>
  );
  return (
    <div className="ui grid">
      <div className="four wide column" />
      <div className="eight wide column align left">
        <h1>Break Length</h1>
      </div>
      <div className="six wide column" />
      <div className="one wide column">{button1Render}</div>
      <div className="one wide column">
        <h2>{props.breakTime}</h2>
      </div>
      <div className="one wide column">{button2Render}</div>
    </div>
  );
};

export default BreakTimer;
