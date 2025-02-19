type PieceName = "king" | "queen" | "bishop" | "knight" | "rook" | "pawn";
type Color = "white" | "black";

type Piece = {
    name: PieceName,
    color: Color
}

export type {Piece, PieceName, Color}