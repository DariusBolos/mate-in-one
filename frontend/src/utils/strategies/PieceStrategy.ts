import { selectStrategy } from "./StrategySelector";
import { convertPieceStringToObject as stringToObj } from "../Convertors";

export default abstract class PieceStrategy {
  private strategyType: string;

  constructor(argType: string) {
    this.strategyType = argType;
  }

  protected isValidMove(
    x: number,
    y: number,
    board: (string | null)[][],
    color: string
  ) {
    return x >= 0 && x < 8 && y >= 0 && y < 8 && !board[x][y]?.includes(color);
  }

  public getValidMoves(
    _position: string,
    _board: (string | null)[][]
  ): number[][] {
    return [];
  }

  public getCapturingPositions(
    _position: string,
    _board: (string | null)[][]
  ): number[][] {
    return [];
  }

  public getStrategyType() {
    return this.strategyType;
  }

  public getControlledPositions(board: (string | null)[][]) {
    let whiteControlled: number[][] = [];
    let blackControlled: number[][] = [];

    board.forEach((row: (string | null)[], rowIndex: number) => {
      row.forEach((square: string | null, colIndex: number) => {
        if (square !== null) {
          const piece = stringToObj(square);
          const strategy = selectStrategy(piece.name);

          if (square === "pawn-white") {
            whiteControlled = [
              ...whiteControlled,
              ...strategy.getCapturingPositions(
                `${rowIndex}-${colIndex}`,
                board
              ),
            ];

            return;
          }

          if (square === "pawn-black") {
            blackControlled = [
              ...blackControlled,
              ...strategy.getCapturingPositions(
                `${rowIndex}-${colIndex}`,
                board
              ),
            ];

            return;
          }

          if (piece.color === "white") {
            whiteControlled = [
              ...whiteControlled,
              ...strategy.getValidMoves(`${rowIndex}-${colIndex}`, board),
            ];
          }

          if (piece.color === "black") {
            blackControlled = [
              ...blackControlled,
              ...strategy.getValidMoves(`${rowIndex}-${colIndex}`, board),
            ];
          }
        }
      });
    });

    return {
      whiteControlled,
      blackControlled,
    };
  }
}
