import React, { useEffect, useState } from "react";
import Graph from "../myPageComponent/Graph";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import "../css/baraponCss/barapon.css"


const Barapon: React.FC = () => {
  window.scrollTo(0,0);
  document.querySelector("body")!.style.overflow = "hidden";

  const imageArray1 =[
    "Abiruman.png",
    "AbirusanF.png",
    "AbirusanN.png",
    "Angry_Eriko.png",
    "arisa.png",
    "Bara-emon.png",
    "Baraemon.png",
    "Eriko san _KAPABA.GIF",
    "Eriko.png",
  ];
  const imageArray2 =[
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
  const imageTagArray1 =imageArray1.map((image,index)=> { return <img key={index + "array1"} className="topImage" src={`images/${image}`} />})
  const imageTagArray2 =imageArray2.map((image,index)=> { return <img key={index + "array2"} className="topImage" src={`images/${image}`} />})


  return (
    <>
    <div className="baraponBackGround">
      <div className="topImageContainer"> 
        {imageTagArray1}
      </div>
      <div className="numaponContainer">
        <img className="numapon" src="images/YukkuriNuma.png" />
        <p className="numaname">Numapon</p>
      </div>
      <div className="barasanContainer">
        <img className="barasan" src="images/Bara-emonface.png" />
        <p className="baraname">バラさん</p>
      </div>
      <p className="message">Thanks!!</p>
      <div className="bottomImageContainer">
        {imageTagArray2}
      </div>
    </div>
    </>
  );

};

export default Barapon;

// </React.StrictMode>

/* EOF */
