type TurnBannerProps = {
    player: string,
    color: string
}

export default function TurnBanner({player, color}: TurnBannerProps) {
    // pass state function as prop
    return (
        <div className="w-m border-4 border-gray-800 content-center p-4 rounded-2xl">
            <p className="text-white font-bold text-2xl">Next Turn: {player} ({color})</p>
        </div>
    )
}