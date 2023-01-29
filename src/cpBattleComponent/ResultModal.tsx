import React, { useEffect, useCallback, useRef, useState } from "react";
import "../css/cpBattleCss/ResultModal.css";
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

interface Props {
  resultModalState: boolean;
  setStartModalState: Function;
  setResultModalState: Function;
  enemyHp: number;
  myHp: number;
}

function ResultModal({
  resultModalState,
  setResultModalState,
  setStartModalState,
  enemyHp,
  myHp,
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

  const [ranking, setRanking] = useState(0);

  useEffect(() => {

    if (resultModalState) {
      //myRanking取得API
      axios.get(`/get/myRanking?score=${wpm}`).then((res: AxiosResponse) => {
        console.log("res.data.ranking", res.data.ranking);
        setRanking(res.data.ranking);
      });
      if (enemyHp > myHp) {
        setWinFlag(false);
      } else {
        setWinFlag(true);
        console.log(winFlag);
      }

      if (loginUserData.name !=="ゲスト") {
        axios.put(`/put/high_score`,{name:loginUserData.name,high_score:wpm}).then((res: AxiosResponse) => {
        console.log(res.data)        

        /*** 追加 (tuki. 2023.01.06) ***/
        console.log("loginUserData.name: ", loginUserData.name);
        localStorage.removeItem("guestscore");
        })

        axios.post("/post/scoreHistory",{name:loginUserData.name,score:wpm,timestamp:moment().format("YYYY-MM-DD HH:mm:ss")})
        .then((res:AxiosResponse)=>{
          console.log(res.data);

        });
      } else {

      /*** 追加 (tuki. 2022.12.26) ******************/
        const score = String(wpm);
        localStorage.setItem("guestscore", score);
        console.log("guestscore: ", score);
      /*********************************************/

      }
    }

  }, [resultModalState]);


  useDidUpdateEffect(()=>{
    console.log("first");
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
      className={"result-modal" + (resultModalState ? "-visible" : "-hidden")}
    >
      <div>{winFlag ? "あなたの勝ちです！" : "あなたは負けましたw"}</div>
      <br />
      <div>あなたのwpmは{wpm}です</div>
      <div className="typoComent">
        全 {totalTypingCounter} タイピングの内 <br />
        {inCorrectTypingCounter > 0
          ? `${inCorrectTypingCounter}回間違えてるんですけど...`
          : "ミスなし!Typoless!"}
      </div>
      <br />
      <br />
      <div>今回のスコアのランキングは、{ranking}位です</div>
      <div className="rankingComent">
        {ranking < 10
          ? "すっっご！"
          : ranking < 20
          ? "まあまあやね"
          : "まだまだだね"}
      </div>
      <Link  to={`/ranking`}>ランキング</Link>
      <div>enterを押すと最初に戻ります</div>
    </div>
  );
}

export default ResultModal;
