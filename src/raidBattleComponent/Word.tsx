import React,{useEffect, useState} from 'react';
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
            <WordQuestion typingWordList={typingWordList} /> 
    );
}

export default Word;