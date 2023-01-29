import React, { useState, useEffect, useRef } from "react";
import "../css/raidBattleCss/Timer.css";
import {startTime,setStartTime, setCountDownTimer, loginUserData} from "../globalVariables";
import io from "socket.io-client";
import axios, { AxiosResponse } from "axios";
import { raidBossObject } from "../raidBattleComponent/interface";
import moment from "moment";


const socket = io();

type Props = {
  startModalState: Boolean;
  setStartModalState: Function;
  resultModalState: Boolean;
  setResultModalState: Function;
  started: boolean;
  setStart: Function;
  myHp: number;
  setMyHp: Function;
  enemyHp: number;
  setEnemyHp: Function;
  damage: number;
  setDamage: Function;
  raidBoss: raidBossObject;
  correctSentence:number;
};

const Timer: React.FC<Props> = ({
  startModalState,
  setStartModalState,
  resultModalState,
  setResultModalState,
  started,
  setStart,
  myHp,
  setMyHp,
  enemyHp,
  setEnemyHp,
  damage,
  setDamage,
  raidBoss,
  correctSentence,
}) => {
  const refMyHp = useRef(myHp);
  const refEnemyHp = useRef(enemyHp-damage);
  const refDamage = useRef(damage);

  let countDownId = useRef<NodeJS.Timer | number>(0);
  
  const postDamage = (damageData: object)=>{
    axios.post("/post/bossDamage", damageData)
  };

  setStartTime(5);


  function startTimer(refMyHp:any, refEnemyHp:any, refDamage:any) {
    let time = startTime-1;
    const id = setInterval(() => {
      if (time <= 0) {
        if(refDamage.current > 0){
          postDamage({
            boss_id: raidBoss.id,
            account_name:localStorage.getItem("name") ? localStorage.getItem("name") : null,
            damage:refDamage.current,
            timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
          socket.emit("send_damage", {name: loginUserData.name, damage: refDamage.current, boss_id: raidBoss.id});
        }
        if(refEnemyHp.current-refDamage.current/raidBoss.maxHP*100 <= 0){
          axios.post("/post/newBoss",{boss_id:raidBoss.id});
        }else{
          setMyHp(refMyHp.current - 34);
        }
        setDamage(0);
        if(refMyHp.current-34 > 0 && refEnemyHp.current-refDamage.current/raidBoss.maxHP*100 > 0){
          setStartModalState(true);
          setStart(false);
          clearInterval(id);
        } else {
          setResultModalState(true);
          clearInterval(id);
          console.log("clearInterval()");
        }
      }
      const timerEl = document.getElementsByClassName("raid-timer");
      if (time === 0) {
        timerEl[0].innerHTML = String(time);
        setTimeout(()=>{
          timerEl[0].innerHTML = String(startTime);
        },1000);      
      } else {
        timerEl[0].innerHTML = String(time);
      }
      time--;
    }, 1000);

    return id;
  }


  useEffect(() => {
    console.log("kiteruyo")
    const chashHp = myHp;
    console.log(correctSentence)
    if (correctSentence !== 0) {
      refMyHp.current = myHp + 5;
      console.log("chash",chashHp)
      if (chashHp < 100) {
        console.log("100以下")
        setMyHp(refMyHp.current);
      }
    }
  },[correctSentence])

  useEffect(() => {
    refEnemyHp.current = enemyHp-damage;
  },[enemyHp]);

  useEffect(() => {
    refDamage.current = damage;
  },[damage]);

  //早期決着の場合の処理
  useEffect(() => {
    if (resultModalState) {
      clearInterval(countDownId.current);
    }
  }, [resultModalState]);

  useEffect(() => {
    if (started){

      countDownId.current = startTimer(refMyHp, refEnemyHp, refDamage);
    }
  },[started]);

  return (
    <div className="raid-outer">
      <p className="raid-timer"> {startTime}</p>
      <p className="raid-timer-unit">Sec</p>
    </div>
  );
};

export default Timer;
