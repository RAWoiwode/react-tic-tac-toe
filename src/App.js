import { useState } from "react";
import Board from "./components/Board";
import { BOARD_SIZE } from "./constants";

const Game = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  console.log(history);

  const handlePlay = (nextSquares, clickedSquareIndex) => {
    const row = Math.floor(clickedSquareIndex / BOARD_SIZE);
    const col = clickedSquareIndex % BOARD_SIZE;
    const moveInfo = {
      squares: nextSquares,
      location: { row: row + 1, col: col + 1 },
    };
    // const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextHistory = history.slice(0, currentMove + 1).concat([moveInfo]);

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const toggleSort = () => {
    setIsAscending(!isAscending);
  };

  const moves = history.map((square, move) => {
    let description;

    if (move == currentMove) {
      description = "You are at move #" + move;
      return (
        <li key={move}>
          <p>{description}</p>
        </li>
      );
    } else if (move > 0) {
      description = `Go to move #${move} - (${square.location?.row}, ${square.location?.col})`;
    } else {
      description = `Go to game start`;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          move={currentMove}
        />
      </div>
      <div className="game-info">
        <button onClick={toggleSort}>Sort</button>
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
};

export default Game;
