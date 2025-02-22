import BishopStrategy from "../utils/strategies/BishopStrategy";
import KingStrategy from "../utils/strategies/KingStrategy";
import KnightStrategy from "../utils/strategies/KnightStrategy";
import PawnStrategy from "../utils/strategies/PawnStrategy";
import QueenStrategy from "../utils/strategies/QueenStrategy";
import RookStrategy from "../utils/strategies/RookStrategy";

export type Strategy = KingStrategy | QueenStrategy | BishopStrategy | RookStrategy | KnightStrategy | PawnStrategy;