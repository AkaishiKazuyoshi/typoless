const path = require("path");
const express = require("express");
const app = express();
const knex = require("./knex");
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { response } = require("express");
const io = new Server(server);

// let config = JSON.parse(fs.readFileSync("config.json"));
// let opts = {
// key: fs.readFileSync(config.key),
// cert: [fs.readFileSync(config.cert)],
// ca: [fs.readFileSync(config.chain), fs.readFileSync(config.fullchain)]
// };
// const server = require("https").createServer(opts);
// server.listen(8080);
// const io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  console.log("サーバー:クライアントと接続しました");
  socket.on("send_damage",(data)=>{
    console.log(data);
    io.emit("received_damage",data, {broadcast: true});
  })
  socket.on("disconnect", () =>{
    console.log("サーバー:クライアントと切断しました");
    
  })
});



// app.use(express.static(path.join(__dirname, "/build")));
app.use(express.json());
app.use("/", express.static(__dirname + "/build"));

const port = process.env.PORT || 8080;
// const port = 443;

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname,'/build/index.html'));
// });

app.get("/get/question", async (req, res) => {
  // console.log("1");
  const questionArr = await knex("question_sentence")
    .select("*")
    .then((res) => {
      return res.reduce((acc, curr) => {
        acc.push(curr.question);
        return acc;
      }, []);
    });
  // console.log(questionArr);
  res.json(questionArr).status(200);
});

app.get("/get/question/js", async (req, res) => {
  // console.log("1");
  const questionArr = await knex("question_js_sentence")
    .select("*")
    .then((res) => {
      return res.reduce((acc, curr) => {
        acc.push(curr.question);
        return acc;
      }, []);
    });
  // console.log(questionArr);
  res.json(questionArr).status(200);
});

app.post("/post/signup", async (req, res) => {
  console.log("first");
  const newAccount = {
    name: req.body.name,
    password: req.body.password,
    high_score: null,
    icon: req.body.icon,
  };

  //すでに登録されているアカウントではないかの確認処理
  const checkUnique = await knex("account")
    .select("*")
    .where("name", req.body.name);
  console.log(checkUnique);
  if (checkUnique[0]) {
    console.log("すでに登録されています");
    res.status(409).end();
    return;
  }

  //データの挿入
  await knex("account").insert(newAccount);

  //データが正しく挿入されたかの確認処理
  const addAccount = await knex("account")
    .select("*")
    .where("name", req.body.name)
    .andWhere("password", "=", req.body.password);
  if (!addAccount) {
    console.log("signupError");
    res.status(400).end();
  } else {
    console.log("signupSuccess");
    const resAccount = await knex("account")
      .select("name", "high_score", "icon")
      .where("name", req.body.name);
    res.json(resAccount).status(200).end();
  }
});
//login処理
//ユーザーが見つかったらユーザーデータ[{userdata}]でレスポンスを返す。なかったらFalseをレスポンス。
app.post("/post/login", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  console.log(name, password);
  try {
    const loginAccount = await knex("account")
      .select("name", "high_score", "icon")
      .where("name", name)
      .andWhere("password", "=", password);
    console.log(loginAccount);
    if (loginAccount[0]) {
      res.json(loginAccount).status(200);
    } else {
      res.json(false).status(200);
    }
  } catch (err) {
    console.log("error");
  }
});

  //high_scoreの更新処理
app.put("/put/high_score", async (req, res) => {
  const name = req.body.name;
  const highScore = req.body.high_score;
  console.log("put処理を行います")
  console.log(highScore);

  //現在のscoreの確認
  const oldScore = await knex("account").select("high_score").where("name",name);
  
  //old_scoreを上回っていた場合更新を行う
  if(oldScore[0].high_score < highScore){
    await knex("account").where("name",name).update({ high_score: highScore });
    console.log("update")
    
    //データが正しく変更されたかの確認処理
    const newHighScore = await knex("account")
    .select("high_score")
    .where("name", name);
    console.log(typeof newHighScore[0].high_score)
    console.log(typeof highScore)
    if (newHighScore[0].high_score !== Number(highScore)) {
      console.log("highScoreUpdateError");
      res.status(400).end();
    } else {
      console.log("highScoreUpdateSuccess");
      res.json(newHighScore).status(200).end();
    }
  } else {  
    //high_scoreを更新していなかった時の処理
    res.json(false).status(200).end()
  }
});

/* Add by tuki. */

/***************************************************** 
 * 全ユーザの対戦履歴から指定期間のランキングリストを取得する
 *    期間は 開始日のみを指定 (全期間は、00-00-00)出来る
 *    リスト上限は30行で固定している
*****************************************************/
app.get("/get/ranking/:from", async (req, res) => {

  let sqlBuff = "";

  if (req.params.from !== "00-00-00") {
    const period = req.params.from + " 00:00:00+00";
    sqlBuff = "select ac.name, hi.high_score, ac.icon from account as ac " +
                     "join (select account_id, max(score) high_score " +
                          "from account_score_history " +
                          "where timestamp >= '" + period + "' " +
                          "group by account_id) as hi " +
                          "on ac.id = hi.account_id " +
                        "order by hi.high_score desc " +
                        "limit 30;" 
  } else {
    sqlBuff = "select ac.name, hi.high_score, ac.icon from account as ac " +
                    "join (select account_id, max(score) high_score " +
                          "from account_score_history " +
                          "group by account_id) as hi " +
                          "on ac.id = hi.account_id " +
                        "order by hi.high_score desc " +
                        "limit 30;" 
  }

  await knex.raw(sqlBuff)
        .then((info) => { res.json(info.rows).status(200); })
        .catch(err => { console.error(err); });
});


