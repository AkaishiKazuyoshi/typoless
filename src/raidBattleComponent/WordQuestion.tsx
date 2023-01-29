import React,{useEffect} from 'react';

type Props = {
    typingWordList?:string[] | null;
}



const WordQuestion:React.FC<Props> = ({typingWordList}) => {
    const letterTags = typingWordList?.map(word => {
        word += " ";
        const letterArray = word.split("");
        return letterArray.map((letter,i) => 
             <span 
             key={"span" + String(i)}
             className={"unSpotLetter"}
             >
                {letter}
        </span>
        );
    })
    const addLetterTags = letterTags?.map((tags,i) => {
        return <p
        className='wordPTags'
        key={"p" + String(i)}
        >{tags}
        </p>
    });

    return (
        <>
            {addLetterTags}
        </>
        
    );
}

export default WordQuestion;