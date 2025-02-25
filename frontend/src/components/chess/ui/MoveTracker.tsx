type Props = {
    whiteMoves: string[],
    blackMoves : string[]
}


export default function MoveTracker({whiteMoves, blackMoves}: Props) {
    
    const sectionStyle = "w-32 h-96 flex flex-col justify-start items-center";
    const entryStyle = "text-white font-bold m-2 text-xl";

    return (
        <div className="flex flex-row justify-evenly w-sm p-4 overflow-scroll bg-inherit border-6 border-gray-800 rounded-2xl">
            <div className={sectionStyle}>           
                {whiteMoves.map((move, index) =>       
                    <div className="flex flex-row justify-around">
                        <p className={entryStyle}>{index + 1}.</p>
                        <p key={`whiteMove-${index}`} className={entryStyle}>{move}</p>
                    </div>                        
                )}
            </div>
            <div className={sectionStyle}>
                {blackMoves.map((move, index) => <p key={`blackMove-${index}`} className={entryStyle}>{move}</p>)}
            </div>
        </div>
    )  
}