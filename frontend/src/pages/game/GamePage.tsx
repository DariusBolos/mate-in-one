import { useEffect, useState } from "react";
import Board from "../../components/chess/board/Board";
import MoveTracker from "../../components/chess/ui/MoveTracker";
import PlayerBanner from "../../components/chess/ui/PlayerBanner";
import { Move } from "@/types/Move.ts";
import { useChessStore } from "@/hooks/ChessBoardHooks.ts";
import { Turn } from "@/types/Turn.ts";
import { PieceColor } from "@/types/Piece.ts";
import { useGame } from "@/hooks/GameHooks.ts";
import { ResultDialog } from "@/components/chess/ui/ResultDialog.tsx";
import { Result } from "@/types/Result.ts";
import { socket } from "@/configs/Client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function GamePage() {
  const { chessBoard, setChessBoard, moveColor, setMoveColor } =
    useChessStore();
  const { gameFinished, setGameFinished } = useGame();
  const [moves, setMoves] = useState<Move[]>([]);
  const [turn, setTurn] = useState<Turn>({
    player: "Player 1",
    color: "white",
  });
  const [endResult, setEndResult] = useState<Result>({
    winner: "",
    loser: "",
    way: "",
  });

  useEffect(() => {
    socket.on("receive_game_state", (state) => {
      const { board, color, moves } = state;

      setChessBoard(board);
      setMoveColor(color);
      setMoves([...moves]);

      color === "white"
        ? setTurn({ player: "Player1", color: "white" })
        : setTurn({ player: "Player2", color: "black" });
    });
  }, [socket]);

  const registerNewMove = (newMove: Move) => {
    if (!newMove) {
      return;
    }

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

  const endGame = (result: Result) => {
    //TODO save result logic
    setEndResult(result);
    setGameFinished(true);
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-col m-20 gap-8">
        <PlayerBanner username="Player 2" avatar="" />
        <Board
          handleNewMoveRegistration={registerNewMove}
          handleTurnChange={changeTurn}
          handleGameEnd={endGame}
          previousMoves={moves}
        />
        <PlayerBanner username="Player 1" avatar="" />
      </div>
      <div className="flex flex-col justify-center gap-20 items-center h-dvh ml-30">
        <div className="flex flex-col gap-10">
          <MoveTracker moves={moves} />
          <div className="flex flex-row justify-start gap-5">
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-600 hover:scale-105 cursor-pointer"
              variant="outline"
              size="lg"
              onClick={revertMove}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-blue-600 hover:scale-105 cursor-pointer"
              variant="outline"
              size="lg"
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <ResultDialog isOpen={gameFinished} result={endResult} />
    </div>
  );
}
