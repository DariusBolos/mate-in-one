import { DragEvent, useState } from 'react';
import getPieces from './ChessPieces';

export default function Board() {
    const boardLetters = "ABCDEFGH";
    const boardNumbers = "87654321";

    const whitePieces = getPieces("white");
    const blackPieces = getPieces("black");

    const initialBoard: (JSX.Element | null)[][] = [
        [blackPieces.rook, blackPieces.knight, blackPieces.bishop, blackPieces.queen, blackPieces.king, blackPieces.bishop, blackPieces.knight, blackPieces.rook],
        [blackPieces.pawn, blackPieces.pawn, blackPieces.pawn, blackPieces.pawn, blackPieces.pawn, blackPieces.pawn, blackPieces.pawn, blackPieces.pawn],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [whitePieces.pawn, whitePieces.pawn, whitePieces.pawn, whitePieces.pawn, whitePieces.pawn, whitePieces.pawn, whitePieces.pawn, whitePieces.pawn],
        [whitePieces.rook, whitePieces.knight, whitePieces.bishop, whitePieces.queen, whitePieces.king, whitePieces.bishop, whitePieces.knight, whitePieces.rook]
    ];

    const [chessBoard, setChessBoard] = useState(initialBoard);

    const handleDragEvent = (e: DragEvent) => {
        e.preventDefault();

        console.log(e.target);
    }

    return (
        <div className="relative">
            <div className="grid grid-cols-8 grid-rows-8 border-40 border-gray-800">
                {chessBoard.flat().map((piece, index) => (
                    <div
                        key={index}
                        className={`w-20 h-20 flex items-center justify-center text-2xl font-bold ${
                            Math.floor(index / 8) % 2 === index % 2 ? "bg-orange-200" : "bg-orange-800"
                        }`}
                        onDragStart={handleDragEvent}
                    >
                        {piece}
                    </div>
                ))}
            </div>

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
