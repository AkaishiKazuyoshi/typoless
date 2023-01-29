import  React, { useState, useEffect, useCallback } from "react";
import { NavigateFunction,useNavigate } from "react-router-dom";
import Login from "../TopComponent/Login";
import { clickSoundPlay, loginUserData, setSoundVolume } from "../globalVariables";
import Signup from "../TopComponent/Signup";
import { ModeComment } from "@mui/icons-material";

type Props = {
  setSoundVolumeEffect:Function;
  soundVolumeEffect:number;
  logined:boolean;
  setLogin:(bool:boolean) => void;
}

const Top:React.FC<Props> = ({setSoundVolumeEffect, soundVolumeEffect, logined, setLogin}) => {
    let existUserName = localStorage.name ? true : false;
    const navigate: NavigateFunction = useNavigate();
    const login: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("MuiBox-root") as HTMLCollectionOf<HTMLElement>;
    const hoverMenu = document.getElementsByClassName("hoverMenu") as HTMLCollectionOf<HTMLElement>;
    let userDataContainer:HTMLCollectionOf<HTMLElement>;

    useEffect(()=>{
      userDataContainer = document.getElementsByClassName("userDataContainer") as HTMLCollectionOf<HTMLElement>;
    console.log(userDataContainer)
      if (userDataContainer[0] !== undefined && hoverMenu[0] !== undefined) {
        console.log("kita")
        userDataContainer[0].addEventListener("mouseover", visibleMenu);
        hoverMenu[0].addEventListener("mouseleave", hiddenMenu);
      }
    },[logined])
    // const [ logined, setLogin ] = useState<boolean>(existUserName);
    // const [ signed, setSignup ] = useState<boolean>(false);
    window.scrollTo(0,0);
    document.querySelector("body")!.style.overflow = "hidden";

    const visibleMenu = useCallback(() => {
      userDataContainer[0].removeEventListener("mouseover", visibleMenu);
      hoverMenu[0].style.display = "flex";
    },[]);

    const hiddenMenu = useCallback(() => {
      hoverMenu[0].style.display = "none";
      setTimeout(() => {
        userDataContainer[0].addEventListener("mouseover", visibleMenu);
      },300);
    },[]);

    function loginForm(){
      if (logined) {
        // const topLoginButton: HTMLElement | null = document.getElementById("topLoginButton");
        localStorage.removeItem("name");
        localStorage.removeItem("high_score");
        localStorage.removeItem("icon");
        loginUserData.name = "ゲスト";
        loginUserData.high_score = null;
        loginUserData.icon = "icon-default.webp";
        // console.log("topLoginButton" ,topLoginButton)
        // topLoginButton!.innerText = "ログイン";
        window.alert("ログアウトしました。");
        setLogin(false);
      } else {
        login[0].style.display = "flex";
      }
    }


    // const volumeUp = () => {
    //   if (soundVolumeEffect < 10) {
    //     setSoundVolumeEffect(++soundVolumeEffect);
    //     setSoundVolume(soundVolumeEffect);
    //   }
    // }
    
    // const volumeDown = () => {
    //   if (soundVolumeEffect > 0){
    //     setSoundVolumeEffect(--soundVolumeEffect);
    //     setSoundVolume(soundVolumeEffect);
    //   }
    // }

    

    return (
      <>
        <div className="backGround" >
          {/* <img className="title" src="images/Free_Sample_By_Wix.png" /> */}
          <img className="topTitle" src="images/logo2.png" />
          <Login setLogin={setLogin} />
          <Signup setLogin={setLogin} />

          <div className="buttonContainer">
              {/* <button className="topButton" id="topLoginButton" onClick={() => {
                loginForm();
                clickSoundPlay();
                }}>{existUserName ? "ログアウト" : "ログイン"}
              </button> */}

              <button className="topButton" onClick={()=>{
                console.log(userDataContainer[0])
                userDataContainer[0].removeEventListener("mouseover", visibleMenu);
                hoverMenu[0].removeEventListener("mouseleave", hiddenMenu);
                navigate("cpBattle");
                clickSoundPlay();
                }}>CP対戦
              </button>
              <button className="topButton" onClick={()=>{
                navigate("raidBattle");
                clickSoundPlay();
                userDataContainer[0].removeEventListener("mouseover", visibleMenu);
                hoverMenu[0].removeEventListener("mouseleave", hiddenMenu);
                }}>レイドバトル
              </button>
              <button className="topButton" onClick={()=>{
                navigate("ranking");
                clickSoundPlay();
                userDataContainer[0].removeEventListener("mouseover", visibleMenu);
                hoverMenu[0].removeEventListener("mouseleave", hiddenMenu);
                }}>ランキング
              </button>
              <button className="topButton" onClick={()=>{
                navigate("rankingBossDamage");
                clickSoundPlay();
                userDataContainer[0].removeEventListener("mouseover", visibleMenu);
                hoverMenu[0].removeEventListener("mouseleave", hiddenMenu);
                }}>対ボスダメージランキング
              </button>
              {/* <button className="topButton" onClick={()=>{
                navigate("mypage");
                clickSoundPlay();
                userDataContainer[0].removeEventListener("mouseover", visibleMenu);
                hoverMenu[0].removeEventListener("mouseleave", hiddenMenu);
                }}>MyPage
              </button> */}
          </div>
          <div className="eriko-gif-container">
            <img src="../images/Eriko san _KAPABA.GIF" alt="erikosan gif" />
          </div>
        </div>
        <div className="hoverMenu">
          <p
            className="hoverMenuElement"
            onClick={() => {
                  loginForm();
                  clickSoundPlay();
            }
          }>{existUserName ? "ログアウト" : "ログイン・登録"}</p>
          <p
            className="hoverMenuElement"
            onClick={() => {
              navigate("mypage");
            }}
          >マイページ</p>
        </div>
        {/* <div className="soundVolumeConteinar" >
          <p>音量: {soundVolumeEffect}</p>
            <button 
              className="volume-button"
              onClick={soundVolumeEffect > 0 ? ()=>{
                volumeDown();
                clickSoundPlay();
                }:
                ()=>{}
              }  >ー
            </button>
            <button 
              className="volume-button"
              onClick={soundVolumeEffect < 10 ? ()=>{
                volumeUp();
                clickSoundPlay();
                }:
                ()=>{}
              } >＋
            </button>
        </div> */}
        {/* <div className="userDataContainer">
          <p className="loginUserName">{loginUserData.name}</p>
          <img className="icon" src={"icon_images/" + loginUserData.icon} alt="icon" onClick={()=>{navigate("mypage")}}/>
        </div> */}
     </>
    );
  }
  
  export default Top;
  