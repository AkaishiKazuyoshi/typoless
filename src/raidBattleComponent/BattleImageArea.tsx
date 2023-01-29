import React, { useEffect, useRef, useState } from "react";
// import { useDidUpdateEffect } from "./useDidUpdateEffect";
import "../css/raidBattleCss/BattleImageArea.css";
import { soundVolume, loginUserData } from "../globalVariables";
import { raidBossObject, damageLogObject } from "../raidBattleComponent/interface";

type Props = {
  enemyHp: number;
  myHp: number;
  enemyImg: string;
  damage: number;
  raidBoss: raidBossObject;
  damageLog: damageLogObject[];
};
const Enemy: React.FC<Props> = ({ enemyHp, myHp, enemyImg, damage, raidBoss, damageLog }) => {
  const panchiImageId = useRef<NodeJS.Timeout | null>();
  const flappeImageId = useRef<NodeJS.Timeout | null>();
  const [reverseDamgeLog, setReverseDamageLog] = useState<damageLogObject[]>([...damageLog].reverse()); 
  useEffect(() => {
    if (enemyHp < 100) {
      const image = document.querySelector(".raid-enemy-image");
      const panchiImage = document.querySelector(".raid-panchi-image");
      if (image !== null && panchiImage !== null) {
        image.classList.add("blinking");
        panchiImage.classList.add("attack-blinking");

        setTimeout(() => {
          image.classList.remove("blinking");
        }, 100);

        panchiImageId.current = setTimeout(() => {
          if (panchiImageId.current) {
            clearTimeout(panchiImageId.current);
          }

          panchiImage.classList.remove("attack-blinking");
        }, 300);
      }
    }
  }, [enemyHp]);

  useEffect(() => {
    const enemySound = enemyImg.indexOf("Eriko") !== -1 ? 
    new Audio(
      `sound/erikoAttack${Math.floor(Math.random() * 5) + 1}.mp3`
    ):
    new Audio(
      `sound/${enemyImg}Attack${Math.floor(Math.random() * 5) + 1}.mp3`
    )
    ;
    if (myHp < 100) {
      const image = document.querySelector(".raid-my-image");
      const flappeImage = document.querySelector(".raid-flappe-image");
      if (image !== null && flappeImage !== null) {
        image.classList.add("blinking");
        flappeImage.classList.add("attack-blinking");
        enemySound.currentTime = 0;
        enemySound.volume = soundVolume;
        enemySound.play();

        setTimeout(() => {
          image.classList.remove("blinking");
        }, 100);


        flappeImageId.current = setTimeout(() => {
          if (flappeImageId.current) {
            clearTimeout(flappeImageId.current);
          }
          flappeImage.classList.remove("attack-blinking");
        }, 300);
      }
    }
  }, [myHp]);

  useEffect(() => {
    if (damage > 0) {
      const image = document.querySelector(".raid-enemy-image");
      const panchiImage = document.querySelector(".raid-panchi-image");
      if (image !== null && panchiImage !== null) {
        image.classList.add("blinking");
        panchiImage.classList.add("attack-blinking");

        setTimeout(() => {
          image.classList.remove("blinking");
        }, 100);

        panchiImageId.current = setTimeout(() => {
          if (panchiImageId.current) {
            clearTimeout(panchiImageId.current);
          }

          panchiImage.classList.remove("attack-blinking");
        }, 300);
      }
    }
  }, [damage]);

  useEffect (() => {
    setReverseDamageLog([...damageLog].reverse()); 
  },[damageLog])

  return (
    <div className="raid-battle-image-container">
      <div className="raid-enemy-image-container">
        <div className="raid-enemy-name-container">
          <span className="raid-enemy-name">{raidBoss.name}</span>
        </div>
        <img src={`images/${enemyImg}.png`} alt="" className="raid-enemy-image" />
      </div>
        <div className="raid-attack-image-container">
          <img src="images/guPanchi.png" alt="" className="raid-panchi-image" />
          <img src="images/MacchaFrap.PNG" alt="" className="raid-flappe-image" />
        </div>
        <div className="raid-battle-damage-log-container">
          {reverseDamgeLog.map((data,index)=>(
            <div className="raid-battle-damage-log-line-conteiner" key={index}>
              <div className="raid-battle-damage-log-line">
                {data.name} は {data.damage}のダメージを与えた
              </div>
            </div>
          ))
          }
        </div>
    </div>
  );
};

export default Enemy;
