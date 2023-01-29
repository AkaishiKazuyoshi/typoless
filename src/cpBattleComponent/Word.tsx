import React,{useEffect, useState} from 'react';
import SentenceQuestion from './SentenceQuestion';
import WordQuestion from './WordQuestion';

type Props = {
    typingWordList?:string[] | null;
    questionType:string;
    questionNumber:number;
    typingSentenceList:string[] | null;
}

const Word:React.FC<Props> = ({
    typingWordList,
    questionType,
    questionNumber,
    typingSentenceList
}) => {

    return (
        <>
          { questionType === "word" ?
            <WordQuestion typingWordList={typingWordList} /> :
            <SentenceQuestion questionNumber={questionNumber} typingSentenceList={typingSentenceList} />
          }
        </>
        
    );
}

export default Word;