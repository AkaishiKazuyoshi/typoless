import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import Word from "./Word";
import {
  correctTypingCounter,
  setCorrectTypingCounter,
  setInCorrectTypingCounter,
  totalTypingCounter,
  setTotalTypingCounter,
  soundVolume,
} from "../globalVariables";

type Props = {
  typingWordList?: string[] | null;
  resultModalState: boolean;
  startModalState: boolean;
  questionType: string;
  setStart:Function;
  started:boolean;
  typingSentenceList:string[] | null;
  setDamage: Function;
  myHp:number;
  setMyHp:Function;
  correctSentence:number;
  setCorrectSentence:Function;
};

const TypingArea: React.FC<Props> = ({
  typingWordList,
  resultModalState,
  startModalState,
  questionType,
  setStart,
  started,
  typingSentenceList,
  setDamage,
  myHp,
  setMyHp,
  correctSentence,
  setCorrectSentence
}) => {
  const attackTimerId = useRef<number | NodeJS.Timeout>(0);
  const attackIntervalId = useRef<number | NodeJS.Timer>(0);
  const attackFlag = useRef<boolean>(false);
  const startedCounter = useRef<number>(0);
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
      if(startedCounter.current === 0){
        document.querySelectorAll(".unSpotLetter")[0].classList.add("spotLetter");
        startedCounter.current ++;
      }
      document.addEventListener("keydown", keypressEvent, false);
    } else {
      document.removeEventListener("keydown", keypressEvent, false);
    }
  }, [startModalState]);

  //タイピング回数の初期化
  useEffect(() => {
    setCorrectTypingCounter(0);
    setInCorrectTypingCounter(0);
    setTotalTypingCounter(0);
  }, []);

  const enemyAttack = useCallback((prev: number) => {
    const newDamage = prev + 1;
    return newDamage;
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

    console.log(e.code   )
    if (e.key === spotTag[0].innerHTML || e.key === spotTag[0].innerText) {
      spotTag[0].classList.add("correctLetter");
      if(e.code === "Space" ) {
        console.log("space!!!")
        setCorrectSentence(++correctSentence);
      }
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
      setDamage(enemyAttack);
      inputSound.currentTime = 0;
      inputSound.volume = soundVolume;
      inputSound.play();
    } else if (e.key !== "Shift" && e.key !== "Enter" && e.key !== "Backspace") {
      damageSound.volume = soundVolume;
      damageSound.currentTime = 0;
      damageSound.play();
    }
  }, []);

  return (
    <div className={questionType === "word" ? "raid-typingContainer" : "sentenceTypingContainer"}>
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
