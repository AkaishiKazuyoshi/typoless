import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import "../css/topCss/Top.css";
import axios, { AxiosResponse } from "axios";
import { clickSoundPlay, loginUserData, setLoginUserData } from "../globalVariables";
import { iconImgArray } from "../globalVariables";

type Props = {
    setLogin:(bool:boolean)=>void
  };

const Signup: React.FC<Props> = ({ setLogin }) => {
    let selectedIcon:string = "";
    const iconTags = iconImgArray.map((iconname, i) => {
        return <img key={"selecticons" + i} className="icons" id={"selectIcons" + i} src={"icon_images/" + iconname} onClick={()=>{selectIcon(i, iconname)}}/>
    }) 
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
    const allIcons = document.getElementsByClassName("icons") as HTMLCollectionOf<HTMLElement>;
    const errorTag = document.getElementsByClassName("signupErrorMessage") as HTMLCollectionOf<HTMLElement>;

    function signupUser () {
        const name = getValues("nameRequired");
        const password = getValues("passwordRequired");
        const signupButton = document.getElementsByClassName("signupButton") as HTMLCollectionOf<HTMLElement>;
        const errorTag = document.getElementsByClassName("signupErrorMessage") as HTMLCollectionOf<HTMLElement>;
        const topLoginButton:HTMLElement | null = document.getElementById("topLoginButton");
        

        if (name !== "" && password !== "" && selectedIcon !== "") {
            console.log(signupButton[1]!.innerText)
            console.log(getValues("nameRequired")+ getValues("passwordRequired") + selectedIcon)
            signupButton[1]!.innerText = "登録中・・・";
            axios.post("/post/signup",{
              name:getValues("nameRequired"),
              password:getValues("passwordRequired"),
              icon:selectedIcon
            })
            .then((res: AxiosResponse) => {
              console.log(typeof res.status);
              // const errorTag = document.getElementById("errorMessage");
              if (res.data) {
                setLoginUserData(res.data[0]);
                localStorage.setItem("name", res.data[0].name);
                localStorage.setItem("high_score", res.data[0].high_score);
                localStorage.setItem("icon", res.data[0].icon);

                errorTag[0]!.innerHTML = "";
                const signup = document.getElementsByClassName("MuiBox-root") as HTMLCollectionOf<HTMLElement>;
                signup[1].style.display = "none";
                signupButton[1]!.innerHTML = "登録";
                // topLoginButton!.innerText = "ログアウト";
                setValue("nameRequired", "");
                setValue("passwordRequired", "");
                clearErrors();
                setLogin(true)
              } else {
                errorTag[0]!.innerHTML = "登録失敗";
                signupButton[1]!.innerHTML = "登録";
              }
            })
            .catch( err => {
              console.log(err);
              setValue("nameRequired", "");
              setValue("passwordRequired", "");
              for (let i = 0; i < allIcons.length; i++){
                allIcons[i].style.border = "none";
              }
              clearErrors();
              signupButton[1]!.innerHTML = "登録";
              errorTag[0]!.innerHTML = "すでにユーザーが存在します";
            })
          } else {
            errorTag[0]!.innerHTML = "ユーザー名・パスワードを入力、アイコン選択してください";
          }
    }

    function selectIcon (i:number, iconname:string) {
        for (let i = 0; i < allIcons.length; i++){
            allIcons[i].style.border = "none";
        }
        const selectedIconId = "selectIcons" + i
        const selectedIconEl = document.getElementById(selectedIconId);
        selectedIconEl!.style.border =  "2px solid red";
        selectedIcon = iconname;
        // console.log("selectIcons" + i)
        console.log(selectedIcon);
    }

    function closeSignup () {
        for (let i = 0; i < allIcons.length; i++){
          allIcons[i].style.border = "none";
        }
        errorTag[0]!.innerHTML = "";
        login[1].style.display = "none";
        setValue("nameRequired","");
        setValue("passwordRequired","");
        selectedIcon = "";
        clearErrors();
    }
    
    //以下参考
    // .catch((error) => {
    //     // レスポンスありのエラーハンドリング（実際には必要に応じた例外処理を実装する）
    //     console.log(
    //       `Error! code: ${error.response.status}, message: ${error.message}`
    //     );
    //     return error.response.data;
    //   });
    return (
        <Box>
        {/* フォームサブミット前に、handleSubmit が input
        コントロールの検証を行います。 */}
            <p className="signupTitle">新規登録</p>
            <form
            className="form-signup"
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
                <div className="iconContainer">{iconTags}</div>
                
                <Button
                className="signupButton"
                variant="contained"
                color="primary"
                type="submit"
                onClick={()=>{
                  signupUser();
                  clickSoundPlay();
                }}
                >
                登録
                </Button>

                <Button
                className="closeButton"
                variant="contained"
                color="inherit"
                onClick={()=>{
                  closeSignup();
                  clickSoundPlay();
                }}
                >
                閉じる
                </Button>
    
            </form>
            <p className="signupErrorMessage"></p>
            
      </Box>
    );
  }
  
  export default Signup;
  