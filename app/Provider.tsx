import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
