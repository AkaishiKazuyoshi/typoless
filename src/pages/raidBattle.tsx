import io from "socket.io-client";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import "../css/raidBattleCss/raidBattle.css";
import Timer from "../raidBattleComponent/Timer";
import LinearProgress from '@mui/material/LinearProgress'; 
import BattleImageArea from "../raidBattleComponent/BattleImageArea";
import StartModal from "../raidBattleComponent/StartModal";
import ResultModal from "../raidBattleComponent/ResultModal";
import TypingArea from "../raidBattleComponent/TypingArea";
import { loginUserData } from "../globalVariables";
import { raidBossObject, damageLogObject } from "../raidBattleComponent/interface";

const socket = io();

type Props = {
    setSoundVolumeEffect: React.Dispatch<React.SetStateAction<number>>;
    soundVolumeEffect:number;
}

const RaidBattle:React.FC<Props> = ({ setSoundVolumeEffect, soundVolumeEffect }) => {
    const raidBossImgArray: string[] = ["arisa", "Erikosan_big"];
    const [typingWordList, setTypingWordList] = useState<string[] | null>(null);
    const [startModalState, setStartModalState] = useState<boolean>(true);
    const [resultModalState, setResultModalState] = useState<boolean>(false);
    const [started, setStart] = useState<boolean>(false);
    const [damage, setDamage] = useState<number>(0);
    const [damageLog, setDamageLog] = useState<damageLogObject[]>([]);
    const [enemyHp, setEnemyHp] = useState<number>(100);
    const [myHp, setMyHp] = useState<number>(100);
    const [enemyImg, setEnemyImg] = useState<string>("");
    const [questionType, setQuestionType] = useState<string>("word");
    const [typingSentenceList, setTypingSentenceList] = useState<string[] | null>(null);
    const [correctSentence, setCorrectSentence] =useState<number>(0);
    const [raidBoss, setRaidBoss] = useState<raidBossObject>({
        id: 0,
        name: localStorage.getItem("name"),
        maxHP: 0,
        image_name: "",
        is_beated:false,
        damage: 0,
    });
    window.scrollTo(0,0);
    document.querySelector("body")!.style.overflow = "hidden";

    function selectBossImage(bossHP:number,imageName:string){
        if(bossHP > 50){
            setEnemyImg(imageName + "N");
        }else{
            setEnemyImg(imageName + "F");
        }
    }

    socket.on("received_damage", (data) => {
        if(raidBoss.id === data.boss_id){
            console.log("received_damage",data)
            const newBossHp:number = enemyHp-Number(data.damage)/raidBoss.maxHP*100;
            setEnemyHp(newBossHp);
            selectBossImage(newBossHp, raidBoss.image_name);
            setDamageLog([...damageLog, data]);
        }
    });

    useEffect(() => {
        axios.get(`/get/question`).then((res: AxiosResponse) => {
          const randomWordsArray:string[] = [];
          let i = 0;
          while (i < 50) {
              if (res.data !== null) {
                  randomWordsArray.push(res.data[Math.floor(Math.random() * res.data.length)]);
              }
              i++;
          }
          setTypingWordList(randomWordsArray);
        });

        axios.get("/get/raidBoss").then((res: AxiosResponse) => {
            setRaidBoss(res.data);
            const newBossHp:number = (1-Number(res.data.damage)/Number(res.data.maxHP))*100;
            setEnemyHp(newBossHp);
            selectBossImage(newBossHp, res.data.image_name);
        });
    }, []);


    return (
        <>
            <div className="raidBackGround">
                <Timer
                startModalState={startModalState}
                setStartModalState={setStartModalState}
                setResultModalState={setResultModalState}
                resultModalState = {resultModalState}
                started={started}
                setStart={setStart}
                myHp={myHp}
                setMyHp={setMyHp}
                enemyHp={enemyHp}
                setEnemyHp={setEnemyHp}
                damage={damage}
                setDamage={setDamage}
                raidBoss={raidBoss}
                correctSentence={correctSentence}
                />
                <span className="raid-hp-var">
                    <LinearProgress variant="determinate" value={enemyHp}  className = "raid-enemyHp-var"/>
                </span>
                <BattleImageArea 
                enemyHp={enemyHp} 
                myHp={myHp} 
                enemyImg={enemyImg} 
                damage={damage} 
                raidBoss={raidBoss} 
                damageLog={damageLog}
                />
                <div className="raid-my-hp-container">
                    <img src={"icon_images/" + loginUserData.icon} alt="" className="raid-my-image" />
                    <LinearProgress variant="determinate" value={myHp}  className = "raid-myHp-var"/>
                </div>

                <StartModal
                    startModalState={startModalState}
                    setStartModalState={setStartModalState}
                    setQuestionType={setQuestionType}
                    questionType={questionType}
                    setSoundVolumeEffect={setSoundVolumeEffect}
                    soundVolumeEffect={soundVolumeEffect}
                    raidBoss={raidBoss}
                />
                <ResultModal
                    resultModalState={resultModalState}
                    setResultModalState={setResultModalState}
                    setStartModalState={setStartModalState}
                    enemyHp={enemyHp}
                    myHp={myHp}
                    raidBoss={raidBoss}
                />
                <TypingArea
                    typingWordList={typingWordList}
                    resultModalState={resultModalState}
                    startModalState={startModalState}
                    questionType={questionType}
                    setStart={setStart}
                    started={started} 
                    typingSentenceList={typingSentenceList}
                    setDamage={setDamage}
                    myHp={myHp}
                    setMyHp={setMyHp}
                    correctSentence={correctSentence}
                    setCorrectSentence={setCorrectSentence}
                />
            </div>
        </>
    );
  }
  
  export default RaidBattle;
  