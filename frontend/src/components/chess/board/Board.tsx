import {useEffect, useRef, useState} from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import Square from "./Square";
import PawnChangeDialog from "@/components/chess/ui/PawnChangeDialog.tsx";
import { BoardCoordinates } from "@/types/BoardCoordinates.ts";
import {
  convertCooordinatesStringToObject as stringToObj,
  convertPieceStringToObject as pieceToObj,
  convertCoordinatesStringToArray as coordinatesToArray,
} from "../../../utils/Convertors";
import { selectStrategy } from "@/utils/strategies/StrategySelector.ts";
import { Strategy } from "@/types/Strategy.ts";
import {
  useChessStore,
  useControlledStore,
} from "@/hooks/ChessBoardHooks.ts";
import { Move } from "@/types/Move.ts";
import { PieceColor } from "@/types/Piece.ts";
import { MouseEvent } from "react";
import {toast} from "sonner";
import {Result} from "@/types/Result.ts";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

type Props = {
  handleNewMoveRegistration: (newMove: Move) => void;
  handleTurnChange: (player: string, color: PieceColor) => void;
  handleGameEnd: (result: Result) => void;
  previousMoves: Move[];
};

export default function Board({
  handleNewMoveRegistration,
  handleTurnChange, handleGameEnd,
  previousMoves,
}: Props) {
  const boardLetters = "ABCDEFGH";
  const boardNumbers = "87654321";

  const { chessBoard, moveColor, setChessBoard, setMoveColor } =
    useChessStore();
  const [moveStrategy, setMoveStrategy] = useState<Strategy | null>(null);
  const [initialPosition, setInitialPosition] = useState<number[]>([]);
  const [validMoves, setValidMoves] = useState<number[][]>([]);
  const {
    whiteControlled,
    blackControlled,
    setWhiteControlled,
    setBlackControlled,
  } = useControlledStore();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const resolvePromotionRef = useRef<((value: string) => void) | null>(null);

  useEffect(() => {
    const opponentColor = moveColor === "white" ? "Black" : "White";
    const controlledSquares = moveColor === "white" ? blackControlled : whiteControlled;

    if(isCheckmate(controlledSquares)) {
      toast.info(`Checkmate. ${opponentColor} wins.`);

      const result: Result = {
        winner: opponentColor,
        loser: moveColor.charAt(0).toUpperCase() + moveColor.slice(1),
        way: "Checkmate"
      }

      setTimeout(() => {
        handleGameEnd(result);
      }, 1000)
    }

    socket.emit("send_game_state", {
      board: chessBoard,
      color: moveColor
    });
  }, [moveColor]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    socket.on("receive_game_state", (data) => {
      const {board, color} = data;

      setChessBoard(board);
      setMoveColor(color);
    })
  }, [socket]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const { rowIndex, colIndex }: BoardCoordinates = stringToObj(
      String(active.id),
    );

    if (!chessBoard[rowIndex][colIndex]?.includes(moveColor)) {
      return;
    }

    const pieceObj = pieceToObj(chessBoard[rowIndex][colIndex] as string);
    const intermediaryStrategy = selectStrategy(pieceObj.name);
    setMoveStrategy(intermediaryStrategy);

    setValidMoves(
      intermediaryStrategy.getValidMoves(String(active.id), chessBoard),
    );

    if (pieceObj.name === "king") {
      setCastlingPositions(rowIndex, colIndex);
    }

    if (pieceObj.name === "pawn") {
      setEnPassantPositions(rowIndex, colIndex);
    }

    setInitialPosition([rowIndex, colIndex]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    const [x, y] = coordinatesToArray(String(over?.id));
    const [initialX, initialY] = initialPosition;

    if (!validMoves!.some(([row, col]) => row === x && col === y)) {
      return;
    }

    handleBoardUpdate(x, y, initialX, initialY).then();

    if (moveColor === "white") {
      handleTurnChange("Player 2", "black");
    } else {
      handleTurnChange("Player 1", "white");
    }
  };

  const handleBoardUpdate = async (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    const newBoard = chessBoard.map((row) => [...row]);

    const ongoingMove: Move = {
      startPosition: { rowIndex: x2, colIndex: y2 },
      endPosition: { rowIndex: x1, colIndex: y1 },
      movedPiece: newBoard[x2][y2]!,
      capturedPiece: newBoard[x1][y1],
    };

    // to be refactored, works for now
    // castling logic
    if (newBoard[x2][y2]?.includes("king")) {
      if (y1 === y2 + 2) {
        newBoard[x2][y2 + 2] = newBoard[x2][y2];
        newBoard[x2][y2 + 1] = newBoard[x2][7];
        newBoard[x2][7] = null;
        newBoard[x2][y2] = null;
        // ongoingMove = {...ongoingMove, endPosition: {rowIndex: x1, colIndex: y1 + 1}}
      } else if (y1 === y2 - 2) {
        newBoard[x2][y2 - 2] = newBoard[x2][y2];
        newBoard[x2][y2 - 1] = newBoard[x2][0];
        newBoard[x2][0] = null;
        newBoard[x2][y2] = null;
      } else {
        newBoard[x1][y1] = newBoard[x2][y2];
        newBoard[x2][y2] = null;
      }
    } else {
      // en passant logic
      if (newBoard[x2][y2]?.includes("pawn") && newBoard[x2][y2 + 1]?.includes("pawn") && y1 != y2) {
        !newBoard[x2][y2 + 1]?.includes(moveColor) && (newBoard[x2][y2 + 1] = null);
      }

      if (newBoard[x2][y2]?.includes("pawn") && newBoard[x2][y2 - 1]?.includes("pawn") && y1 != y2) {
        !newBoard[x2][y2 - 1]?.includes(moveColor) && (newBoard[x2][y2 - 1] = null);
      }

      if(newBoard[x2][y2]?.includes("pawn") && (x1 === 0 || x1 === 7)) {
        await handlePawnPromotion()
             .then((newPiece) => {
               newBoard[x2][y2] = newPiece;
             })
      }

      newBoard[x1][y1] = newBoard[x2][y2];
      newBoard[x2][y2] = null;
    }

    const { newWhiteControlled, newBlackControlled } =
      getUpdatedControlledSquares(newBoard);

    let isCheckOnKing;

    if (moveColor === "white") {
      isCheckOnKing = isCheck(newBoard, newBlackControlled);
    } else {
      isCheckOnKing = isCheck(newBoard, newWhiteControlled);
    }

    if (isCheckOnKing) {
      toast.info(`Cannot move there. ${moveColor.charAt(0).toUpperCase() + moveColor.slice(1)} King is in Check.`);
      return;
    }

    handleNewMoveRegistration(ongoingMove);
    setValidMoves([]);
    setChessBoard(newBoard);
    setWhiteControlled(newWhiteControlled);
    setBlackControlled(newBlackControlled);

    if (moveColor === "white") {
      setMoveColor("black");
    } else {
      setMoveColor("white");
    }
  };

  const isCheck = (
    chessBoard: (string | null)[][],
    controlledBoard: boolean[][],
  ) => {
    let check = false;

    chessBoard.forEach((row, rowIndex) =>
      row.forEach((squareString, colIndex) => {
        if (squareString === `king-${moveColor}`) {
          if (controlledBoard[rowIndex][colIndex]) check = true;
        }
      }),
    );

    return check;
  };

  const isCheckmate = (
      controlledBoard: boolean[][],
  ): boolean => {
    if (!isCheck(chessBoard, controlledBoard)) return false;

    let kingPosition: [number, number] | null = null;

    chessBoard.forEach((row, rowIndex) =>
        row.forEach((squareString, colIndex) => {
          if (squareString === `king-${moveColor}`) {
            kingPosition = [rowIndex, colIndex];
          }
        })
    );

    if (!kingPosition) return false;

    const [kingRow, kingCol] = kingPosition as [number, number];

    const strategy = selectStrategy("king");
    const kingMoves = strategy.getValidMoves(`${kingRow}-${kingCol}`, chessBoard);

    for (const [dx, dy] of kingMoves) {
      if(!controlledBoard[dx][dy]) {
        return false;
      }
    }

    const opponentColor = moveColor === "white" ? "black" : "white";

    const attackingPieces: [number, number][] = getAttackingPieces(kingPosition, opponentColor);

    if (attackingPieces.length === 1) {
      const [attackerRow, attackerCol] = attackingPieces[0];

      if (canPieceBeCaptured(attackerRow, attackerCol)) {
        return false;
      }

      if (canAttackBeBlocked(kingPosition, [attackerRow, attackerCol])) {
        return false;
      }
    }

    return true;
  };

  const getAttackingPieces = (kingPosition: [number, number], opponentColor: string): [number, number][] => {
    const attackingPiecePositions: [number, number][] = [];

    for (let rowIndex = 0; rowIndex < chessBoard.length; rowIndex++) {
      for (let colIndex = 0; colIndex < chessBoard[rowIndex].length; colIndex++) {
        const squareString = chessBoard[rowIndex][colIndex];

        if (squareString?.includes(opponentColor)) {
          const {name} = pieceToObj(squareString);
          const strategy = selectStrategy(name);
          const attackedPositions = strategy.getValidMoves(`${rowIndex}-${colIndex}`, chessBoard);

          if (attackedPositions.some(([row, col]) => row === kingPosition[0] && col === kingPosition[1])) {
            attackingPiecePositions.push([rowIndex, colIndex]);
          }
        }
      }
    }

    return attackingPiecePositions;
  };

  const canPieceBeCaptured = (attackerRow: number, attackerCol: number): boolean => {
    const controlledSquares = moveColor === "white" ? whiteControlled : blackControlled;

    return controlledSquares[attackerRow]?.[attackerCol] ?? false;
  };

  const canAttackBeBlocked = (
      kingPosition: [number, number],
      attackerPosition: [number, number],
  ): boolean => {
    const [attackerRow, attackerCol] = attackerPosition;

    const attackerPiece = chessBoard[attackerRow][attackerCol];
    if (!attackerPiece) return false;

    const {name} = pieceToObj(attackerPiece);

    let blockingSquares: [number, number][] = [];

    if (["queen", "rook", "bishop"].includes(name)) {
      blockingSquares = getPathBetween(kingPosition, attackerPosition);
    }

    if (blockingSquares.length === 0) return false;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = chessBoard[row][col]

        if (piece && piece.includes(moveColor) && !piece.includes("king")) {
          const {name} = pieceToObj(piece);
          const strategy = selectStrategy(name);
          const validMoves = strategy.getValidMoves(`${row}-${col}`, chessBoard);

          if (validMoves.some(([moveRow, moveCol]) =>
              blockingSquares.some(([blockRow, blockCol]) => blockRow === moveRow && blockCol === moveCol)
          )) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const getPathBetween = (start: [number, number], end: [number, number]): [number, number][] => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const path: [number, number][] = [];

    const rowStep = startRow < endRow ? 1 : startRow > endRow ? -1 : 0;
    const colStep = startCol < endCol ? 1 : startCol > endCol ? -1 : 0;

    let row = startRow + rowStep;
    let col = startCol + colStep;

    while (row !== endRow || col !== endCol) {
      path.push([row, col]);
      row += rowStep;
      col += colStep;
    }

    return path;
  };


  const getUpdatedControlledSquares = (board: (string | null)[][]) => {
    const controlledSquares:
      | {
          whiteControlled: number[][];
          blackControlled: number[][];
        }
      | undefined = moveStrategy?.getControlledPositions(board);

    const newWhiteControlled = whiteControlled.map((row) =>
      row.map(() => false),
    );
    const newBlackControlled = blackControlled.map((row) =>
      row.map(() => false),
    );

    controlledSquares?.whiteControlled.forEach(([row, col]) => {
      newWhiteControlled[row][col] = true;
    });

    controlledSquares?.blackControlled.forEach(([row, col]) => {
      newBlackControlled[row][col] = true;
    });

    return { newWhiteControlled, newBlackControlled };
  };

  const setCastlingPositions = (row: number, col: number) => {
    let shortCastle = true;
    let longCastle = true;

    if(chessBoard[row][col + 1] || chessBoard[row][col + 2]) {
      shortCastle = false;
    }

    if(chessBoard[row][col - 1] || chessBoard[row][col - 2] || chessBoard[row][col - 3]){
      longCastle = false;
    }

    if(!shortCastle && !longCastle) {
      return ;
    }

    previousMoves.forEach((move) => {
      if (move.movedPiece === `king-${moveColor}`) {
        shortCastle = false;
        longCastle = false;
        return;
      }

      if (
        move.movedPiece === `rook-${moveColor}` &&
        move.startPosition.colIndex === 0
      ) {
        longCastle = false;
        return;
      }

      if (
        move.movedPiece === `rook-${moveColor}` &&
        move.startPosition.colIndex === 7
      ) {
        shortCastle = false;
        return;
      }
    });

    shortCastle = shortCastle && !isSquareAttacked(row, 5) && !isSquareAttacked(row, 6);
    longCastle = longCastle && !isSquareAttacked(row, 2) && !isSquareAttacked(row, 3);

    shortCastle && setValidMoves((prev) => [...prev, [row, col + 2]]);
    longCastle && setValidMoves((prev) => [...prev, [row, col - 2]]);
  };

  const setEnPassantPositions = (row: number, col: number) => {
    const lastMove = previousMoves[previousMoves.length - 1];
    if (!lastMove) return;

    const { startPosition, endPosition, movedPiece } = lastMove;

    const isPawnMove = movedPiece.includes("pawn");
    const movedTwoSquares = Math.abs(startPosition.rowIndex - endPosition.rowIndex) === 2;
    const correctStartRow = movedPiece.includes("white") ? startPosition.rowIndex === 6 : startPosition.rowIndex === 1;

    if (!isPawnMove || !movedTwoSquares || !correctStartRow) return;

    if (moveColor === "white" && row === 3 && endPosition.rowIndex === 3) {
      if (endPosition.colIndex === col + 1) setValidMoves((prev) => [...prev, [row - 1, col + 1]]);
      if (endPosition.colIndex === col - 1) setValidMoves((prev) => [...prev, [row - 1, col - 1]]);
    }

    if (moveColor === "black" && row === 4 && endPosition.rowIndex === 4) {
      if (endPosition.colIndex === col + 1) setValidMoves((prev) => [...prev, [row + 1, col + 1]]);
      if (endPosition.colIndex === col - 1) setValidMoves((prev) => [...prev, [row + 1, col - 1]]);
    }
  };

  const isSquareAttacked = (row: number, col: number) => {
    const color = moveColor === "white" ? "black" : "white";
    const controlledSquares =
      color === "white" ? whiteControlled : blackControlled;

    return controlledSquares[row][col];
  };


  const getPawnPromotionPiece = (e: MouseEvent<HTMLDivElement>) => {
    if (resolvePromotionRef.current) {
      const selectedPiece = e.currentTarget.id;
      resolvePromotionRef.current(selectedPiece);
      resolvePromotionRef.current = null;
    } else {
      console.error("No promise to resolve.");
    }
  };

  const waitForPawnPromotion = (): Promise<string> => {
    return new Promise<string>((resolve) => {
      resolvePromotionRef.current = resolve;
    });
  };

  const handlePawnPromotion = async () => {
    setDialogOpen(true);
    const newPiece = await waitForPawnPromotion();
    setDialogOpen(false);

    return newPiece;
  };


  return (
    <div className="relative">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-8 grid-rows-8 border-40 border-gray-800">
          {chessBoard.map((row, rowIndex) =>
            row.map((pieceCode, colIndex) => {
              const isValid = validMoves?.some(
                ([row, col]) => row === rowIndex && col === colIndex,
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
            }),
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

      <PawnChangeDialog isOpen={isDialogOpen} chooseNewPiece={getPawnPromotionPiece} color={moveColor}/>
    </div>
  );
}
