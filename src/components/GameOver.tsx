import React, { useContext } from "react";
import { newGame } from "../utils/helpers";
import { ConnectContext } from "./ConnectContext";

const GameOver: React.FC = () => {
  const { setGameData, setGrid } = useContext(ConnectContext);
  const handlePlayAgain = () => {
    newGame(setGameData, setGrid);
  };

  return (
    <div>
      <div className="p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Game Over</h2>
        <button
          onClick={handlePlayAgain}
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
