import { TreeNode, State, Move, MCTSResult, GameStatus } from "../types";
import { checkGameOver } from "./helpers";

const EXPLORE = Math.sqrt(2);
const MAX_ITERATIONS = 3000;

const createRootNode = (state: State): TreeNode => {
  return {
    state: state,
    parent: null,
    children: [],
    visits: 0,
    reward: 0,
    untriedMoves: getMoves(state),
    move: null,
  };
};

const getMoves = (state: State): Move[] => {
  // return a list of all possible actions from this state
  const moves: Move[] = [];
  for (let i = 0; i < state.grid.length; i++) {
    if (state.grid[i].includes(0)) {
      moves.push({ columnIndex: i });
    }
  }
  return moves;
};

const selectChild = (node: TreeNode): TreeNode | null => {
  if (node.children.length === 0) return null;
  return node.children.reduce((a, b) => (a && b && uct(a) > uct(b) ? a : b));
};

const uct = (node: TreeNode): number => {
  if (node.visits === 0) return Infinity; // if the node has not been visited yet, return infinity (to make sure it is selected)
  if (node.parent === null) return node.reward / node.visits; // if the node is the root node, return the reward/visits
  return (
    node.reward / node.visits +
    EXPLORE * Math.sqrt(Math.log(node.parent.visits) / node.visits)
  ); // return the UCT value
};

const bestChild = (node: TreeNode): TreeNode | null => {
  if (node.children.length === 0) return null;
  return node.children.reduce((a, b) =>
    a && b && a.visits > b.visits ? a : b
  );
};

const addChild = (
  node: TreeNode,
  state: State,
  move: Move
): TreeNode | null => {
  const newNode = {
    state: state,
    parent: node,
    children: [],
    visits: 0,
    reward: 0,
    untriedMoves: getMoves(state),
    move: move,
  };
  return newNode;
};

export const cloneState = (state: State): State => {
  return {
    grid: JSON.parse(JSON.stringify(state.grid)),
    turn: state.turn,
    gameStatus: state.gameStatus,
  };
};

export const sorted = <T>(array: T[], key: (item: T) => number): T[] => {
  return array.sort((a, b) => key(a) - key(b));
};

const randomMove = (untriedMoves: Move[]): Move => {
  return untriedMoves[Math.floor(Math.random() * untriedMoves.length)];
};

const backProp = (node: TreeNode | null, winner: GameStatus) => {
  let n = node;
  while (n !== null) {
    n.visits++;
    let reward = 0;
    if (winner === "draw") reward = 0.5;
    else if (n.state.turn !== winner) reward = 1;
    else reward = 0;
    n.reward += reward;
    n = n.parent;
  }
};

const updateStateWithMove = (state: State, move: Move): State => {
  const newState = cloneState(state);
  const columnIndex = move.columnIndex;
  const index = newState.grid[columnIndex].findIndex((value) => value === 0);
  newState.grid[columnIndex][index] = newState.turn;
  newState.turn = newState.turn === 1 ? 2 : 1;
  newState.gameStatus = checkGameOver(newState.grid);
  return newState;
};

const maxIterations = MAX_ITERATIONS;

const runMCTS = (parentNode: TreeNode): void => {
  // return early if parentNode gets x number of visits (perhaps 10000)
  // Selection
  let node = parentNode;
  while (node.untriedMoves.length === 0 && node.children.length > 0) {
    if (node.visits >= maxIterations) {
      console.log("Iteration limit exceeded");
      return;
    }
    const selection = selectChild(node);
    if (selection === null) {
      console.error("Selection is null");
      return;
    } // Check if selection is null;
    node = selection;
  }

  // Expansion
  if (node.untriedMoves.length > 0) {
    if (node.visits >= maxIterations) {
      console.log("Iteration limit exceeded");
      return;
    }
    const move = node.untriedMoves.pop();
    if (!move) {
      console.error("Move is null");
      return;
    } // Check if move is null
    const newState = updateStateWithMove(node.state, move);
    const newChild = addChild(node, newState, move);
    node.children.push(newChild);
    if (newChild === null) {
      console.error("New child is null");
      return;
    } // Check if newChild is null
    node = newChild;
  }
  // Simulation
  let currState = cloneState(node.state);
  while (currState.gameStatus === "playing") {
    if (node.visits >= maxIterations) {
      console.log("Iteration limit exceeded");
      return;
    }
    // Check for killer move and return early if it works
    currState = updateStateWithMove(currState, randomMove(getMoves(currState)));
  }

  // Determine winner
  const winner = checkGameOver(currState.grid);
  backProp(node, winner);
};

export const MCTS = (state: State): MCTSResult => {
  const tree = createRootNode(state);
  const maxIterations = MAX_ITERATIONS;
  let totalVisits = 0;
  while (totalVisits < maxIterations) {
    runMCTS(tree);
    totalVisits++;
  }
  const best = bestChild(tree);
  if (best === null) {
    return { bestMove: null, bestMoveScore: 0, iterations: tree.visits || 0 };
  } else {
    return {
      bestMove: best.move,
      bestMoveScore: best.reward / best.visits,
      iterations: tree.visits,
    };
  }
};
