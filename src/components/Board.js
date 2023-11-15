import { BOARD_SIZE } from "../constants";
import Square from "./Square";

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }

  return { winner: null, line: [] };
};

const Board = ({ xIsNext, squares, onPlay }) => {
  const { winner, line } = calculateWinner(squares);
  let status;

  if (
    squares.every((square) => square !== null) &&
    !calculateWinner(squares).winner
  ) {
    status = "DRAW";
  } else if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i) => {
    if (calculateWinner(squares).winner || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares, i);
  };

  const renderSquare = (i) => {
    const highlight = line.includes(i);

    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        highlight={highlight}
      />
    );
  };

  let rows = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    let boardSquares = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      boardSquares.push(renderSquare(row * BOARD_SIZE + col));
    }

    rows.push(
      <div key={row} className="board-row">
        {boardSquares}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
};

export default Board;
