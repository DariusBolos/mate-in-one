import PieceStrategy from "./PieceStrategy";
import {
  convertCoordinatesStringToArray as stringToArray,
  convertPieceStringToObject as pieceStringToObj,
} from "../Convertors";

export default class KnightStrategy extends PieceStrategy {
  constructor() {
    super("knight");
  }

  protected isValidMove(x: number, y: number): boolean {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  public getValidMoves(
    position: string,
    board: (string | null)[][],
    controlling: boolean = false
  ) {
    const [x, y] = stringToArray(position);
    const { color } = pieceStringToObj(board[x][y]!);

    const moves = [
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 1, y + 2],
      [x + 1, y - 2],
      [x - 1, y + 2],
      [x - 1, y - 2],
    ];

    if (controlling)
      return moves.filter(([newX, newY]) => this.isValidMove(newX, newY));

    return moves.filter(([newX, newY]) =>
      super.isValidMove(newX, newY, board, color)
    );
  }
}
