import React, { useEffect, useState } from "react";
import Graph from "../myPageComponent/Graph";
import "../css/myPageCss/myPage.css";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

// type Props = {
//   playerName: String;
// };

/*
const MyPage: React.FC<Props> = ({
  playerName
}) => {
*/


const MyPage: React.FC = () => {

  const [player, setPlayer] = useState("");
  const [highScore, setHighScore] = useState(0);
  const [profile, setProfile] = useState("");
  window.scrollTo(0,0);
  document.querySelector("body")!.style.overflow = "hidden";

  function dispPlayerInfo() {

    const userName = localStorage.getItem("name");

    if (userName === null) {
      /***  React Hook ***/
      setPlayer("GUEST");
      return;
    }

    // like a mock for test.
    // axios.get(`dummyData/dummy3.json`).then((res: AxiosResponse) => {

    axios.get(`/get/accountInfo/${userName}`).then((res: AxiosResponse) => {
      /***  React Hook ***/
      setPlayer(res.data[0].name);
      setHighScore(res.data[0].high_score);
      setProfile(res.data[0].icon);
    });
  }


  useEffect(() => {
    dispPlayerInfo();
  }, []);


  const navigate = useNavigate();
  // document.querySelector("body")!.style.overflow = "";
  return (
    <>
      <div className="mypagebackGround">
        <br/>
        {/* <button type="button" className="close" onClick={() => navigate("/")}>戻る</button> */}
        <label className="player">PLAYER : {player}</label><br/>
        <label className="highscore">HIGH SCORE : {highScore}</label><br/>
        <label className="profile"></label>PROFILE : {profile}<br/>
        <img className="img"></img><br/>
        <br/>
        <div className="graph-container"><Graph /></div> 
      </div>
    </>
  );

};

export default MyPage;

// </React.StrictMode>

/* EOF */
