import {
  convertCooordinatesStringToArray as stringToArray,
  convertPieceStringToObject as pieceStringToObj,
} from "../Convertors";
import PieceStrategy from "./PieceStrategy";

export default class PawnStrategy extends PieceStrategy {
  constructor() {
    super("pawn");
  }

  public getValidMoves(position: string, board: (string | null)[][]) {
    let [x, y] = stringToArray(position);

    const { color } = pieceStringToObj(board[x][y]!);

    let moves: number[][] = [];

    if (color === "white") {
      moves = !board[x - 1][y] ? [[x - 1, y]] : [];

      if (this.isStartingPosition(x) && !board[x - 2][y]) {
        moves.push([x - 2, y]);
      }

      if (
        this.isCapturingPosition(x - 1, y - 1, board, color) ||
        this.isCapturingPosition(x, y - 1, board, color)
      ) {
        moves.push([x - 1, y - 1]);
      }

      if (
        this.isCapturingPosition(x - 1, y + 1, board, color) ||
        this.isCapturingPosition(x, y + 1, board, color)
      ) {
        moves.push([x - 1, y + 1]);
      }
    }

    if (color === "black") {
      moves = !board[x + 1][y] ? [[x + 1, y]] : [];

      if (this.isStartingPosition(x) && !board[x + 2][y]) {
        moves.push([x + 2, y]);
      }

      if (this.isCapturingPosition(x + 1, y - 1, board, color)) {
        moves.push([x + 1, y - 1]);
      }

      if (this.isCapturingPosition(x + 1, y + 1, board, color)) {
        moves.push([x + 1, y + 1]);
      }
    }

    return moves.filter(([newX, newY]) =>
      this.isValidMove(newX, newY, board, color)
    );
  }

  private isStartingPosition(x: number) {
    return x === 1 || x === 6;
  }

  private isCapturingPosition(
    x: number,
    y: number,
    board: (string | null)[][],
    color: string
  ) {
    return board[x][y] && !board[x][y].includes(color);
  }

  public isValidEnPassantMove(
    x: number,
    y: number,
    board: (string | null)[][],
    color: string
  ) {
    return board[x - 1][y] && !board[x][y]!.includes(color);
  }
}
