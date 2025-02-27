import { useContext } from "react";
import { ChessBoardContext } from "../context/ChessBoardContext";

export function useChessBoard() {
  const context = useContext(ChessBoardContext);
  if (!context) {
    throw new Error("useChessBoard must be used within a ChessBoardProvider");
  }
  return context;
}
