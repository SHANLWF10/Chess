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
        pieceElem.innerText = getPieceUnicode(square);
        pieceElem.draggable = playerRole === square.color;
        pieceElem.addEventListener("dragstart", (e) => {
          if (pieceElem.draggable) {
            draggedPiece = pieceElem;
            sourceSquare = { row: rowindex, col: squareindex };
            e.dataTransfer.setData("text/plain", "");
          }
        });
        pieceElem.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
        });

        squareElem.appendChild(pieceElem);
      }

      squareElem.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      squareElem.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece) {
          const targetSource = {
            row: parseInt(squareElem.dataset.row),
            col: parseInt(squareElem.dataset.col),
          };

          handleMove(sourceSquare, targetSource);
        }
      });
      boardElement.appendChild(squareElem);
    });
  });
};

const handleMove = () => {
  const move = {
    from:,
    to:,
    promotion: "q"
  }
};

const getPieceUnicode = (piece) => {
  const unicodePieces = {
    p: "♙",
    r: "♖",
    n: "♘",
    b: "♗",
    q: "♕",
    k: "♔",
    P: "♟",
    R: "♜",
    N: "♞",
    B: "♝",
    Q: "♛",
    K: "♚",
  };

  return unicodePieces[piece.type] || "";
};

renderBoard();
