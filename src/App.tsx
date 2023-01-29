import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  CpBattle from './pages/CpBattle'
import  Ranking from './pages/Ranking'
import  RaidBattle from './pages/raidBattle'
import  RankingBossDamage from './pages/RankingBossDamage'
import  Top from './pages/Top'
import  MyPage from './pages/MyPage'
import Barapon from "./pages/Barapon";
import { soundVolume } from "./globalVariables";
import { useState } from "react";
import Header from "./headerComponent/Header";

// import { TypingCountProvider } from "./context/TypingCountContext";

function App() {
  localStorage.setItem("volume",String(soundVolume));
  const [soundVolumeEffect, setSoundVolumeEffect] = useState(soundVolume * 10);
  let existUserName = localStorage.name ? true : false;
  const [ logined, setLogin ] = useState<boolean>(existUserName);
  return (
    // <TypingCountProvider>
    <BrowserRouter>
        <Header
         setSoundVolumeEffect={setSoundVolumeEffect} 
         soundVolumeEffect={soundVolumeEffect}
         />
    <Routes>
        <Route path="/" element={<Top 
        setSoundVolumeEffect={setSoundVolumeEffect} 
        soundVolumeEffect={soundVolumeEffect}
        logined={logined}
        setLogin={setLogin}
        />} />
        <Route path="/cpBattle" element={<CpBattle 
        setSoundVolumeEffect={setSoundVolumeEffect} 
        soundVolumeEffect={soundVolumeEffect}
        />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="raidBattle" element={<RaidBattle 
        setSoundVolumeEffect={setSoundVolumeEffect}
        soundVolumeEffect={soundVolumeEffect}
        />} />
        <Route path="rankingBossDamage" element={<RankingBossDamage />} />
        <Route path="Barapon" element={<Barapon />} />
        <Route path="mypage" element={<MyPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
    // </TypingCountProvider>
  );
}

export default App;
