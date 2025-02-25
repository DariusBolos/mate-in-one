import { useState } from "react";
import Board from "../../components/chess/board/Board";
import MoveTracker from "../../components/chess/ui/MoveTracker";
import PlayerBanner from "../../components/chess/ui/PlayerBanner";
import TurnBanner from "../../components/chess/ui/TurnBanner";
import { PieceColor } from "../../types/Piece";

export default function GamePage() {
    const [whiteMoves, setWhiteMoves] = useState<string[]>([]);
    const [blackMoves, setBlackMoves] = useState<string[]>([]);

    const addMove = (color: PieceColor, move: string) => {
        const moveDisplay = {
            "white": setWhiteMoves,
            "black": setBlackMoves
        }

       return moveDisplay[color](prevMoves => [...prevMoves, move]);
    }

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col items-baseline justify-evenly m-30 gap-8">
                <PlayerBanner username="Player 2" avatar="" />
                <Board handleNewMoveDisplay={addMove}/>
                <PlayerBanner username="Player 1" avatar="" />
            </div>
            <div className="flex flex-col justify-center gap-20 items-center h-dvh m-30">
                <TurnBanner player="Player 1" color="white"/>            
                <MoveTracker whiteMoves={whiteMoves} blackMoves={blackMoves} />
            </div>
        </div>
    )
}