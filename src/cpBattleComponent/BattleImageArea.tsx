import React, { useEffect, useRef, useState } from "react";
// import { useDidUpdateEffect } from "./useDidUpdateEffect";
import "../css/cpBattleCss/BattleImageArea.css";
import { soundVolume } from "../globalVariables";

type Props = {
  enemyHp: number;
  myHp: number;
  enemyImg: string
};
const Enemy: React.FC<Props> = ({ enemyHp, myHp, enemyImg }) => {
  const panchiImageId = useRef<NodeJS.Timeout | null>();
  const flappeImageId = useRef<NodeJS.Timeout | null>();
  useEffect(() => {
    console.log("useEffectに入りました");
    if (enemyHp < 100) {
      const image = document.querySelector(".enemy-image");
      const panchiImage = document.querySelector(".panchi-image");
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
      const image = document.querySelector(".my-image");
      const flappeImage = document.querySelector(".flappe-image");
      // console.log(flappeImage);
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

  return (
    <div className="battle-image-container">
        <img src="images/Bara-emon.png" alt="" className="my-image" />
        <div className="attack-image-container">
          <img src="images/guPanchi.png" alt="" className="panchi-image" />
          <img src="images/MacchaFrap.png" alt="" className="flappe-image" />
        </div>
        
      <img src={`images/${enemyImg}.png`} alt="" className="enemy-image" />
    </div>
  );
};

export default Enemy;
