import e from "express";
import React, { useEffect, useCallback, useState } from "react";
import "../css/cpBattleCss/StartModal.css";
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
} from "../globalVariables";

interface Props {
  startModalState: boolean;
  setStartModalState: Function;
  setQuestionType: Function;
  questionType:string;
  setSoundVolumeEffect:Function;
  soundVolumeEffect:number;
  setEnemyImg:Function;
  enemyImg:string;
}

const StartModal = ({ 
  startModalState, 
  setStartModalState, 
  setQuestionType, 
  questionType, 
  setSoundVolumeEffect, 
  soundVolumeEffect,
  setEnemyImg,
  enemyImg

}: Props) => {

  const restart = (event: any) => {
    if (event.code === "Escape") {
      console.log("Escape")
      event.preventDefault();
      window.location.reload();
      // setStartModalState(true);
    }
  }; 

  const hiddenStartModal = useCallback((event: any) => {
    console.log(event.key, event.code)
    if (event.code === "Space") {
      console.log("シフトが押されました！");
      document.removeEventListener("keydown", hiddenStartModal, false);
      
      document.addEventListener("keydown", restart, false);
      setStartModalState(false);

      const enemysanSound = enemyImg.indexOf("Eriko") !== -1 ?
      new Audio(
        `sound/erikosan${Math.floor(Math.random() * 2) + 1}.mp3`
      ):
      new Audio(
        `sound/${enemyImg}san${Math.floor(Math.random() * 2) + 1}.mp3`
      );
      enemysanSound.volume = soundVolume;
      enemysanSound.currentTime = 0;
      enemysanSound.play();
    }
  },[enemyImg]);


  useEffect(() => {
    if (startModalState) {
      document.addEventListener("keydown", hiddenStartModal, false);
      // return document.removeEventListener("keydown", hiddenStartModal, false);
    }
  }, [startModalState,enemyImg]);

  const [level, setLevel] = useState("かんたん");
  // let [soundVolumeEffect, setSoundVolumeEffect] = useState(soundVolume * 10);

  // const volumeUp = () => {
  //   if (soundVolumeEffect < 10) {
  //     setSoundVolumeEffect(++soundVolumeEffect);
  //     setSoundVolume(soundVolumeEffect);
  //   }
  // }
  
  // const volumeDown = () => {
  //   if (soundVolumeEffect > 0){
  //     setSoundVolumeEffect(--soundVolumeEffect);
  //     setSoundVolume(soundVolumeEffect);
  //   }
  // }

  return (
    <div className={"start-modal" + (startModalState ? "-visible" : "-hidden")}>
      <p className="cpBattleStartInfo">
      <u>スペースキーをおして<br></br>
      タイプを始めたらスタート</u>
      </p>
      <h4 className="cpBattleInfo">難易度:　{level}</h4>
      <div
      className="level-button-container">
        <button
        id="easy"
        className="level-button"
          onClick={() => {
            if (damageInterval !== 1000) {
              document.removeEventListener("keydown", hiddenStartModal, false);
            }
            setDamageRatio(5);
            console.log(damageRatio);
            setTypoDamageRatio(2.5);
            console.log(typoDamageRatio);
            setDamageInterval(1000);
            console.log(damageInterval);
            setLevel("かんたん");
            setEnemyImg("arisa");
          }}
        >
          かんたん
        </button>
        <button
        id="nomal"
        className="level-button"
          onClick={() => {
            if (damageInterval !== 500) {
              document.removeEventListener("keydown", hiddenStartModal, false);
            }
            setDamageRatio(5);
            console.log(damageRatio);
            setTypoDamageRatio(5);
            console.log(typoDamageRatio);
            setDamageInterval(500);
            console.log(damageInterval);
            setLevel("ふつう");
            setEnemyImg("kotaro");
          }}
        >
          ふつう
        </button>
        <button
        id="hard"
        className="level-button"
          onClick={() => {
            if (damageInterval !== 250) {
              document.removeEventListener("keydown", hiddenStartModal, false);
            }
            setDamageRatio(5);
            console.log(damageRatio);
            setTypoDamageRatio(10);
            console.log(typoDamageRatio);
            setDamageInterval(250);
            console.log(damageInterval);
            setLevel("むずい");
            setEnemyImg("Eriko");
          }}
        >
          むずい
        </button>
        <button
        id="veryHard"
        className="level-button"
          onClick={() => {
            console.log(typeof document.getElementById("veryHard")!.innerHTML)
            if (damageInterval !== 100) {
              document.removeEventListener("keydown", hiddenStartModal, false);
            }
            setDamageRatio(5);
            console.log(damageRatio);
            setTypoDamageRatio(10);
            console.log(typoDamageRatio);
            setDamageInterval(100);
            console.log(damageInterval);
            setLevel("むっっず！");
            setEnemyImg("Angry_Eriko");
          }}
        >
          むっっず！
        </button>
      </div>
      <div>
        <h4 className="cpBattleInfo">問題TYPE:　{questionType.toUpperCase()}</h4>
        <div className="mode-button-container">
          <button className="mode-button" onClick={()=>{setQuestionType("word")}} >WORD</button>
          <button className="mode-button" onClick={()=>{setQuestionType("sentence")}} >SENTENCE</button>
        </div>
      </div>
      {/* <div>
        <h4 className="info">音量:　{soundVolumeEffect}</h4>
        <div className="sound-button-container">
          <button className="sound-button" onClick={soundVolumeEffect > 0 ? ()=>{
            volumeDown();
            clickSoundPlay();
          }:
          ()=>{}
          } >ー</button>
          <button className="sound-button" onClick={soundVolumeEffect < 10 ? ()=>{
            volumeUp();
            clickSoundPlay();
          }:
          ()=>{}
          } >＋</button>
        </div>
      </div> */}
    </div>
  );
}

export default StartModal;
