import React, { createContext,useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export const TypingCountContext = createContext<number>(0);

export const TypingCountProvider: React.FC<Props> = ({ children }) => {
  return (
    <TypingCountContext.Provider value={0}>
      {children}
    </TypingCountContext.Provider>
  );
};
