import PieceStrategy from "./PieceStrategy";
import { convertCooordinatesStringToArray as stringToArray, convertPieceStringToObject as pieceStringToObj } from "../Convertors";

export default class BishopStrategy extends PieceStrategy {
    constructor() {
        super();
    }

    public getValidMoves(position: string, board: (string | null)[][]) {
        const [x, y] = stringToArray(position);
        const {color} = pieceStringToObj(board[x][y]!);

        const moves: number[][] = [];

        const directions = [
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];

        directions.forEach(([dx, dy]) => {
            let newX = x + dx;
            let newY = y + dy;

            while(this.isValidMove(newX, newY, board, color)) {
                if(!board[newX][newY]) {
                    moves.push([newX, newY]);
                } else {
                    
                    if(!board[newX][newY]?.includes(color)) {
                        moves.push([newX, newY]);
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