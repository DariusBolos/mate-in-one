import { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import Square from './Square';

export default function Board() {
    const boardLetters = "ABCDEFGH";
    const boardNumbers = "87654321";

    const initialBoard: (string | null)[][] = [
        ["rook-black", "knight-black", "bishop-black", "queen-black", "king-black", "bishop-black", "knight-black", "rook-black"],
        ["pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black"],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ["pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white"],
        ["rook-white", "knight-white", "bishop-white", "queen-white", "king-white", "bishop-white", "knight-white", "rook-white"]
    ];

    const [chessBoard, setChessBoard] = useState(initialBoard);
    const [moveStrategy, setMoveStrategy] = useState(null);

    const handleDragStart = (event: DragStartEvent) => {
        console.log(event);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const initialBoard: (string | null)[][] = [
            ["rook-black", "knight-black", "bishop-black", "queen-black", "king-black", "bishop-black", "knight-black", "rook-black"],
            ["pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black"],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, "pawn-white", null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ["pawn-white", null, "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white"],
            ["rook-white", "knight-white", "bishop-white",  "queen-white", "king-white", "bishop-white", "knight-white", "rook-white"]
        ];

        setChessBoard(initialBoard);
    }

    return (
        <div className="relative">
            <DndContext
                onDragStart={handleDragStart} 
                onDragEnd={handleDragEnd}
            >
                <div className="grid grid-cols-8 grid-rows-8 border-40 border-gray-800">
                {chessBoard.map((row, rowIndex) =>
                        row.map((pieceCode, colIndex) => (
                            <Square key={`${7 - rowIndex}-${colIndex}`} piece={pieceCode} rowIndex={rowIndex} colIndex={colIndex} />
                        ))
                    )}
                </div>
            </DndContext>

            <div className="absolute left-0 top-0 flex flex-col justify-center gap-15 h-full ml-4">
                {boardNumbers.split("").map((number, index) => (
                    <span key={index} className="text-white text-sm font-bold">{number}</span>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full flex justify-center gap-5 mb-2">
                {boardLetters.split("").map((letter, index) => (
                    <span key={index} className="w-15 text-center text-white text-sm font-bold">{letter}</span>
                ))}
            </div>
        </div>
    );
}
