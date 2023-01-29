import React, { useEffect, useCallback, useRef, useState } from "react";
import "../css/raidBattleCss/ResultModal.css";
import { Link } from "react-router-dom";
import {useDidUpdateEffect} from "./useDidUpdateEffect"
import axios, { AxiosResponse } from "axios";
import moment from "moment";
import {
  correctTypingCounter,
  inCorrectTypingCounter,
  totalTypingCounter,
  loginUserData,
  startTime,
  countDownTimer,
  soundVolume
} from "../globalVariables";
import { raidBossObject } from "../raidBattleComponent/interface";


interface Props {
  resultModalState: boolean;
  setStartModalState: Function;
  setResultModalState: Function;
  enemyHp: number;
  myHp: number;
  raidBoss: raidBossObject;
}

function ResultModal({
  resultModalState,
  setResultModalState,
  setStartModalState,
  enemyHp,
  myHp,
  raidBoss,
}: Props) {
  let wpm = Math.round((correctTypingCounter / (startTime-countDownTimer) / 5) * 60 * 100) / 100;
  const [winFlag, setWinFlag] = useState<boolean|null>(null);
  const hiddenResultModal = useCallback((event: any) => {
    if (event.key === "Enter") {
      console.log("Enter");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (resultModalState) {
      document.addEventListener("keydown", hiddenResultModal, false);
    }
  }, [resultModalState]);

  useEffect(() => {
    if (resultModalState) {
      if (enemyHp > 0) {
        setWinFlag(false);
      } else {
        setWinFlag(true);
        console.log(winFlag);
      }
    }

  }, [resultModalState]);


  useDidUpdateEffect(()=>{
    if (winFlag) {
      const winSound = new Audio(`sound/yattaze${Math.floor(Math.random() * 3) + 1}.mp3`);
      winSound.volume = soundVolume;
      winSound.play();
    } else {
      const loseSound = new Audio(`sound/mairimasita${Math.floor(Math.random() * 2) + 1}.mp3`);
      loseSound.volume = soundVolume;
      loseSound.play();
      console.log("参りました");
    }
  },[winFlag]);
  return (
    <div
      className={"raid-result-modal" + (resultModalState ? "-visible" : "-hidden")}
    >
      <div>{raidBoss.name}に</div>
      <div>{winFlag ? "あなたは勝ちました！" : "あなたは負けましたw"}</div>
      <br />
      <div>あなたが与えたダメージは{correctTypingCounter}です</div>
      <br />
      <br />
      <div>enterを押すと最初に戻ります</div>
    </div>
  );
}

export default ResultModal;
