import React, { useEffect, useState, useRef, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import "../css/cpBattleCss/cpBattle.css";
import StartModal from "../cpBattleComponent/StartModal";
import ResultModal from "../cpBattleComponent/ResultModal";
import TypingArea from "../cpBattleComponent/TypingArea";
import Timer from "../cpBattleComponent/Timer";
import BattleImageArea from "../cpBattleComponent/BattleImageArea";
import LinearProgress from '@mui/material/LinearProgress'; 
import { type } from "@testing-library/user-event/dist/type";

// import { TypingCountProvider } from "./context/TypingCountContext";

type Props = {
  setSoundVolumeEffect: React.Dispatch<React.SetStateAction<number>>;
  soundVolumeEffect:number;
} 

const CpBattle:React.FC<Props> = ({setSoundVolumeEffect, soundVolumeEffect}) => {
  const [startModalState, setStartModalState] = useState<boolean>(true);
  const [resultModalState, setResultModalState] = useState<boolean>(false);
  const [typingWordList, setTypingWordList] = useState<string[] | null>(null);
  const [typingSentenceList, setTypingSentenceList] = useState<string[] | null>(null);
  const [enemyHp, setEnemyHp] = useState<number>(100);
  const [myHp, setMyHp] = useState<number>(100);
  const [questionType, setQuestionType] = useState<string>("word");
  const [started, setStart] = useState<boolean>(false);
  const [enemyImg, setEnemyImg] = useState<string>("arisa");
  window.scrollTo(0,0);
  document.querySelector("body")!.style.overflow = "hidden";
//  const  gameLevel = useRef()


  //問題文取得API
  useEffect(() => {
    axios.get(`/get/question`).then((res: AxiosResponse) => {
      const randomWordsArray:string[] = [];
      let i = 0;
      while (i < 100) {
          if (res.data !== null) {
              randomWordsArray.push(res.data[Math.floor(Math.random() * res.data.length)]);
          }
          i++;
      }
      setTypingWordList(randomWordsArray);
      // console.log(res);
    });
    axios.get("/get/question/js").then((res: AxiosResponse) => {
      console.log(res);
      const randomSentencesArray:string[] = [];
      let i = 0;
      while (i < 10) {
          if(res.data !== null){
              randomSentencesArray.push(res.data[Math.floor(Math.random() * res.data.length)]);
          }
          i++;
      }
      setTypingSentenceList(randomSentencesArray);
    })
  }, []);

  

  // useEffect(()=>{
  //   // console.log(questionType)
  // },[questionType])
 
  return (
    // <TypingCountProvider>
    <div className="cpBattleBackGround">
      {/* <Timer
        startModalState={startModalState}
        setResultModalState={setResultModalState}
        resultModalState = {resultModalState}
        started={started}
      /> */}
      <span className="hp-var">
        <p className="myName">{localStorage.name}</p>
        <LinearProgress variant="determinate" value={myHp}  className = "cpBattleMyHp-var"/>
        <Timer
        startModalState={startModalState}
        setResultModalState={setResultModalState}
        resultModalState = {resultModalState}
        started={started}
        />
        <p className="enemyName">{enemyImg}</p>
        <LinearProgress variant="determinate" value={enemyHp}  className = "cpBattleEnemyHp-var"/>
      </span>
      <BattleImageArea enemyHp={enemyHp} myHp={myHp} enemyImg={enemyImg} />
      <StartModal
        startModalState={startModalState}
        setStartModalState={setStartModalState}
        setQuestionType={setQuestionType}
        questionType={questionType}
        setSoundVolumeEffect={setSoundVolumeEffect}
        soundVolumeEffect={soundVolumeEffect}
        setEnemyImg={setEnemyImg}
        enemyImg={enemyImg}
      />
      <ResultModal
        resultModalState={resultModalState}
        setResultModalState={setResultModalState}
        setStartModalState={setStartModalState}
        enemyHp={enemyHp}
        myHp={myHp}
      />
      <TypingArea
        typingWordList={typingWordList}
        resultModalState={resultModalState}
        setResultModalState={setResultModalState}
        startModalState={startModalState}
        setEnemyHp={setEnemyHp}
        setMyHp={setMyHp}
        questionType={questionType}
        setStart={setStart}
        started={started} 
        typingSentenceList={typingSentenceList}
      />
    </div>
    // </TypingCountProvider>
  );
}

export default CpBattle;
