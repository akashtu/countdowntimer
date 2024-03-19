import React, { useState, useEffect } from "react";
import "./CountDown.css";

const CountDown = () => {
  const [targetDate, setTargetDate] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [cancel, setCancel] = useState(true);
  const [timerOver, setTimerOver] = useState(false);

  useEffect(() => {
    if (remainingTime <= 0 && countdownInterval) {
      clearInterval(countdownInterval);
      setTimerOver(true);
    }
  }, [remainingTime]);

  const handleInputChange = (event) => {
    setTargetDate(event.target.value);
    setTimerOver(false);
    console.log(event.target.value);
  };

  const startCountdown = () => {
    const targetTime = new Date(targetDate).getTime();
    console.log(targetTime);

    if (isNaN(targetTime)) {
      alert("Please select a valid date and time.");
      return;
    }

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = targetTime - currentTime;

      if (timeDifference <= 0) {
        clearInterval(interval);
        setRemainingTime(0);
      } else {
        setRemainingTime(timeDifference);
      }
    }, 1000);

    setCountdownInterval(interval);
    console.log(interval);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const days = Math.floor(remainingTime / (3600 * 24 * 1000));
  const hours = Math.floor(
    (remainingTime % (3600 * 24 * 1000)) / (3600 * 1000)
  );
  const minutes = Math.floor((remainingTime % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

  const cancelCountdown = () => {
    clearInterval(countdownInterval);
    setCountdownInterval(null);
    setRemainingTime(0);
    setTargetDate("");
  };

  return (
    <div className="countdown">
      <div>
        <span style={{ color: "white" }}>Countdown</span>
        <span style={{ color: "orange" }}>Timer</span>
      </div>
      <div>
        <input
          type="datetime-local"
          className="datetime"
          value={targetDate}
          onChange={handleInputChange}
        />
      </div>
      {cancel ? (
        <div onClick={() => setCancel(false)}>
          <button className="btn" onClick={startCountdown}>
            Start Timer
          </button>
        </div>
      ) : (
        <div onClick={() => setCancel(true)}>
          <button className="btn" onClick={cancelCountdown}>
            Cancel Timer
          </button>
        </div>
      )}
      {!timerOver ? (
        <div className="countdown-box">
          <div>
            <span>{formatTime(days)}</span>
            <span>Days</span>
          </div>
          <div>
            <span>{formatTime(hours)}</span>
            <span>Hours</span>
          </div>
          <div>
            <span>{formatTime(minutes)}</span>
            <span>Minutes</span>
          </div>
          <div>
            <span>{formatTime(seconds)}</span>
            <span>Seconds</span>
          </div>
        </div>
      ) : (
        <p>The countdown is over!What's next on your adventure?</p>
      )}
    </div>
  );
};

export default CountDown;
