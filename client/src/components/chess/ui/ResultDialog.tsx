import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Result} from "@/types/Result.ts";
import {NavLink} from "react-router";

type Props = {
    isOpen: boolean,
    result: Result
}

export function ResultDialog({isOpen, result}: Props) {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Game has finished</AlertDialogTitle>
                    <AlertDialogDescription>
                        {`${result.winner} beat ${result.loser} by way of ${result.way}`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <NavLink to="/dashboard">
                        <AlertDialogAction className="cursor-pointer">
                            Return to the Dashboard
                        </AlertDialogAction>
                    </NavLink>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
