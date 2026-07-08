import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LoadingContextType {
  isBlocked: boolean;
  setBlocked: (blocked: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isBlocked: false,
  setBlocked: () => {},
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isBlocked, setBlocked] = useState(false);
  return (
    <LoadingContext.Provider value={{ isBlocked, setBlocked }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
