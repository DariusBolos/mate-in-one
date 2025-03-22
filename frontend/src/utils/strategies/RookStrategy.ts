import PieceStrategy from "./PieceStrategy";
import {
  convertCoordinatesStringToArray as stringToArray,
  convertPieceStringToObject as pieceStringToObj,
} from "../Convertors";

export default class RookStrategy extends PieceStrategy {
  constructor() {
    super("rook");
  }

  public getValidMoves(position: string, board: (string | null)[][]) {
    const [x, y] = stringToArray(position);
    const { color } = pieceStringToObj(board[x][y]!);

    const moves: number[][] = [];

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    directions.forEach(([dx, dy]) => {
      let newX = x + dx;
      let newY = y + dy;

      while (this.isValidMove(newX, newY, board, color)) {
        if (!board[newX][newY]) {
          moves.push([newX, newY]);
        } else {
          if (!board[newX][newY]?.includes(color)) {
            moves.push([newX, newY]);
          }

          if(board[newX][newY]?.includes("king")) {
            moves.push([newX, newY]);
            newX += dx;
            newY += dy;
            continue;
          }

          break;
        }

        newX += dx;
        newY += dy;
      }
    });

    return moves;
  }
}
