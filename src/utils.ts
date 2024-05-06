// import { Dispatch, SetStateAction } from "react";
// import { GameDataType, Grid, Rows, Columns, GameStatus } from "./types";

// export const createConnectGrid = (
//   Rows: Rows,
//   Columns: Columns
// ): (0 | 1 | 2)[][] => {
//   const arr = new Array(Columns);
//   for (let i = 0; i < Columns; i++) {
//     arr[i] = new Array(Rows).fill(0);
//   }
//   return arr;
// };

// export const newGame = (
//   setGameData: Dispatch<SetStateAction<GameDataType>>,
//   setGrid: Dispatch<SetStateAction<Grid>>
// ): void => {
//   setGrid(createConnectGrid(6, 7));
//   setGameData({
//     rows: 6,
//     columns: 7,
//     gameStatus: "playing",
//     turn: 1,
//   });
// };

// export const checkGameOver = (grid: (0 | 1 | 2)[][]): GameStatus => {
//   const directions = [
//     [0, 1], // horizontal
//     [1, 0], // vertical
//     [1, 1], // diagonal from top-left to bottom-right
//     [1, -1], // diagonal from top-right to bottom-left
//   ];

//   for (let row = 0; row < grid.length; row++) {
//     for (let col = 0; col < grid[0].length; col++) {
//       for (const dir of directions) {
//         let count1 = 0;
//         let count2 = 0;

//         for (let i = 0; i < 4; i++) {
//           if (
//             row + i * dir[0] < grid.length &&
//             row + i * dir[0] >= 0 &&
//             col + i * dir[1] < grid[0].length &&
//             col + i * dir[1] >= 0
//           ) {
//             if (grid[row + i * dir[0]][col + i * dir[1]] === 1) {
//               count1++;
//             } else if (grid[row + i * dir[0]][col + i * dir[1]] === 2) {
//               count2++;
//             }
//           }
//         }

//         if (count1 === 4 || count2 === 4) {
//           return "won";
//         }
//       }
//     }
//   }

//   const noZerosLeft = !grid.some((row) => row.includes(0));
//   if (noZerosLeft) return "draw";

//   return "playing";
// };

// // MCTS
