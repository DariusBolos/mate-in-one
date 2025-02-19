import getPieces from "./ChessPieces";
import { Piece as PieceProps } from "../../types/Piece";

export default function Piece({name, color}: PieceProps) {
    return getPieces(color)[name];
}