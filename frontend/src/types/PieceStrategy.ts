import KingStrategy from "../utils/strategies/KingStrategy"
import QueenStrategy from "../utils/strategies/QueenStrategy.ts";
import BishopStrategy from "../utils/strategies/BishopStrategy.ts";
import KnightStrategy from "../utils/strategies/KnightStrategy.ts";
import RookStrategy from "../utils/strategies/RookStrategy.ts";
import PawnStrategy from "../utils/strategies/PawnStrategy.ts";

export type PieceStrategy = {
    king: KingStrategy,
    queen: QueenStrategy,
    bishop: BishopStrategy,
    knight: KnightStrategy,
    rook: RookStrategy,
    pawn: PawnStrategy
}