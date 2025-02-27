import PieceStrategy from "./PieceStrategy";
import {
  convertCooordinatesStringToArray as stringToArray,
  convertPieceStringToObject as pieceStringToObj,
} from "../Convertors";

export default class KnightStrategy extends PieceStrategy {
  constructor() {
    super("knight");
  }

  public getValidMoves(position: string, board: (string | null)[][]) {
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

    return moves.filter(([newX, newY]) =>
      this.isValidMove(newX, newY, board, color)
    );
  }
}
