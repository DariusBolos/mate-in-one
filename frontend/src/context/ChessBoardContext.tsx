import { createContext, useState, ReactNode } from "react";

type Cell = string | null;
type ChessBoardType = Cell[][];

interface ChessBoardContextType {
  chessBoard: ChessBoardType;
  setChessBoard: (board: ChessBoardType) => void;
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

  return (
    <ChessBoardContext.Provider value={{ chessBoard, setChessBoard }}>
      {children}
    </ChessBoardContext.Provider>
  );
}
