export type CellValue = 0 | 1 | 2;
export type Grid = CellValue[][];
export type GameStatus = "playing" | 1 | 2 | "draw";
export type Rows = 6 | 7 | 8 | 9;
export type Columns = 7 | 8 | 9;
export type TurnValue = 1 | 2;

export interface ConnectContextType {
  gameData: GameDataType;
  setGameData: React.Dispatch<React.SetStateAction<GameDataType>>;
  grid: Grid;
  setGrid: React.Dispatch<React.SetStateAction<Grid>>;
}

export interface GameDataType {
  rows: Rows;
  columns: Columns;
  turn: TurnValue;
  gameStatus: GameStatus;
}

// MCTS

export interface State {
  grid: Grid;
  turn: TurnValue;
  gameStatus: GameStatus;
}

export interface TreeNode {
  state: State;
  parent: TreeNode | null;
  children: (TreeNode | null)[];
  visits: number;
  reward: number;
  untriedMoves: Move[];
  move: Move | null;
}

export interface Move {
  columnIndex: number;
}

export interface MCTSResult {
  bestMove: Move | null;
  bestMoveScore: number;
  iterations: number;
}
