import React, { Component } from "react";

import "./App.css";
import BreakTimer from "./component/BreakTimer";
import SessionTimer from "./component/SessionTimer";
import TimerControl from "./component/TimerControl";
import TimerDisplay from "./component/TimerDisplay";
import chime from "./assets/clock-chimes.mp3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 25 * 60,
      sessionTimer: 25 * 60,
      breakTimer: 5 * 60,
      sessionTimerState: 0,
      breakTimerState: 0,
      message: "No Timer Running",
    };
    this.timer = 0;
  }
  changeBreakTimer = (newTime) => {
    if (newTime >= 1 && newTime <= 60)
      this.setState({ breakTimer: newTime * 60 });
  };
  changeSessionTimer = (newTime) => {
    if (newTime >= 1 && newTime <= 60) {
      if (this.state.breakTimerState === 0) {
        this.setState({ sessionTimer: newTime * 60, timeLeft: newTime * 60 });
      } else {
        this.setState({ sessionTimer: newTime * 60 });
      }
    }
  };
  startTimer = () => {
    console.log(this.state.sessionTimerState, this.state.breakTimerState);
    if (
      this.state.sessionTimerState === 0 &&
      this.state.breakTimerState === 0
    ) {
      this.setState({ sessionTimerState: 1, message: "Session Timer Running" });
      if (this.timer === 0 && this.state.timeLeft > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    } else if (
      this.state.sessionTimerState === 0 &&
      this.state.breakTimerState === 2
    ) {
      if (this.timer === 0 && this.state.timeLeft > 0) {
        this.timer = setInterval(this.countDown, 1000);
      }

      this.setState({ breakTimerState: 1, message: "Break Timer Running" });
    } else
      this.setState({ sessionTimerState: 1, message: "Session Timer Running" });
  };

  pauseTimer = () => {
    if (this.state.sessionTimerState === 1) {
      this.setState({ sessionTimerState: 2, message: "Session Timer Paused" });
    }
    if (this.state.breakTimerState === 1) {
      this.setState({ breakTimerState: 2, message: "Break Timer Paused" });
    }
  };

  resetTimer = () => {
    const sound = document.getElementById("timesup");
    this.setState({
      sessionTimerState: 0,
      sessionTimer: 25 * 60,
      breakTimer: 5 * 60,
      timeLeft: 25 * 60,
      breakTimerState: 0,
      message: "No Timer Running",
    });
    clearInterval(this.timer);
    this.timer = 0;
    sound.currentTime = 0;
    sound.pause();
    sound.currentTime = 0;
  };

  countDown = () => {
    const sound = document.getElementById("timesup");
    if (this.state.sessionTimerState === 1 && this.state.timeLeft >= 1) {
      this.setState({
        timeLeft: this.state.timeLeft - 1,
        message: "Session Timer Running",
      });
    } else if (
      this.state.sessionTimerState === 1 &&
      this.state.timeLeft === 0
    ) {
      this.setState({
        sessionTimerState: 0,
        breakTimerState: 1,
        timeLeft: this.state.breakTimer,
      });
      sound.currentTime = 0;
      sound.play();
    } else if (this.state.breakTimerState === 1 && this.state.timeLeft >= 1) {
      this.setState({
        timeLeft: this.state.timeLeft - 1,
        message: "Break Timer Running",
      });
    } else if (this.state.breakTimerState === 1 && this.state.timeLeft === 0) {
      this.setState({
        sessionTimerState: 1,
        breakTimerState: 0,
        timeLeft: this.state.sessionTimer,
        message: "Session Timer Running",
      });
      sound.currentTime = 0;
      sound.play();
    }
  };

  render() {
    return (
      <div className="App ui container">
        <h1>Task Timer</h1>
        <BreakTimer
          breakTime={this.state.breakTimer / 60}
          enabled={this.state.breakTimerState === 0}
          onChangeTimer={this.changeBreakTimer}
        />
        <SessionTimer
          sessionTime={this.state.sessionTimer / 60}
          enabled={this.state.sessionTimerState === 0}
          onChangeTimer={this.changeSessionTimer}
        />
        <TimerDisplay timeLeft={this.state.timeLeft} />
        <TimerControl
          start={this.startTimer}
          pause={this.pauseTimer}
          reset={this.resetTimer}
          message={this.state.message}
        />
        <audio id="timesup" src={chime} />
      </div>
    );
  }
}

export default App;
