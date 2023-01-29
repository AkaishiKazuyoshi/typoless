import React, { useEffect, useRef } from "react";
import "../css/cpBattleCss/Timer.css";
import { useNavigate } from "react-router-dom";
import {startTime,setStartTime,setCountDownTimer} from "../globalVariables"


type Props = {
  startModalState: Boolean;
  resultModalState: Boolean;
  setResultModalState: Function;
  started: boolean
};

const Timer: React.FC<Props> = ({
  startModalState,
  resultModalState,
  setResultModalState,
  started
}) => {
  const navigate = useNavigate();
  //const endSound = new Audio("sound/round_gong.mp3");
  let countDownId = useRef<NodeJS.Timer | number>(0);
  setStartTime(30);

  function startTimer() {
    let time = startTime-1;
    const id = setInterval(() => {
      if (time <= 0) {
        setResultModalState(true);
        clearInterval(id);
        // navigate("result");
        console.log("clearInterval()");
    //    endSound.play();
        const timerEl = document.getElementsByClassName("timer");
        timerEl[0].innerHTML = "終了";
      }
      const timerEl = document.getElementsByClassName("timer");
      timerEl[0].innerHTML = String(time) + " Sec";
      time--;
      setCountDownTimer(time);
    }, 1000);

    return id;
  }

  //早期決着の場合の処理
  useEffect(() => {
    if (resultModalState) {
      clearInterval(countDownId.current);
      //endSound.play();
      const timerEl = document.getElementsByClassName("timer");
      timerEl[0].innerHTML = "終了";
    }
  }, [resultModalState]);

  useEffect(() => {
    if (startModalState === false) {
      console.log("スタートトリガー");
      // countDownId.current = startTimer();
      return function cleanUp() {
        clearInterval(countDownId.current);
      };
    }
  }, [startModalState]);

  useEffect(() => {
    if (started){
      countDownId.current = startTimer();
    }
  },[started]);

  return (
    <div className="outer">
      <label className="timer"> {startTime} Sec</label>
    </div>
  );
};

export default Timer;
