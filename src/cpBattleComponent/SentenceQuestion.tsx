import React,{useEffect, useState} from 'react';

type Props = {
    typingWordList?:string[] | null;
    questionNumber:number;
    typingSentenceList:string[] | null;
}

const SentenceQuestion:React.FC<Props> = ({typingWordList, questionNumber, typingSentenceList}) => {
    //文章化対応用
    // const mockWordArray: string[] = [
    //     "useEffect(() => {\r\tif (resultModalState) {\r\t\tclearInterval(countDownId.current);\r\t\tconst timerEl = document.getElementsByClassName(\"timer\");\r\t\ttimerEl[0].innerHTML = \"終了\";\r\t}\r}, [resultModalState]);",
    //     "_.reduce = (collection, iterator, accumulator = collection[0]) => {\r\tlet flag = false;\r\tif (accumulator === collection[0]) {\r\t\tflag = true;\r\t}\r\t_.each(collection, (elem, index, collection2) => {\r\t\tif (flag) {\r\t\t\telem = collection2[index + 1];\r\t\t\tif (collection2.length - 1 < index + 1) {\r\t\t\t\treturn;\r\t\t\t}\r\t\t}\r\t\taccumulator = iterator(accumulator, elem);\r\t});\r\treturn accumulator;\r};"
    // ];

    const LetterTags = document.getElementsByClassName(
        "unSpotLetter"
      ) as HTMLCollectionOf<HTMLElement>;

    const testWordArray:string[] =["abc","bcd","cde","efg","ggg"];

    // let [questionNumber, setQuestionNumber] = useState<number>(0);
    const[sentence, setSentence] = useState<string | null>(typingSentenceList![questionNumber]);


    let replaceWord = sentence?.replaceAll("\t", "~~");
    // console.log(replaceWord) 
    const kaigyou = replaceWord?.split("\r");
    // console.log(kaigyou)
    const letterTags = kaigyou?.map(word => {
        // word += " "
        const letterArray = word.split("")
        return letterArray.map((letter, i, array) => 
             <span 
             key={"span" + String(i)}
             className={`${letter === "~" ? "indent" : "unSpotLetter"} ${"sentensSpan"}`}
             >
                {letter === "~" ? " " : letter}
        </span>
        );
    });

    // console.log(sentence)

    const addLetterTags = letterTags?.map((tags,i) => {
        return <p
        key={"p" + String(i)}
        className='sentencePTags'
        >{tags}
        </p>
    });


    useEffect(()=>{
        // console.log(questionNumber)
        setSentence(typingSentenceList![questionNumber]);
        // console.log(sentence)
        const letterSpanTags = document.getElementsByClassName('unSpotLetter') as HTMLCollectionOf<HTMLElement>;
        // console.log(letterSpanTags.length);
        const lastSpanTag = letterSpanTags[letterSpanTags.length - 1];
        lastSpanTag.classList.add("lastSpan");
        // console.log(lastSpanTag);

        LetterTags[0].classList.add("spotLetter");
        for (let i = 0; i < LetterTags.length; i++) {
          LetterTags[i].classList.remove("correctLetter");
        }
        // lastSpanTag.addEventListener("keydown", ()=>{
        //     console.log("change")
        //     setQuestionNumber(++questionNumber);
        // })
    },[questionNumber]);


    return (
        <>
            {addLetterTags}
        </>
        
    );
}

export default SentenceQuestion;