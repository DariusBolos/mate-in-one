import { PieceName } from "../../types/Piece";
import BishopStrategy from "./BishopStrategy";
import KingStrategy from "./KingStrategy";
import KnightStrategy from "./KnightStrategy";
import PawnStrategy from "./PawnStrategy";
import QueenStrategy from "./QueenStrategy";
import RookStrategy from "./RookStrategy";

export const selectStrategy = (name: PieceName) => {
    const strategies = {
        king: new KingStrategy(),
        queen: new QueenStrategy(),
        bishop: new BishopStrategy(),
        knight: new KnightStrategy(),
        rook: new RookStrategy(),
        pawn: new PawnStrategy()
    }

    return strategies[name];
}