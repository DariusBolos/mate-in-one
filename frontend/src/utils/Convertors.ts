import { BoardCoordinates } from "../types/BoardCoordinates";

const convertBoardCodeToObject = (boardCode: string) => {
    const [row, col] = boardCode.split('-');

    return {
        rowIndex: Number(row),
        colIndex: Number(col)
    } as BoardCoordinates
}

export {convertBoardCodeToObject}