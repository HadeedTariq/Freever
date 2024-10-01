import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as Redux } from "react-redux";
import { store } from "@/store/store";
import { BrowserRouter } from "react-router-dom";

const client = new QueryClient();

type ProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: ProviderProps) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <Redux store={store}>{children}</Redux>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
