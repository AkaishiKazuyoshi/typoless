//import { breakpoints } from "@mui/system";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
//import { Navigate, useNavigate } from "react-router-dom";
import "../css/rankingCss/Ranking.css";
//import { clickSoundPlay } from "../globalVariables";


const Ranking: React.FC = () => {

  function getGuestScore(): Number {

    let retNum = -1;  // ゲストではない場合のスコア(-1)
    let score = localStorage.getItem("guestscore");
    if (score != null) {
      retNum = Number(score);
    }
    
    return (retNum);
  }

  // function clearGuestScore() {
  //   localStorage.removeItem("guestscore");
  // }

  // function clearRanking() {
  // }


  const [startDate, setStartDate] = useState("00-00-00");

  function dispRanking() {

    let row = 1;
    let i = 0;
    let guestScore = getGuestScore();

    const imgEl = document.getElementsByClassName("img");
    const nameEl = document.getElementsByClassName("name");
    const scoreEl = document.getElementsByClassName("score");

    // like a mock for test.
    //axios.get(`dummyData/dummy2.json`).then((res: AxiosResponse) => {

    axios.get(`/get/ranking/${startDate}`).then((res: AxiosResponse) => {

      const numOfMax = res.data.length < 30 ? res.data.length : 30;
      
      while (row <= numOfMax) {
        const iconEl = imgEl[row] as HTMLImageElement; 
        if (0 <= guestScore  && res.data[i].high_score <= guestScore) {
          iconEl.src = "icon_images/icon-default.webp";
          nameEl[row].textContent = "[ゲスト]";
          scoreEl[row].textContent = "WPM: " + guestScore;
          guestScore = -1;
        } else {
          iconEl.src = "icon_images/" + res.data[i].icon;
          nameEl[row].textContent = res.data[i].name;
          scoreEl[row].textContent = "WPM: " + res.data[i].high_score;
          i++;
        } 
        row++;
      }

      // 2021.01.17 tuki.
      // バグ：WPMが低い時、ランキングに載らない
      if (0 <= guestScore) {
        const iconEl = imgEl[row] as HTMLImageElement; 
        iconEl.src = "icon_images/icon-default.webp";
        nameEl[row].textContent = "[ゲスト]";
        scoreEl[row].textContent = "WPM: " + guestScore;
        guestScore = -1;
        row++;
      }

      // clean up.
      while (row <= 30) {
        const iconEl = imgEl[row] as HTMLImageElement; 
        iconEl.src = "";
        nameEl[row].textContent = "";
        scoreEl[row].textContent = "";
        row++
      }

    });
  }


  useEffect(() => {

    dispRanking();
    document.querySelector("body")!.style.overflow = ""
   
    // ************************************************************
    // clearGuestScoreをコールし、guest情報を削除すると
    // React.StrictModeにおいて、2回目のレンダリングでguestと認識されない
    // 
    //  return (clearGuestScore());
    // ************************************************************
    
  }, [startDate]);


  function changeStartDate() {

    const elements = document.getElementsByClassName("date");
    const dateEl = elements[0] as HTMLInputElement;

    let targetDate = "00-00-00";
    if (dateEl.value.length) {
      targetDate = dateEl.value;
    }

    /*** React Hook */
    setStartDate(targetDate);

    const tmpElements = document.getElementsByClassName("period");
    const periodEl = tmpElements[0] as HTMLSelectElement;
    periodEl.selectedIndex = 0;
  }


  function changePeriod() {

    let targetDate = "00-00-00";
    let yyyy;
    let mm;
    let dd;

    const dt = new Date();
    const elements = document.getElementsByClassName("period");
    const periodEl = elements[0] as HTMLSelectElement;

    switch (periodEl.selectedIndex) {
      // 指定なし
      case 0: targetDate = "00-00-00"; 
              break;
      // １週間
      case 1: dt.setDate(dt.getDate() - 7); 
              yyyy = dt.getFullYear();
              mm = dt.getMonth() + 1;
              dd = dt.getDate();
              targetDate = yyyy + "-" + mm + "-" + dd;
              break;
      // １ヶ月
      case 2: dt.setDate(dt.getDate() - 30); 
              yyyy = dt.getFullYear();
              mm = dt.getMonth() + 1;
              dd = dt.getDate();
              targetDate = yyyy + "-" + mm + "-" + dd;
              break;
    }

    /*** React Hook */
    setStartDate(targetDate);

    const tmpElements = document.getElementsByClassName("date");
    const dateEl = tmpElements[0] as HTMLInputElement;
    dateEl.value = "";
  }

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,  
                  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
                  21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  const addRankingTags = numbers.map((elem, i) => {
    return (
        <div className="block">
          <div className="number">{elem}</div>
          <img className="img" alt=""></img>
          <div className="name"></div>
          <div className="score"></div>
        </div>
        );
  });

  //const navigate = useNavigate();

  return (
    <div className="rannkingBackGround">
      <br />
      <br />
      <br />
      <div className="ranking">
        <div className="block items">
          <div className="number">順位</div>
          <img className="img"></img>
          <div className="name">プレイヤー</div>
          <div className="score">スコア</div>
          <div className="period-container">
            <select className="period" onChange={()=>{changePeriod();}}>
              <option value="none">全期間</option>
              <option value="1week">１週間</option>
              <option value="1month">１ヶ月</option>
            </select>
            <input type="date" className="date" onChange={()=>{changeStartDate();}}></input>
          </div>
        </div>
          { addRankingTags }
      </div>
    </div>
  );
};

export default Ranking;

/* EOF */
