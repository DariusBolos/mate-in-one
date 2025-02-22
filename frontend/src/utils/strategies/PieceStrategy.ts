export default abstract class PieceStrategy {

    public isValidMove(_x: number, _y: number, _board: (string | null)[][], _color: string) {};

    public getValidMoves(_position: string, _board: (string | null)[][]) {}

    protected isKingInChess(_board: (string | null)[][], _color: string) {}
}