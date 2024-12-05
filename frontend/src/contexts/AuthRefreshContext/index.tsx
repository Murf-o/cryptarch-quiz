import React, { createContext, useState, useContext, ReactNode } from "react";

// Create a context to handle refresh state
interface AuthRefreshContextType {
  triggerAuthRefresh: () => void;
}

const AuthRefreshContext = createContext<AuthRefreshContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthRefreshContext = (): AuthRefreshContextType => {
  const context = useContext(AuthRefreshContext);
  if (!context) {
    throw new Error(
      "useAuthRefreshContext must be used within an AuthRefreshProvider"
    );
  }
  return context;
};

export const AuthRefreshProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [, setRefreshKey] = useState(0);

  const triggerAuthRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Trigger refresh by updating the key
  };

  return (
    <AuthRefreshContext.Provider value={{ triggerAuthRefresh }}>
      {children}
    </AuthRefreshContext.Provider>
  );
};
