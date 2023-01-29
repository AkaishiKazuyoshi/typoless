import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/headerCss/header.css";
import { clickSoundPlay, loginUserData, setSoundVolume, soundVolume } from "../globalVariables";

type Props = {
    setSoundVolumeEffect:Function;
    soundVolumeEffect:number;
  }

const Header:React.FC<Props> = ({setSoundVolumeEffect, soundVolumeEffect}) => {
    const imageArray =[
      "Abiruman.png",
      "AbirusanF.png",
      "AbirusanN.png",
      "Angry_Eriko.png",
      "arisa.png",
      "Bara-emon.png",
      "Baraemon.png",
      "Eriko san _KAPABA.GIF",
      "Eriko.png",
      "ErikosanF.png",
      "ErikosanN.png",
      "Kiki-san.png",
      "KikisanF.png",
      "KikisanN.png",
      "kotaro.png",
      "mittsu.png",
      "YusukesanF.png",
      "YusukesanN.png",
    ];
    const navigate = useNavigate();
    const isMute = soundVolume === 0 ? true : false;
    const [mute, setMute] = useState<boolean>(isMute);
    const [crossPeopleImg, setCrossPeopleImg] = useState<string>(imageArray[Math.floor(Math.random() * 18)]);

    const bgmPlay = useCallback(() => {
      const bgm = new Audio("sound/BGM.mp3") 
          bgm.currentTime = 0;
          bgm.volume = soundVolume;
          bgm.play();
    },[soundVolumeEffect])

    
    useEffect(() => {
      const changePeople = ()=>{
        setInterval(() => {
        const nextCrossPeople = imageArray[Math.floor(Math.random() * 18)];
        console.log(nextCrossPeople);
        setCrossPeopleImg(nextCrossPeople);
      },30000);
      }
      changePeople();
    },[])

    return (
      <div className="publicHeader">
        <img className="crossPeople" src={`images/${crossPeopleImg}`} onClick={()=>{
          bgmPlay();
          navigate("Barapon")
        }} />
        <img className="headerHomeIcon" src="images/home.png" onClick={() => {
          navigate("/");
          clickSoundPlay();
          setTimeout(()=>{
            window.location.reload();
          },500);
          }} />
        <div className="soundBarContainer">
            <img className="headerVolumeIcon" src={mute ? "images/mute.png" : "images/sound.png"} />
            <input 
            type={"range"} 
            min={0}
            max={10}
            step={1}
            value={soundVolumeEffect}
            onChange={(e)=>{
                if (e.target.value === "0") {
                    setMute(true);
                } else {
                    setMute(false);
                }
                setSoundVolumeEffect(e.target.value);
                setSoundVolume(Number(e.target.value));
                clickSoundPlay();
            }}
            />
        </div>
        <div className="userDataContainer">
          <p className="loginUserName">{loginUserData.name}</p>
          <img className="icon" src={"icon_images/" + loginUserData.icon} alt="icon" onClick={()=>{navigate("mypage")}}/>
        </div>
      </div>
    );
}

export default Header;