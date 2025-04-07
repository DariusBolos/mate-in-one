import PieceStrategy from "./PieceStrategy";
import {
  convertCoordinatesStringToArray as stringToArray,
  convertPieceStringToObject as pieceStringToObj,
} from "../Convertors";

export default class BishopStrategy extends PieceStrategy {
  constructor() {
    super("bishop");
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

    const moves: number[][] = [];

    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    directions.forEach(([dx, dy]) => {
      let newX = x + dx;
      let newY = y + dy;

      while (this.isValidMove(newX, newY)) {
        if (!board[newX][newY]) {
          moves.push([newX, newY]);
        } else {
          if (!board[newX][newY]?.includes(color)) {
            moves.push([newX, newY]);
            break;
          }

          if (controlling) moves.push([newX, newY]);

          break;
        }

        newX += dx;
        newY += dy;
      }
    });

    return moves;
  }
}
