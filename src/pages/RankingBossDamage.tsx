//import { ConstructionOutlined } from "@mui/icons-material";
//import { breakpoints } from "@mui/system";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
//import { Navigate, useNavigate } from "react-router-dom";
import "../css/rankingCss/Ranking.css";
//import { clickSoundPlay } from "../globalVariables";


const RankingBossDamage: React.FC = () => {

  const [selectedBossId, setSelectedBossId] = useState<Number>(0);

  function clearRanking() {

    const imgEl = document.getElementsByClassName("img");
    const nameEl = document.getElementsByClassName("name");
    const scoreEl = document.getElementsByClassName("score");

    let row = 1;
    while (row <= 30) {
      const iconEl = imgEl[row] as HTMLImageElement; 
      iconEl.src = "";
      nameEl[row].textContent = "";
      scoreEl[row].textContent = "";
      row++;
    }
  }

  function dispRanking() {

    let row = 1;
    let i = 0;
    const imgEl = document.getElementsByClassName("img");
    const nameEl = document.getElementsByClassName("name");
    const scoreEl = document.getElementsByClassName("score");

    axios.get(`/get/bossDamageRanking/${selectedBossId}`).then((res: AxiosResponse) => {
       const numOfMax = res.data.length < 30 ? res.data.length : 30;
       while (row <= numOfMax) {
        const iconEl = imgEl[row] as HTMLImageElement; 
        iconEl.src = "icon_images/" + res.data[i].icon;
        nameEl[row].textContent = res.data[i].name;
         scoreEl[row].textContent = "TOTAL: " + res.data[i].boss_damage;
         i++;
         row++;
       }
    });
  }


 function addSelectedItems() {
  
    const elements = document.getElementsByClassName("bosses");
    const selectEl = elements[0] as HTMLSelectElement;

    if (selectEl.length <= 0) {
      axios.get(`/get/bosses`).then((res: AxiosResponse) => {
        for (const elem of res.data) {
          const optionEl = document.createElement("option");
          optionEl.text = elem.name;
          optionEl.value = elem.id;
          selectEl.appendChild(optionEl);
        }
        for (let i = 0; i < res.data.length; i++) {
          if ( ! res.data[i].is_beated) {
            selectEl.value = res.data[i].id;
            /***  React Hook ***/
            setSelectedBossId(res.data[i].id);
            break;
          }
        }

      });
    }
  }

  useEffect(() => {
    clearRanking();
    dispRanking();
    document.querySelector("body")!.style.overflow = "";
  }, [selectedBossId]);

  useEffect(() => {
    addSelectedItems();
  }, []);


  function selectedBoss() {

    // <select>
    const elements = document.getElementsByClassName("bosses");
    const bossesEl = elements[0] as HTMLSelectElement;
    const bossId = bossesEl.value;

    /*** React Hook */
    setSelectedBossId(Number(bossId));
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

 // const navigate = useNavigate();

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
          <div className="score">ダメージ</div>
            <select className="bosses" onChange={()=>{selectedBoss();}}>
              {/*
              <option value="">eriko1</option>
              <option value="">eriko2</option>
              */}
            </select>
        </div>
        { addRankingTags }
      </div>
    </div>
  );
};

export default RankingBossDamage;

/* EOF */
