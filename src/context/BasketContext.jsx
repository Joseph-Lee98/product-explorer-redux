import { createContext, useContext, useState } from "react";

// Create the context
const BasketContext = createContext(null);

// Create the provider
export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      {children}
    </BasketContext.Provider>
  );
}

// Custom Hook for accessing the basket context
export function useBasket() {
  const context = useContext(BasketContext);

  if (context === null) {
    throw new Error("useBasket must be used within a BasketProvider");
  }

  return context;
}
