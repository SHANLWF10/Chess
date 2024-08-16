const { Chess } = require("chess.js");

const socket = io();
const chess = new Chess();

const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = "";
  board.forEach((row, rowindex) => {
    row.forEach((square, squareindex) => {
      const squareElem = document.createElement("div");
      squareElem.classList.add(
        "square",
        (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
      );

      squareElem.dataset.row = rowindex;
      squareElem.dataset.col = squareindex;

      if (square) {
        const pieceElem = document.createElement("div");
        pieceElem.classList.add(
          "piece",
          square.color === "w" ? "white" : "black"
        );
        pieceElem.innerText = "";
        pieceElem.draggable = playerRole === square.color;
        pieceElem.addEventListener("dragstart", () => {
          if (pieceElem.draggable) {
            draggedPiece = pieceElem;
            sourceSquare = { row: rowindex, col: squareindex };
          }
        });
      }
    });
  });
};


const handleMove = () => {};

const getPieceUnicode = () => {};

renderBoard();
