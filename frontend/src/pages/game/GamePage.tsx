import { useState } from "react";
import Board from "../../components/chess/board/Board";
import MoveTracker from "../../components/chess/ui/MoveTracker";
import PlayerBanner from "../../components/chess/ui/PlayerBanner";
import TurnBanner from "../../components/chess/ui/TurnBanner";
import { Move } from "../../types/Move";
import DefaultButton from "../../components/shared/button/DefaultButton";
import { useChessStore } from "../../hooks/chessBoardHooks";
import { Turn } from "../../types/Turn";
import { PieceColor } from "../../types/Piece";

export default function GamePage() {
  const { chessBoard, setChessBoard, moveColor, setMoveColor } =
    useChessStore();
  const [moves, setMoves] = useState<Move[]>([]);
  const [turn, setTurn] = useState<Turn>({
    player: "Player 1",
    color: "white",
  });

  const registerNewMove = (newMove: Move) => {
    setMoves((prevMoves) => [...prevMoves, newMove]);
  };

  const revertMove = () => {
    const move = moves.pop();

    if (!move) {
      return;
    }

    const newBoard = chessBoard.map((row) => [...row]);
    newBoard[move!.startPosition.rowIndex][move!.startPosition.colIndex] =
      move!.movedPiece;

    newBoard[move!.endPosition.rowIndex][move!.endPosition.colIndex] =
      move!.capturedPiece;

    setMoves([...moves]);
    setChessBoard(newBoard);

    moveColor === "white" ? setMoveColor("black") : setMoveColor("white");
    moveColor === "white"
      ? setTurn({ player: "Player2", color: "black" })
      : setTurn({ player: "Player1", color: "white" });
  };

  const changeTurn = (player: string, color: PieceColor) => {
    setTurn({ player, color });
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-col items-baseline justify-evenly m-30 gap-8">
        <PlayerBanner username="Player 2" avatar="" />
        <Board
          handleNewMoveRegistration={registerNewMove}
          handleTurnChange={changeTurn}
          previousMoves={moves}
        />
        <PlayerBanner username="Player 1" avatar="" />
      </div>
      <div className="flex flex-col justify-center gap-20 items-center h-dvh m-30">
        <TurnBanner player={turn.player} color={turn.color} />
        <div className="flex flex-col gap-10">
          <MoveTracker moves={moves} />
          <div className="flex flex-row justify-evenly">
            <DefaultButton
              text={"Revert Last Move"}
              clickFunction={revertMove}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
