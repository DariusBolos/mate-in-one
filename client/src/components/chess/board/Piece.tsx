import createPiece from "../../../utils/PieceFactory";
import { Piece as PieceProps } from "../../../types/Piece";
import { useDraggable } from "@dnd-kit/core";
import { convertPieceStringToObject } from "@/utils/Convertors.ts";

export default function Piece({ id, pieceString }: PieceProps) {
  const piecePropsObject = convertPieceStringToObject(pieceString);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {createPiece(piecePropsObject.name, piecePropsObject.color)}
    </div>
  );
}
