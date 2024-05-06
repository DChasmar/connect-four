import React, { createContext, useState, ReactNode } from "react";
import { ConnectContextType, GameDataType } from "../types";
import { createConnectGrid } from "../utils/helpers";

export const ConnectContext = createContext<ConnectContextType>(
  {} as ConnectContextType
);

interface ConnectProviderProps {
  children: ReactNode;
}

export const ConnectProvider: React.FC<ConnectProviderProps> = ({
  children,
}) => {
  const [gameData, setGameData] = useState<GameDataType>({
    rows: 6,
    columns: 7,
    gameStatus: "playing",
    turn: 1,
  } as GameDataType);
  const [grid, setGrid] = useState<(0 | 1 | 2)[][]>(createConnectGrid(6, 7));

  return (
    <ConnectContext.Provider
      value={{
        grid,
        setGrid,
        gameData,
        setGameData,
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
};
