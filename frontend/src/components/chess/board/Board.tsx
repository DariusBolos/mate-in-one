import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import Square from "./Square";
import { BoardCoordinates } from "../../../types/BoardCoordinates";
import {
  convertCooordinatesStringToObject as stringToObj,
  convertPieceStringToObject as pieceToObj,
  convertCooordinatesStringToArray as coordinatesToArray,
} from "../../../utils/Convertors";
import { selectStrategy } from "../../../utils/strategies/StrategySelector";
import { Strategy } from "../../../types/Strategy";
import { useChessBoard } from "../../../hooks/chessBoardHooks";

type Props = {
  handleNewMoveRegistration: Function;
  handleTurnChange: Function;
};

export default function Board({
  handleNewMoveRegistration,
  handleTurnChange,
}: Props) {
  const boardLetters = "ABCDEFGH";
  const boardNumbers = "87654321";

  const { chessBoard, moveColor, setChessBoard, setMoveColor } =
    useChessBoard();
  const [moveStrategy, setMoveStrategy] = useState<Strategy | null>(null);
  const [initialPosition, setInitialPosition] = useState<number[]>([]);
  const [validMoves, setValidMoves] = useState<void | number[][]>([]);

  useEffect(() => {
    handleWhiteControlledSquaresUpdate();
  }, [moveStrategy]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const { rowIndex, colIndex }: BoardCoordinates = stringToObj(
      String(active.id)
    );

    if (!chessBoard[rowIndex][colIndex]?.includes(moveColor)) {
      return;
    }

    const pieceObj = pieceToObj(chessBoard[rowIndex][colIndex] as string);
    const intermediaryStrategy = selectStrategy(pieceObj.name);
    setMoveStrategy(intermediaryStrategy);
    setValidMoves(
      intermediaryStrategy.getValidMoves(String(active.id), chessBoard)
    );

    setInitialPosition([rowIndex, colIndex]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    const [x, y] = coordinatesToArray(String(over?.id));
    const [initialX, initialY] = initialPosition;

    if (!validMoves!.some(([row, col]) => row === x && col === y)) {
      return;
    }

    handleBoardUpdate(x, y, initialX, initialY);

    moveColor === "white"
      ? handleTurnChange("Player 2", "black")
      : handleTurnChange("Player 1", "white");
  };

  const handleBoardUpdate = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const newBoard = chessBoard.map((row) => [...row]);

    handleNewMoveRegistration(
      { rowIndex: x2, colIndex: y2 },
      { rowIndex: x1, colIndex: y1 },
      newBoard[x2][y2],
      newBoard[x1][y1]
    );

    newBoard[x1][y1] = newBoard[x2][y2];
    newBoard[x2][y2] = null;

    setValidMoves([]);
    setChessBoard(newBoard);

    moveColor === "white" ? setMoveColor("black") : setMoveColor("white");
  };

  const handleWhiteControlledSquaresUpdate = () => {
    moveStrategy?.updateControlledPositions(chessBoard);
  };

  return (
    <div className="relative">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-8 grid-rows-8 border-40 border-gray-800">
          {chessBoard.map((row, rowIndex) =>
            row.map((pieceCode, colIndex) => {
              const isValid = validMoves?.some(
                ([row, col]) => row === rowIndex && col === colIndex
              );

              return (
                <Square
                  key={`${rowIndex}-${colIndex}`}
                  piece={pieceCode}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  isValidPosition={isValid}
                />
              );
            })
          )}
        </div>
      </DndContext>

      <div className="absolute left-0 top-0 flex flex-col justify-center gap-15 h-full ml-4">
        {boardNumbers.split("").map((number, index) => (
          <span key={index} className="text-white text-sm font-bold">
            {number}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full flex justify-center gap-5 mb-2">
        {boardLetters.split("").map((letter, index) => (
          <span
            key={index}
            className="w-15 text-center text-white text-sm font-bold"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
