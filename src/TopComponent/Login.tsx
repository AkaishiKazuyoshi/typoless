import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import "../css/topCss/Top.css";
import axios, { AxiosResponse } from "axios";
import { clickSoundPlay, loginUserData, setLoginUserData } from "../globalVariables";

type Props = {
  setLogin:(bool:boolean)=>void
};


const Login: React.FC<Props> = ({ setLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setValue,
        clearErrors
      } = useForm();
      const onSubmit = (data: any) => {
        // console.log(data);
      };
      const login = document.getElementsByClassName("MuiBox-root") as HTMLCollectionOf<HTMLElement>;
//nameとpasswordを入れてpostするとpassword を除いた以下の配列を返してます。
//ログイン情報が見つからなかった場合空の配列が返ります。
// [
//     {
//         "name": "rion",
//         "high_score": 40.03,
//         "icon": "アザラシ.png"
//     }
// ]

    function comparisonUser() {
      const loginButton: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("loginButton") as HTMLCollectionOf<HTMLElement>;
      const name = getValues("nameRequired");
      const password = getValues("passwordRequired");
      const errorTag: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("errorMessage") as HTMLCollectionOf<HTMLElement>;
      const topLoginButton:HTMLElement | null = document.getElementById("topLoginButton");

      if (name !== "" && password !== "") {
        loginButton[0]!.innerHTML = "ログイン中・・・";
        axios.post("/post/login",{
          name:getValues("nameRequired"),
          password:getValues("passwordRequired")
        })
        .then((res: AxiosResponse) => {
          console.log(res.data);
          // const errorTag = document.getElementById("errorMessage");
          if (res.data) {
            setLoginUserData(res.data[0]);
            localStorage.setItem("name", res.data[0].name);
            localStorage.setItem("high_score", res.data[0].high_score);
            localStorage.setItem("icon", res.data[0].icon);

            errorTag[0]!.innerHTML = "";
            const login = document.getElementsByClassName("MuiBox-root") as HTMLCollectionOf<HTMLElement>;
            login[0].style.display = "none";
            loginButton[0]!.innerHTML = "ログイン";
            // topLoginButton!.innerText = "ログアウト";
            setValue("nameRequired", "");
            setValue("passwordRequired", "");
            setLogin(true);
            clearErrors();
            // setLogin(false);
          } else {
            errorTag[0]!.innerHTML = "ユーザーが存在しないまたはパスワードが違います";
            loginButton[0]!.innerHTML = "ログイン";
          }
        });
      } else {
        errorTag[0]!.innerHTML = "ユーザー名・パスワードを入力してください";
      }
      // console.log(getValues("nameRequired"))
      // console.log(getValues("passwordRequired"))
    }

    function signupButtonClick () {
      login[0].style.display = "none";
      login[1].style.display = "flex";
      setValue("nameRequired", "");
      setValue("passwordRequired", "");
      clearErrors();
    }

    function closeLogin () {
      login[0].style.display = "none";
      setValue("nameRequired", "");
      setValue("passwordRequired", "");
      clearErrors();
    }

    return (
        
    <Box>
    {/* フォームサブミット前に、handleSubmit が input
    コントロールの検証を行います。 */}
        <p>ログイン</p>
        <form
        className="form"
        onSubmit={handleSubmit(onSubmit)}
        >
      {/* register 関数を利用し、input コントロールを hook に登録します。 */}
            <TextField
                {...register("nameRequired", { required: true })}
                error={!!errors.nameRequired}
                className="username-input"
                label="username"
                variant="outlined"
                helperText={!!errors.nameRequired && "名前を入力してください。"}
            />
            <TextField
                {...register("passwordRequired", { 
                  required: true,
                  // pattern: /\d{4}/,
                //"^[0-9]{4}$"　\d{4}
                })}
                error={!!errors.passwordRequired}
                className="password"
                label="password"
                variant="outlined"
                type="password"
                helperText={
                !!errors.passwordRequired && "パスワードを入力してください。"
                }
            />
            <Button
            className="loginButton"
            variant="contained"
            color="primary"
            type="submit"
            onClick={()=>{
              comparisonUser();
              clickSoundPlay();
            }}
            >
            ログイン
            </Button>
            <Button
            className="signupButton"
            variant="contained"
            color="inherit"
            
            onClick={() =>{
              signupButtonClick();
              clickSoundPlay();
            }}
            >
            新規登録はこちら
            </Button>

            <Button
            className="closeButton"
            variant="contained"
            color="inherit"
            onClick={()=>{
              closeLogin();
              clickSoundPlay();
            }}
            >
            閉じる
            </Button>

        </form>
        <p className="errorMessage"></p>
  </Box>
    );
  }

  export default Login;