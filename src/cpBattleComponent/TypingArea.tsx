import React, {
  useEffect,
  useCallback,
  useState,
  useContext,
  useRef,
} from "react";
import Word from "./Word";
import {
  correctTypingCounter,
  setCorrectTypingCounter,
  inCorrectTypingCounter,
  setInCorrectTypingCounter,
  totalTypingCounter,
  setTotalTypingCounter,
  damageInterval,
  typoDamageRatio,
  damageRatio,
  soundVolume,
} from "../globalVariables";
import { NavigateNextRounded } from "@mui/icons-material";

type Props = {
  typingWordList?: string[] | null;
  resultModalState: boolean;
  setResultModalState: Function;
  startModalState: boolean;
  setEnemyHp: Function;
  setMyHp: Function;
  questionType: string;
  setStart:Function;
  started:boolean;
  typingSentenceList:string[] | null;
};

const TypingArea: React.FC<Props> = ({
  typingWordList,
  resultModalState,
  setResultModalState,
  startModalState,
  setEnemyHp,
  setMyHp,
  questionType,
  setStart,
  started,
  typingSentenceList
}) => {
  const attackTimerId = useRef<number | NodeJS.Timeout>(0);
  const attackIntervalId = useRef<number | NodeJS.Timer>(0);
  const attackFlag = useRef<boolean>(false);
  let counter = 0;
  const LetterTags = document.getElementsByClassName(
    "unSpotLetter"
  ) as HTMLCollectionOf<HTMLElement>;
  const spotTag = document.getElementsByClassName(
    "spotLetter"
  ) as HTMLCollectionOf<HTMLElement>;
  const inputSound = new Audio("sound/kick.mp3");
  const damageSound = new Audio(
    `sound/damage${Math.floor(Math.random() * 5) + 1}.mp3`
  );
  let [questionNumber, setQuestionNumber] = useState<number>(0);
  

  useEffect(() => {
    if (resultModalState) {
      document.removeEventListener("keydown", keypressEvent, false);
      clearTimeout(attackTimerId.current);
      clearInterval(attackIntervalId.current);
      console.log("removeしました！");
    }
  }, [resultModalState]);

  useEffect(() => {
    if (!startModalState) {
      document.querySelectorAll(".unSpotLetter")[0].classList.add("spotLetter");
      document.addEventListener("keydown", keypressEvent, false);
    }
  }, [startModalState]);

  // useEffect(()=>{

  // },[questionType])

  //タイピング回数の初期化
  useEffect(() => {
    setCorrectTypingCounter(0);
    setInCorrectTypingCounter(0);
    setTotalTypingCounter(0);

    
  }, []);

  const beAttacked = useCallback((prev: number) => {
    const newHp = prev - damageRatio;
    if (newHp <= 0) {
      setResultModalState(true);
    }
    return newHp;
  }, []);
  const beAttackedTypo = useCallback((prev: number) => {
    const newHp = prev - typoDamageRatio;
    if (newHp <= 0) {
      setResultModalState(true);
    }
    return newHp;
  }, []);

  const enemyAttack = useCallback((prev: number) => {
    const newHp = prev - 1;
    if (newHp <= 0) {
      setResultModalState(true);
    }
    return newHp;
  }, []);

  const keypressEvent = useCallback((e: any) => {
    clearTimeout(attackTimerId.current);
    clearInterval(attackIntervalId.current);
    if (!started) {
      setStart(true);
    }
  

    window.addEventListener('popstate', function(e) {
      inputSound.pause();
      damageSound.pause();
      clearTimeout(attackTimerId.current);
      clearInterval(attackIntervalId.current);
    });
    

    if (e.key === spotTag[0].innerHTML || e.key === spotTag[0].innerText) {
      spotTag[0].classList.add("correctLetter");
      

      if (spotTag[0].className.indexOf("lastSpan") !== -1) {
        setQuestionNumber(++questionNumber);
        counter = -1;
      }

      
      spotTag[0].classList.remove("spotLetter");
      if (LetterTags.length !== counter + 1) {
        LetterTags[++counter].classList.add("spotLetter");
      }

      setTotalTypingCounter(totalTypingCounter + 1);
      setCorrectTypingCounter(correctTypingCounter + 1);

      //enemy攻撃処理
      setEnemyHp(enemyAttack);
      inputSound.currentTime = 0;
      inputSound.volume = soundVolume;
      inputSound.play();
    } else if (e.key !== "Shift" && e.key !== "Enter" && e.key !== "Backspace" && e.key !== "Escape") {
      console.log("nanndekitennno?")
      const damageSound = new Audio(
        `sound/damage${Math.floor(Math.random() * 5) + 1}.mp3`
      );
      setTotalTypingCounter(totalTypingCounter + 1);
      setInCorrectTypingCounter(inCorrectTypingCounter + 1);

      setMyHp(beAttackedTypo);
      damageSound.volume = soundVolume;
      damageSound.currentTime = 0;
      damageSound.play();
    }
    //何も操作がない時の単発攻撃
    attackTimerId.current = setTimeout(() => {
      setMyHp(beAttacked);
      attackFlag.current = true;
    }, damageInterval);

    //何も操作がない時の定期攻撃
    attackIntervalId.current = setInterval(() => {
      if (!attackFlag.current) {
        setMyHp(beAttacked);
        const damageSound = new Audio(
          `sound/damage${Math.floor(Math.random() * 5) + 1}.mp3`
        );
        
        damageSound.volume = soundVolume;
        damageSound.currentTime = 0;
        setTimeout(()=>{
          damageSound.play();
        },300)
      } else {
        attackFlag.current = false;
      }
    }, damageInterval);
  }, []);

  return (
    <div className={questionType === "word" ? "typingContainer" : "sentenceTypingContainer"}>
      <Word 
        typingWordList={typingWordList}
        typingSentenceList={typingSentenceList}
        questionType={questionType}
        questionNumber={questionNumber}
      />
    </div>
  );
};

export default TypingArea;
