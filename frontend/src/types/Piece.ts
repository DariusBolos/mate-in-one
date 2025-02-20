type PieceName = "king" | "queen" | "bishop" | "knight" | "rook" | "pawn";
type PieceColor = "white" | "black";

type Piece = {
    id: string
    boardCode: string
}

export type {Piece, PieceName, PieceColor}