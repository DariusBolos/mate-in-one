export default abstract class PieceStrategy {

    protected isValidMove(x: number, y: number, board: (string | null)[][], color: string) {
        return x >= 0 && x < 8 && y >= 0 && y < 8 && !board[x][y]?.includes(color) && !board[x][y]?.includes("king");
    };

    public getValidMoves(_position: string, _board: (string | null)[][]) {}

    protected isKingInChess(_board: (string | null)[][], _color: string) {}
}