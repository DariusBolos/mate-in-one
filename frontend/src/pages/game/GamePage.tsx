import Board from "../../components/chess/Board";
// import MoveTracker from "../../components/chess/MoveTracker";

export default function GamePage() {
    return (
        <div className="flex items-center justify-evenly m-10">
            <Board/>
            {/* <MoveTracker/> */}
        </div>
    )
}