/***************************************************** 
 * 特定ユーザの情報(Profile)取得する
 *  スコアは、スコア履歴の最大を集計したもの
****************************************************/
app.get("/get/accountInfo/:name", async (req, res) => {

  // Key of SQL.
  const name = req.params.name;

  const sqlBuff = "select ac.name, hi.high_score, ac.icon " +
                          "from account as ac " +
                        "join (select account_id, max(score) high_score " +
                          "from account_score_history group by account_id) as hi " +
                          "on ac.id = hi.account_id " +
                        "where ac.name = '" + name + "'; ";

  await knex.raw(sqlBuff)
          .then((info) => { res.json(info.rows).status(200); })
          .catch(err => { console.error(err); });
});


/***************************************************** 
 * 特定ユーザの対戦履歴のリストを取得、昇順でソートし返す
 *  リストの上限はない。
****************************************************/
app.get("/get/scoreHistory/:name", async (req, res) => {

  // Key of SQL.
  const name = req.params.name;

  const scoreHistory = await knex("account_score_history")
                            .join("account", "account.id", "account_score_history.account_id")
                            .select("account.id", "score", "timestamp")
                            .where("account.name", name)
                            .orderBy("timestamp");

  res.json(scoreHistory).status(200);
});


/***************************************************** 
 * 全ボスの情報を返す
****************************************************/
app.get("/get/bosses", async (req, res) => {

  const listOfBoss = await knex("bosses")
                            .select("*")
                            .orderBy("id");

  res.json(listOfBoss).status(200);
});


/***************************************************** 
 * 特定されたボスへの与ダメージのランキングをかえす
****************************************************/
app.get("/get/bossDamageRanking/:id", async (req, res) => {

  // Key of SQL. (Type of id is String.)
  const id = req.params.id;

  const sqlBuff = "select ac.name, bd.boss_damage, ac.icon " +
                          "from account as ac " +
                      "join (select account_name, sum(damage) boss_damage " +
                          "from raid_boss_damage where boss_id = " + id + " " + 
                          "group by account_name) as bd " +
                      "on ac.name = bd.account_name " +
                      "order by boss_damage desc;";

  await knex.raw(sqlBuff)
          .then((info) => { res.json(info.rows).status(200); }) 
          .catch(err => { console.error(err); });
});


app.post("/post/scoreHistory", async (req, res) => {
  console.log("req.body= ",req.body)
  const userAccountId = await knex("account")
                  .select("id")
                  .where("name", req.body.name);
  console.log(userAccountId)
  

  if (userAccountId.length === 1) {
    const scoreHistoryData = {
      "account_id": userAccountId[0].id,
      "score": req.body.score,
      "timestamp": req.body.timestamp
    }
    await knex("account_score_history")
    .insert(scoreHistoryData)
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      console.log(err);
    })
  }  

});


/***************************************************** 
 * 入力スコアの、全ユーザの履歴の集計からの順位を返す
****************************************************/
app.get("/get/myRanking", async (req, res) => {

  // const score = req.query.score;
  // const rankingCount = await knex("account")
  //   .count("*")
  //   .where("high_score", ">", score);
  // console.log(rankingCount);
  // const myRanking = {
  //   ranking: Number(rankingCount[0].count) + 1,
  // };
  // res.json(myRanking).status(200);

  const score = req.query.score;

  const sqlBuff = "select max(score) high_score from account_score_history " +
                          "group by account_id " +
                        "order by high_score desc; " 

  await knex.raw(sqlBuff)
        .then((info) => { 
          let retNum = 0;
          for (let i = 0; i < info.rows.length; i++) {
            if (info.rows[i].high_score <= score) {
               retNum = i + 1;
              break;
            }
          }
          if (retNum === 0) { // ランキング外(ドベ)対応 (2023.01.17 tuki.)
            retNum = info.rows.length + 1;
          }
          const myRanking = { ranking: retNum };
          res.json(myRanking).status(200);
        })
        .catch(err => { console.error(err); });
});

app.get("/get/raidBoss", (req,res) => {
  knex("bosses")
  .select("*")
  .innerJoin("raid_boss","bosses.id","raid_boss.boss_id")
  .first()
  .then(bossData => {
    knex("raid_boss_damage")
    .where("boss_id","=",bossData.boss_id)
    .sum("damage").first()
    .then(damageData => {
      bossData.damage=damageData.sum;
      console.log("bossdata",bossData);
      res.json(bossData).status(200);
    })
  })
});

app.post("/post/bossDamage", (req, res) => {
  const newDamage = {
    boss_id: req.body.boss_id,
    account_name: req.body.account_name,
    damage: req.body.damage,
    timestamp: req.body.timestamp,
  };
  console.log("newDamage",newDamage)
  knex("raid_boss_damage").insert(newDamage)
  .catch(err=>{console.log(err)});
})

app.post("/post/newBoss",(req,res) => {
  knex("raid_boss")
  .select("*")
  .first()
  .then(raidBossData => {
    if(Number(raidBossData.boss_id)===req.body.boss_id){
      knex("bosses")
      .where("id",req.body.boss_id)
      .update({is_beated:true})
      .then(() => {
        knex("bosses")
        .select("id")
        .where("is_beated",false)
        .first()
        .then(newBossData => {
          knex("raid_boss")
          .update({boss_id: newBossData.id})
          .catch(err => console.log(err))
        })
      })
    }
  })
})


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

server.listen(port, () => {
  console.log("App listening on port " + port);
});


/* EOF */