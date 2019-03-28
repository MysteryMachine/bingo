import _ from "lodash";
import seedrandom from "seedrandom";

export const letters = ["B", "I", "N", "G", "O"];
export const nums = _.range(1, 16);
let myrng = new seedrandom();

export const createValues = (sampleSize = 5) =>
  _.flatMap(letters, letter =>
    selectNums(sampleSize).map(num => ({
      letter: letter,
      num: num,
      value: letter.concat(num),
      clicked: false
    }))
  );

export const selectNums = sampleSize => {
  return _.take(
    _.sortBy(nums.map(i => ({ num: i, sort: myrng.int32() })), ["sort"]).map(
      o => o.num
    ),
    sampleSize
  );
};

export const createAllValues = () => createValues(15);

export const createInitialGameState = () => {
  return {
    left: createAllValues(),
    used: [],
    seed: Math.abs(myrng.int32()) % 100000,
    winner: false
  };
};

export const pull = gameState => {
  const sample = _.sample(gameState.left);
  const newLeft = _.filter(gameState.left, i => sample.value !== i.value);
  const newUsed = _.concat(gameState.used, [sample]);
  return { left: newLeft, used: newUsed, seed: gameState.seed };
};

export const createBoard = (username, seed) => {
  myrng = seedrandom(username.concat(seed));
  const board = _.groupBy(createValues(), i => i.letter);
  board.N[2].clicked = true;
  board.N[2].num = "FREE";
  return board;
};

const rows = gameBoard => {
  return _.reduce(
    letters,
    (exp, letter) => {
      return (
        exp ||
        (gameBoard[letter][0].clicked &&
          gameBoard[letter][1].clicked &&
          gameBoard[letter][2].clicked &&
          gameBoard[letter][3].clicked &&
          gameBoard[letter][4].clicked)
      );
    },
    false
  );
};

const columns = gameBoard => {
  return _.reduce(
    _.range(0, 5),
    (exp, row) => {
      return (
        exp ||
        (gameBoard["B"][row].clicked &&
          gameBoard["I"][row].clicked &&
          gameBoard["N"][row].clicked &&
          gameBoard["G"][row].clicked &&
          gameBoard["O"][row].clicked)
      );
    },
    false
  );
};

const playGame = (initialGameBoard, { used }) => {
  return _.reduce(
    used,
    (gameBoard, item) => {
      gameBoard[item.letter].map(o => {
        if (o.num === item.num) {
          o.clicked = true;
        }
        return o;
      });
      const { B, I, N, G, O } = gameBoard;
      return { B, I, N, G, O };
    },
    initialGameBoard
  );
};

export const checkWinner = (gameState, username) => {
  const initialGameBoard = createBoard(username, gameState.seed);
  const gameBoard = playGame(initialGameBoard, gameState);
  const { B, I, N, G, O } = gameBoard;
  const winner =
    (B[0].clicked &&
      I[1].clicked &&
      N[2].clicked &&
      G[3].clicked &&
      O[4].clicked) ||
    (B[4].clicked &&
      I[3].clicked &&
      N[2].clicked &&
      G[1].clicked &&
      O[0].clicked) ||
    rows(gameBoard) ||
    columns(gameBoard);
  const { left, seed, used } = gameState;
  return { left, seed, used, winner };
};
