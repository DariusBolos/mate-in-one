import { selectStrategy } from "./StrategySelector";
import { convertPieceStringToObject as stringToObj } from "../Convertors";

export default abstract class PieceStrategy {
  private strategyType: string;
  private whiteControlledPositions: number[][];
  private blackControlledPositions: number[][];

  constructor(argType: string) {
    this.strategyType = argType;
    this.whiteControlledPositions = [];
    this.blackControlledPositions = [];
  }

  protected isValidMove(
    x: number,
    y: number,
    board: (string | null)[][],
    color: string
  ) {
    if (this.isKingInCheck(board, color)) {
      return false;
    }

    return (
      x >= 0 &&
      x < 8 &&
      y >= 0 &&
      y < 8 &&
      !board[x][y]?.includes(color) &&
      !board[x][y]?.includes("king")
    );
  }

  public getValidMoves(_position: string, _board: (string | null)[][]) {}

  public getStrategyType() {
    return this.strategyType;
  }

  private isKingInCheck(board: (string | null)[][], color: string) {
    const controlledPositions: any = {
      white: this.blackControlledPositions,
      black: this.whiteControlledPositions,
    };

    board.forEach((row: (string | null)[], rowIndex: number) =>
      row.forEach((_col: string | null, colIndex: number) => {
        if (board[rowIndex][colIndex] === `king-${color}`) {
          const controlled: number[][] = controlledPositions[color];

          if (
            controlled.some(
              ([row, col]) => row === rowIndex && col === colIndex
            )
          ) {
            return true;
          }
        }

        return false;
      })
    );

    return false;
  }

  public updateControlledPositions(board: (string | null)[][]) {
    let whiteControlled: number[][] = [];
    let blackControlled: number[][] = [];

    board.forEach((row: (string | null)[], rowIndex: number) => {
      row.forEach((square: string | null, colIndex: number) => {
        if (square !== null) {
          const piece = stringToObj(square);
          const strategy = selectStrategy(piece.name);

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

    this.whiteControlledPositions = [...whiteControlled];
    this.blackControlledPositions = [...blackControlled];
  }

  public getWhiteControlledPositions() {
    return this.whiteControlledPositions;
  }

  public getBlackControlledPositions() {
    return this.blackControlledPositions;
  }
}
