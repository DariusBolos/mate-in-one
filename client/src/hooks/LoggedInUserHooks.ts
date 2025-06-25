import { LoggedInContext } from "@/context/LoggedInContext";
import { useContext } from "react";

export function useLoginInfo() {
  const context = useContext(LoggedInContext);
  if (context === undefined) {
    throw new Error("useLoginInfo must be used within a LoggedInProvider");
  }
  return context;
}
