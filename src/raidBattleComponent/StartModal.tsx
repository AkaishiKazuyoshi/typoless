import React, { useEffect, useCallback, useState } from "react";
import "../css/raidBattleCss/StartModal.css";
import {
  damageRatio,
  setDamageRatio,
  typoDamageRatio,
  setTypoDamageRatio,
  damageInterval,
  setDamageInterval,
  clickSoundPlay,
  soundVolume,
  setSoundVolume,
  correctTypingCounter,
} from "../globalVariables";
import { raidBossObject } from "./interface";

interface Props {
  startModalState: boolean;
  setStartModalState: Function;
  setQuestionType: Function;
  questionType:string;
  setSoundVolumeEffect:Function;
  soundVolumeEffect:number;
  raidBoss:raidBossObject;
}

const StartModal = ({ 
  startModalState, 
  setStartModalState, 
  setQuestionType, 
  questionType, 
  setSoundVolumeEffect, 
  soundVolumeEffect,
  raidBoss
}: Props) => {
  const hiddenStartModal = useCallback((event: any) => {
    if (event.code === "Space") {
      console.log("シフトが押されました！");
      document.removeEventListener("keydown", hiddenStartModal, false);
      setStartModalState(false);
      console.log(raidBoss.image_name)
      if (raidBoss.image_name !== "" ) {
        const enemySanSound = raidBoss.image_name?.indexOf("Eriko") !== -1 ?
          new Audio(
            `sound/erikosan${Math.floor(Math.random() * 2) + 1}.mp3`
          ):
          new Audio(
            `sound/${raidBoss.image_name}${Math.floor(Math.random() * 2) + 1}.mp3`
          );
        enemySanSound.volume = soundVolume;
        enemySanSound.currentTime = 0;
        enemySanSound.play();
      }
    }
  }, [raidBoss.image_name]);

  useEffect(() => {
    if (startModalState) {
      document.addEventListener("keydown", hiddenStartModal, false);
    }
  }, [startModalState,raidBoss.image_name]);

  return (
    <div className={"raid-start-modal" + (startModalState ? "-visible" : "-hidden")}  >
      <p className="raidBattleStartInfo">
      <u>スペースキーをおして<br></br>
      タイプを始めたらスタート</u>
      </p>
      <div>
        {correctTypingCounter === 0 ? <p></p> : <p>{raidBoss.name} に <br></br>{correctTypingCounter}ダメージ与えました！</p> }
      </div>
    </div>
  );
}

export default StartModal;
