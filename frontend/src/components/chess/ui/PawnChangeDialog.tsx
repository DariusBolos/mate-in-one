import {
    AlertDialog,
    AlertDialogContent, AlertDialogDescription, AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";
import Piece from "@/components/chess/board/Piece.tsx";
import {MouseEvent} from "react";

type Props = {
    isOpen: boolean,
    chooseNewPiece: (e: MouseEvent<HTMLDivElement>) => void
    color: string
}

export default function PawnChangeDialog({isOpen, chooseNewPiece, color}: Props) {
    const promotionOptions = ["queen", "rook", "bishop", "knight"];

    return(
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Pawn Promotion Options</AlertDialogTitle>
                    <AlertDialogDescription>
                    </AlertDialogDescription>
                    <div className="flex justify-evenly">
                        {
                            promotionOptions.map((option: string, index: number) =>
                            (
                                <div
                                    key={index}
                                    id={`${option}-${color}`}
                                    className="cursor-pointer p-2 rounded-lg transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm"
                                    onClick={chooseNewPiece}
                                >
                                    <Piece id="option" pieceString={`${option}-${color}`} />
                                </div>
                            ))
                        }
                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}