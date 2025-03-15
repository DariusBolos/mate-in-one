import {
  convertCooordinatesStringToArray as stringToArray,
  convertPieceStringToObject as pieceStringToObj,
} from "../Convertors";
import PieceStrategy from "./PieceStrategy";

export default class PawnStrategy extends PieceStrategy {
  constructor() {
    super("pawn");
  }

  public getCapturingPositions(
    position: string,
    board: (string | null)[][]
  ): number[][] {
    const [x, y] = stringToArray(position);

    const { color } = pieceStringToObj(board[x][y]!);

    const moves: number[][] = [];

    if (color === "white") {
      moves.push([x - 1, y + 1], [x - 1, y - 1]);
    }

    if (color === "black") {
      moves.push([x + 1, y + 1], [x + 1, y - 1]);
    }

    return moves.filter(([newX, newY]) =>
      this.isValidMove(newX, newY, board, color)
    );
  }

  public getValidMoves(position: string, board: (string | null)[][]) {
    const [x, y] = stringToArray(position);

    const { color } = pieceStringToObj(board[x][y]!);

    let moves: number[][] = [];

    if (color === "white") {
      moves = !board[x - 1][y] ? [[x - 1, y]] : [];

      if (this.isStartingPosition(x, color) && !board[x - 2][y] && !board[x - 1][y]) {
        moves.push([x - 2, y]);
      }

      if (
        this.isCapturingPosition(x - 1, y - 1, board, color)
      ) {
        moves.push([x - 1, y - 1]);
      }

      if (
        this.isCapturingPosition(x - 1, y + 1, board, color)
      ) {
        moves.push([x - 1, y + 1]);
      }
    }

    if (color === "black") {
      moves = !board[x + 1][y] ? [[x + 1, y]] : [];

      if (this.isStartingPosition(x, color) && !board[x + 2][y] && !board[x + 1][y]) {
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

  private isStartingPosition(x: number, color: string) {
    if (color === "white") return x === 6;

    return x === 1;
  }

  private isCapturingPosition(
    x: number,
    y: number,
    board: (string | null)[][],
    color: string
  ) {
    return board[x][y] && !board[x][y].includes(color);
  }
}
