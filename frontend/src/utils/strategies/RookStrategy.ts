import { BoardCoordinates } from "../../types/BoardCoordinates";
import PieceStrategy from "./PieceStrategy";


export default class RookStrategy extends PieceStrategy {
    constructor() {
        super();
    }

    public isValidMove(): boolean {
        return true;
    }

    public getValidPositions(startPosition: BoardCoordinates) {
        return startPosition;
    }
}