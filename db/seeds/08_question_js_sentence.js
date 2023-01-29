/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('question_js_sentence').del()
    await knex('question_js_sentence').insert([
      {id: 1, question: 'function keys(obj) {\r\tconst result = []\r\tfor (const key in obj) {\r\t\tresult.push(key);\r\t}\r\treturn result;\r}'},
      {id: 2, question: 'function find(obj, func) {\r\tfor (const key in obj) {\r\t\tif (func(obj[key])) {\r\t\t\treturn obj[key];\r\t\t}\r\t}\r\treturn undefined;\r}'},
      {id: 3, question: 'class Circle extends Ellipse {\r\tconstructor(type, radius) {\r\t\tsuper(type);\r\t\tthis.rx = radius;\r\t\tthis.ry = radius;\r\t}\r}'},
      {id: 4, question: 'const hash = (string) => {\r\tlet hash = 0;\r\tlet stringLength = string.length;\r\tfor (let i = 0; i < stringLength; i++) {\r\t\thash = 37 * hash + string.charCodeAt(i);\r\t}\r\treturn hash;\r}'},
      {id: 5, question: 'useEffect(() => {\r\tif (resultModalState) {\r\t\tclearInterval(countDownId.current);\r\t\tconst timerEl = document.getElementsByClassName(\"timer\");\r\t\ttimerEl[0].innerHTML = \"終了\";\r\t}\r}, [resultModalState]);'},
      {id: 6, question: 'const power = (exponent) => {\r\tif (typeof exponent !== "number") {\r\t\treturn NaN;\r\t}\r\treturn (num) => {\r\t\tlet result = 1;\r\t\tfor (let i = 0; i < exponent; i++) {\r\t\t\tresult *= num;\r\t\t}\r\t\treturn result;\r\t}\r}'},
      {id: 7, question: 'function randomInteger() {\r\treturn Math.floor(Math.random() * (n + 1));\r}'},
      {id: 8, question: 'it("should generate some games!", () => {\r\tconst game = gameGenerator(4);\r\texpect(typeof game).toBe("object");\r});'},
      {id: 9, question: 'class Rect extends Shape {\r\tconstructor(type, width, height) {\r\t\tsuper(type);\r\t\tthis.width = width;\r\t\tthis.height = height;\r\t}\r\tarea() {\r\t\treturn this.width * this.height;\r\t}\r}'},
      {id: 10, question: 'const express = require("express");\rconst app = express();\rapp.get("/greet", (request, response) => {\r\tresponse.send(`Hello ${request.query.name}!`);\r});'},
      {id: 11, question: 'const getRandomElement = array => {\r\tconst randomIndex = Math.floor(Math.random() * array.length);\r\treturn array[randomIndex];\r};'},
      {id: 12, question: 'const students = {\r\tcompany: "DIGschool",\r\tsayHi: function () {\r\t\tconst names = ["aaa", "bbb", "ccc"];\r\t\tnames.forEach((name) => {\r\t\t\tconsole.log(name, "work with", this.company);\r\t\t});\r\t}}'},
      {id: 13, question: 'class Butterfly extends Pupa {\r\tconstructor () {\r\t\tsuper ();\r\t\tthis.hatched = true;\r\t\tthis.age = 4;\r\t\tthis.chrysalising = false;\r\t}\r\tfulutter () {\r\t\treturn "Flying away!";\r\t}\r}'},
      {id: 14, question: 'const filter = (query, data) => {\r\treturn "author" in query\r\t\t? data.filter((quote) => quote.name === query.author)\r\t\t: data;\r}'},
      {id: 15, question: '_.tail = (array) => {\r\tconst result = array.concat();\r\tresult.shift();\r\treturn result;\r}'},
      {id: 16, question: '_.take = (array, n) => {\r\tif (typeof n === "undefined") {\r\t\tn = 1;\r\t}\r\treturn array.slice(0,n);\r}'},
      {id: 17, question: 'const counterGenerator = () => {\r\tlet counter = 0;\r\treturn () => {\r\t\tcounter++;\r\t\treturn counter;\r\t}\r}'},
      {id: 18, question: 'async function request() {\r\tconst response = await fetch("https://pokeapi.co/api/v2/ability/4/");\r\tconst jsonResponse = await response.json();\r\tconsole.log(jsonResponse);\r}'},
      {id: 19, question: 'const [ applyList, setApplyList ] = useState([]);'},
      {id: 20, question:'import React from "react";\rexport const LotteryForm = () => {\r\treturn <h1>Hello World!</h1>;\r}'}
    ]);
  };
  