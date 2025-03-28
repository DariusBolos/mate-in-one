import { Toaster } from "@/components/ui/sonner";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

interface GameContextType {
  gameFinished: boolean;
  setGameFinished: Dispatch<SetStateAction<boolean>>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

function GameProvider({ children }: Props) {
  const [gameFinished, setGameFinished] = useState(false);

  return (
    <GameContext.Provider value={{ gameFinished, setGameFinished }}>
      {children}
      <Toaster
        toastOptions={{
          className: "text-lg py-4 px-6",
          style: {
            maxWidth: "600px",
          },
        }}
      />
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
