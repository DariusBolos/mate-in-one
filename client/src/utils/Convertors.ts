import { BoardCoordinates } from "../types/BoardCoordinates";
import { PieceColor, PieceName } from "../types/Piece";

const convertCooordinatesStringToObject = (boardCode: string) => {
  const [row, col] = boardCode.split("-");

  return {
    rowIndex: Number(row),
    colIndex: Number(col),
  } as BoardCoordinates;
};

const convertCoordinatesStringToArray = (boardCode: string) => {
  const [row, col] = boardCode.split("-");
  return [Number(row), Number(col)];
};

const convertPieceStringToObject = (pieceString: string) => {
  const [name, color] = pieceString!.split("-");

  return {
    name: name as PieceName,
    color: color as PieceColor,
  };
};

export {
  convertCooordinatesStringToObject,
  convertCoordinatesStringToArray,
  convertPieceStringToObject,
};
