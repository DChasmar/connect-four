import React, { useContext } from "react";
import { ConnectContext } from "./ConnectContext";
import Column from "./Column";
import GameOver from "./GameOver";
import { CellValue } from "../types";
import { checkGameOver } from "../utils/helpers";

const Board: React.FC = () => {
  const { gameData, setGameData, grid, setGrid } = useContext(ConnectContext);

  const handleClick = (column: CellValue[], columnIndex: number) => {
    if (gameData.gameStatus !== "playing") return;
    const index = column.findIndex((value) => value === 0);
    if (index === -1) return;
    const newGrid = [...grid];
    newGrid[columnIndex][index] = gameData.turn;

    setGrid(newGrid);
    const newGameStatus = checkGameOver(newGrid);
    const newTurn = gameData.turn === 1 ? 2 : 1;
    setGameData({ ...gameData, gameStatus: newGameStatus, turn: newTurn });
  };

  return (
    <div className="relative flex flex-wrap justify-center items-center p-4">
      {gameData.gameStatus !== "playing" && (
        <div className="absolute w-full h-full flex items-center justify-center bg-black bg-opacity-10 rounded-xl">
          <GameOver />
        </div>
      )}
      {grid ? (
        grid.map((column, index) => (
          <Column
            key={index}
            column={column}
            columnIndex={index}
            onClick={handleClick}
          />
        ))
      ) : (
        <div>Loading Grid</div>
      )}
    </div>
  );
};

export default Board;
