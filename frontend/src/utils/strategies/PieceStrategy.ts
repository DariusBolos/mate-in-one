import { BoardCoordinates } from "../../types/BoardCoordinates";

export default abstract class PieceStrategy {
    protected validPositions: BoardCoordinates[];

    protected constructor() {
        this.validPositions = [];
    }

    public isValidMove(){}

    public getValidPositions(startPosition: BoardCoordinates) {
        console.log(startPosition);
    };
}