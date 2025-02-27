import { BoardCoordinates } from "./BoardCoordinates";

export type Move = {
  startPosition: BoardCoordinates;
  endPosition: BoardCoordinates;
  movedPiece: string;
  capturedPiece: string | null;
};
