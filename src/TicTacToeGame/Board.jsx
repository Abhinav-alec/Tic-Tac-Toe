import React, { useState } from "react";
import Square from "./square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const handleReset = () => {
    setState(Array(9).fill(null));
    setIsXTurn(true); // Reset to "X" turn after reset
  };

  const checkWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (state[index] || checkWinner(state)) return; // Prevent overwriting or clicking after a win
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXTurn);
  };

  const winner = checkWinner(state);

  return (
    <div className="board-container">
      <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
        Tic-Tac-Toe
      </h1>
      {winner ? (
        <p>Winner: {winner}</p>
      ) : (
        <h4>Next Player: {isXTurn ? "X" : "O"}</h4>
      )}

      <div className="board-row">
        <Square onClick={() => handleClick(0)} value={state[0]} />
        <Square onClick={() => handleClick(1)} value={state[1]} />
        <Square onClick={() => handleClick(2)} value={state[2]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(3)} value={state[3]} />
        <Square onClick={() => handleClick(4)} value={state[4]} />
        <Square onClick={() => handleClick(5)} value={state[5]} />
      </div>
      <div className="board-row">
        <Square onClick={() => handleClick(6)} value={state[6]} />
        <Square onClick={() => handleClick(7)} value={state[7]} />
        <Square onClick={() => handleClick(8)} value={state[8]} />
      </div>
      {/* Centering the button */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <button
          onClick={handleReset}
          style={{
            fontSize: "20px", // Increase font size
            padding: "10px 20px", // Increase button size
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007BFF", // Button color
            color: "#FFFFFF", // Text color
            transition: "background-color 0.3s", // Smooth transition for hover effect
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          } // Darker shade on hover
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007BFF")
          } // Reset to original color
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Board;
