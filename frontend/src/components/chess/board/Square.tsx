import { useDroppable } from "@dnd-kit/core";
import Piece from "./Piece";

type SquareProps = {
  piece: string | null;
  rowIndex: number;
  colIndex: number;
  isValidPosition: boolean | undefined;
};

export default function Square({
  piece,
  rowIndex,
  colIndex,
  isValidPosition,
}: SquareProps) {
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
      {piece && !isValidPosition && <Piece id={id} pieceString={piece} />}
      {piece && isValidPosition && (
        <div className="border-4 border-gray-800 w-19 h-19 rounded-4xl flex justify-center items-center">
          <Piece id={id} pieceString={piece} />
        </div>
      )}
      {!piece && isValidPosition && (
        <div className="bg-gray-800 w-5 h-5 rounded-3xl" />
      )}
    </div>
  );
}
