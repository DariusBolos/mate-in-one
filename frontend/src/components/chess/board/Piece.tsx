import createPiece from "../../../utils/PieceFactory";
import { PieceColor, PieceName, Piece as PieceProps } from "../../../types/Piece";
import { useDraggable } from "@dnd-kit/core";

export default function Piece({id, boardCode}: PieceProps) {
    const [name, color] = boardCode!.split('-');
    
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {createPiece(name as PieceName, color as PieceColor)}
        </div>
    )
}