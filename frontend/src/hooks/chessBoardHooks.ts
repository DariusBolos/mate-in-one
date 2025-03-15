import { create } from "zustand";
import { PieceColor } from "../types/Piece";

type Cell = string | null;
type ChessBoardType = Cell[][];
type ControlledBoardType = boolean[][];

interface ChessBoardState {
  chessBoard: ChessBoardType;
  moveColor: PieceColor;
  setChessBoard: (board: ChessBoardType) => void;
  setMoveColor: (color: PieceColor) => void;
}

interface ControlledState {
  whiteControlled: ControlledBoardType;
  blackControlled: ControlledBoardType;
  setWhiteControlled: (board: ControlledBoardType) => void;
  setBlackControlled: (board: ControlledBoardType) => void;
}

// [
// [
// "rook-black",
// "knight-black",
// "bishop-black",
// "queen-black",
// "king-black",
// "bishop-black",
// "knight-black",
// "rook-black",
// ],
// [
// "pawn-black",
// "pawn-black",
// "pawn-black",
// "pawn-black",
// "pawn-black",
// "pawn-black",
// "pawn-black",
// "pawn-black",
// ],
// [null, null, null, null, null, null, null, null],
// [null, null, null, null, null, null, null, null],
// [null, null, null, null, null, null, null, null],
// [null, null, null, null, null, null, null, null],
// [
// "pawn-white",
// "pawn-white",
// "pawn-white",
// "pawn-white",
// "pawn-white",
// "pawn-white",
// "pawn-white",
// "pawn-white",
// ],
// [
// "rook-white",
// "knight-white",
// "bishop-white",
// "queen-white",
// "king-white",
// "bishop-white",
// "knight-white",
// "rook-white",
// ],
// ],

const useChessStore = create<ChessBoardState>((set) => ({
  chessBoard: [
    [null, null, null, null, null, null, null, null],
    [null, null, null, "pawn-white", null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["pawn-white", "pawn-white", "pawn-white", null, "pawn-white", "pawn-white", "pawn-white", "pawn-white"],
    ["rook-white", "knight-white", "bishop-white", "queen-white", "king-white", "bishop-white", "knight-white", "rook-white"]
  ],
  moveColor: "white",
  setChessBoard: (board) => set({ chessBoard: board }),
  setMoveColor: (color) => set({ moveColor: color }),
}));

const useControlledStore = create<ControlledState>((set) => ({
  whiteControlled: [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, true, false, false, false, false, true, false],
    [true, true, true, true, true, true, true, true],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ],
  blackControlled: [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [true, true, true, true, true, true, true, true],
    [false, true, false, false, false, false, true, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
  ],
  setWhiteControlled: (board) => set({ whiteControlled: board }),
  setBlackControlled: (board) => set({ blackControlled: board }),
}));

export { useChessStore, useControlledStore };
