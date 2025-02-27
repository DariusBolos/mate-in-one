import { createContext, useState, ReactNode } from "react";
import { PieceColor } from "../types/Piece";

type Cell = string | null;
type ChessBoardType = Cell[][];

interface ChessBoardContextType {
  chessBoard: ChessBoardType;
  moveColor: PieceColor;
  setChessBoard: (board: ChessBoardType) => void;
  setMoveColor: (color: PieceColor) => void;
}

export const ChessBoardContext = createContext<ChessBoardContextType | null>(
  null
);

export function ChessBoardProvider({ children }: { children: ReactNode }) {
  const initialBoard: ChessBoardType = [
    [
      "rook-black",
      "knight-black",
      "bishop-black",
      "queen-black",
      "king-black",
      "bishop-black",
      "knight-black",
      "rook-black",
    ],
    [
      "pawn-black",
      "pawn-black",
      "pawn-black",
      "pawn-black",
      "pawn-black",
      "pawn-black",
      "pawn-black",
      "pawn-black",
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      "pawn-white",
      "pawn-white",
      "pawn-white",
      "pawn-white",
      "pawn-white",
      "pawn-white",
      "pawn-white",
      "pawn-white",
    ],
    [
      "rook-white",
      "knight-white",
      "bishop-white",
      "queen-white",
      "king-white",
      "bishop-white",
      "knight-white",
      "rook-white",
    ],
  ];

  const [chessBoard, setChessBoard] = useState<ChessBoardType>(initialBoard);
  const [moveColor, setMoveColor] = useState<PieceColor>("white");

  return (
    <ChessBoardContext.Provider
      value={{ chessBoard, moveColor, setChessBoard, setMoveColor }}
    >
      {children}
    </ChessBoardContext.Provider>
  );
}
