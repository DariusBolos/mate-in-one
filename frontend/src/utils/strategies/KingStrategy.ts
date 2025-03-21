import PieceStrategy from "./PieceStrategy";
import {
  convertPieceStringToObject as pieceStringToObj,
  convertCoordinatesStringToArray as stringToArray,
} from "../Convertors";

export default class KingStrategy extends PieceStrategy {
  constructor() {
    super("king");
  }

  protected isValidMove(
    x: number,
    y: number,
    board: (string | null)[][],
    color: string,
  ) {
    return x >= 0 && x < 8 && y >= 0 && y < 8 && !board[x][y]?.includes(color);
  }

  public getValidMoves(position: string, board: (string | null)[][]) {
    const [x, y] = stringToArray(position);
    const { color } = pieceStringToObj(board[x][y]!);

    const moves = [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x - 1, y - 1],
    ];

    return moves.filter(([newX, newY]) =>
      this.isValidMove(newX, newY, board, color),
    );
  }
}
