import { useDroppable } from "@dnd-kit/core";
import Piece from "./Piece";

type SquareProps = {
    piece: string | null, 
    rowIndex: number, 
    colIndex: number
}

export default function Square({ piece, rowIndex, colIndex }: SquareProps) {
    const id = `${rowIndex}-${colIndex}`;

    const { isOver, setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`w-20 h-20 flex items-center justify-center text-2xl font-bold ${
                (rowIndex + colIndex) % 2 === 0 ? "bg-orange-200" : "bg-orange-800"
            }`}
            style={{ border: isOver ? "4px solid black" : undefined }}
        >
            {piece && <Piece id={id} pieceString={piece} />}
        </div>
    );
}