//グローバルで使用したい変数を宣言
//変数と更新用の関数を定義すること

export let correctTypingCounter:number = 0;
export const setCorrectTypingCounter = (num: number):void => {
  correctTypingCounter = num;
}

export let inCorrectTypingCounter:number = 0;
export const setInCorrectTypingCounter = (num: number):void => {
  inCorrectTypingCounter = num;
}

export let totalTypingCounter:number = 0;
export const setTotalTypingCounter = (num: number):void => {
  totalTypingCounter = num;
}

// export let correctSentence = 0;
// export const setCorrectSentence = (num:number):void => {
//   correctSentence = num;
// }

//ログインしたユーザーのデータを格納する変数
export let loginUserData:{name: string, high_score: number | null, icon: string} = localStorage.name ? {name: localStorage.name, high_score: localStorage.high_score, icon: localStorage.icon} : { name: "ゲスト", high_score: null, icon: "icon-default.webp"};
export let setLoginUserData = (userData:{name: string, high_score: number, icon: string}):void => {
  loginUserData = userData;
  // console.log(loginUserData);
}

//icon_imageの一覧配列
export let iconImgArray:string[] = [
  "Seal.png", "Squid.png", "Cow.png", "Horse.png", "Wolf.png", "Hippo.png", "Fox.png", "Giraffe.png", 
  "Bear.png", "Koala.png", "Monkey.png", "Deer.png", "PlarBear.png", "Elephant.png", "Chimpanzee.png",
   "Bird.png", "Cat.png", "Panda.png", "Sheep.png", "Chick.png", "Pig.png", "Penguin.png"
];
export const setIconImgArray = (array: string[]):void => {
  iconImgArray = array;
}

//タイピング遅い時のダメージ　%表示
export let damageRatio:number = 5;
export let setDamageRatio = (num: number):void => {
  damageRatio = num;
  // console.log(damageRatio);
};

//タイポ時のダメージ　%表示
export let typoDamageRatio = 5;
export let setTypoDamageRatio = (num: number):void => {
  typoDamageRatio = num;
  // console.log(typoDamageRatio);
};

//m秒表示
export let damageInterval:number = 1000;
export let setDamageInterval = (num: number):void => {
  damageInterval = num;
  // console.log(damageInterval);
};

//startTimeの変数
export let startTime:number = 30;
export let setStartTime = (num: number):void => {
  startTime = num;
  // console.log(countDownTimer);
};

//countDownTimerの変数
export let countDownTimer:number = 0;
export let setCountDownTimer = (num: number):void => {
  countDownTimer = num;
  // console.log(countDownTimer);
};

//volume調整
export let soundVolume:number = Number(localStorage.volume) === 0 ? 0 : Number(localStorage.volume) || 0.5;
export const setSoundVolume = (num:number):void => {
  soundVolume = num / 10;
  localStorage.volume = String(soundVolume);
} 

//クリック音再生func
export const  clickSoundPlay = ():void => {
  const clickSound = new Audio("sound/click.mp3");
  clickSound.currentTime = 0;
  clickSound.volume = soundVolume;
  clickSound.play();
}
