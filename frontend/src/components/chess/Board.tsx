import { useState } from 'react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import Piece from './Piece';
import { PieceName, Color} from '../../types/Piece';

export default function Board() {
    const boardLetters = "ABCDEFGH";
    const boardNumbers = "87654321";

    const initialBoard: (string | null)[][] = [
        ["rook", "knight-black", "bishop-black", "queen-black", "king-black", "bishop-black", "knight-black", "rook-black"],
        ["pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black", "pawn-black"],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ["pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white", "pawn-white"],
        ["rook-white", "knight-white", "bishop-white",  "queen-white", "king-white", "bishop-white", "knight-white", "rook-white"]
    ];

    const [chessBoard] = useState(initialBoard);

    const {setNodeRef} = useDroppable({
        id: "droppable"
    });

    return (
        <div className="relative">
            <DndContext>
                <div className="grid grid-cols-8 grid-rows-8 border-40 border-gray-800">
                    {chessBoard.flat().map((piece: string | null, index) => {
                        let name, color;                        
                        piece !== null ? [name, color] = piece!.split('-') : undefined;
                                                
                        return (
                        <div
                            key={index}
                            className={`w-20 h-20 flex items-center justify-center text-2xl font-bold ${
                                Math.floor(index / 8) % 2 === index % 2 ? "bg-orange-200" : "bg-orange-800"
                            }`}
                            ref={setNodeRef}
                        >
                            {piece !== null ? (<Piece name={name as PieceName} color={color as Color}/>) : null}
                        </div>
                    )})}
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
