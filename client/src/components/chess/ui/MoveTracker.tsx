import { Move } from "../../../types/Move";

type Props = {
  moves: Move[];
};

export default function MoveTracker({ moves }: Props) {
  const sectionStyle = "w-32 h-96 flex flex-col justify-start items-center";
  const entryStyle = "text-white font-bold m-2 text-xl";

  const whiteMoves = moves.filter((move: Move) =>
    move.movedPiece.includes("white")
  );

  const blackMoves = moves.filter((move: Move) =>
    move.movedPiece.includes("black")
  );

  return (
    <div className="flex flex-row justify-evenly w-sm p-4 overflow-scroll bg-inherit border-6 border-gray-800 rounded-2xl">
      <div className={sectionStyle}>
        {whiteMoves.map((move: Move, index: number) => {
          const boardLetter = "abcdefgh".charAt(move.endPosition.colIndex);
          const boardNumber = "87654321".charAt(move.endPosition.rowIndex);
          const position = `${boardLetter}${boardNumber}`;

          return (
            <div
              key={`counterDiv-${index}`}
              className="flex flex-row justify-around"
            >
              <p key={index} className={entryStyle}>
                {index + 1}.
              </p>
              <p key={`whiteMove-${index}`} className={entryStyle}>
                {position}
              </p>
            </div>
          );
        })}
      </div>
      <div className={sectionStyle}>
        {blackMoves.map((move: Move, index: number) => {
          const boardLetter = "abcdefgh".charAt(move.endPosition.colIndex);
          const boardNumber = "87654321".charAt(move.endPosition.rowIndex);
          const position = `${boardLetter}${boardNumber}`;

          return (
            <p key={`blackMove-${index}`} className={entryStyle}>
              {position}
            </p>
          );
        })}
      </div>
    </div>
  );
}
