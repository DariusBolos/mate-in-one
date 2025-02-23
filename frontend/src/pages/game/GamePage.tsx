import Board from "../../components/chess/board/Board";
// import MoveTracker from "../../components/chess/ui/MoveTracker";
import PlayerBanner from "../../components/chess/ui/PlayerBanner";
import TurnBanner from "../../components/chess/ui/TurnBanner";

export default function GamePage() {
    return (
        <div className="flex flex-row justify-center items-center">
            <div className="flex flex-col items-baseline justify-evenly m-30 gap-8">
                <PlayerBanner username="Player 2" avatar="" />
                <Board />
                <PlayerBanner username="Player 1" avatar="" />
            </div>
            <div className="flex flex-col justify-evenly items-baseline h-dvh m-30">
                <TurnBanner player="Player 1" color="white"/>
                {/* <MoveTracker /> */}
            </div>
        </div>
    )
}