import React, { useContext } from "react";
import Board from "./Board";
import { newGame, checkGameOver } from "../utils/helpers";
import { MCTS } from "../utils/mcts";
import { ConnectContext } from "./ConnectContext";

const Game: React.FC = () => {
  const { gameData, setGameData, grid, setGrid } = useContext(ConnectContext);
  const handleNewGame = () => {
    newGame(setGameData, setGrid);
  };
  const handleComputerPlay = () => {
    const bestMoveData = MCTS({
      grid: grid,
      turn: gameData.turn,
      gameStatus: gameData.gameStatus,
    });
    if (!bestMoveData) {
      console.error("No data from Play Intelligent");
      return;
    }
    if (bestMoveData.bestMove) {
      const index = grid[bestMoveData.bestMove.columnIndex].findIndex(
        (value) => value === 0
      );
      if (index === -1) return;
      const newGrid = [...grid];
      newGrid[bestMoveData.bestMove.columnIndex][index] = gameData.turn;

      setGrid(newGrid);
      const newGameStatus = checkGameOver(newGrid);
      const newTurn = gameData.turn === 1 ? 2 : 1;
      setGameData({ ...gameData, gameStatus: newGameStatus, turn: newTurn });
      console.log("Best Move Data", bestMoveData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Board />
      <button
        onClick={handleNewGame}
        className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        New Game
      </button>
      <button
        onClick={handleComputerPlay}
        className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        PlayComputer
      </button>
    </div>
  );
};

export default Game;
