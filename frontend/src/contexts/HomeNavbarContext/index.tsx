import React, { createContext, useState, useContext, ReactNode } from "react";

// Create a context to handle refresh state
interface HomeNavbarContextType {
  triggerRefresh: () => void;
}

const HomeNavbarRefreshContext = createContext<
  HomeNavbarContextType | undefined
>(undefined);

export const useHomeNavbarRefreshContext = (): HomeNavbarContextType => {
  const context = useContext(HomeNavbarRefreshContext);
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Trigger refresh by updating the key
  };

  return (
    <HomeNavbarRefreshContext.Provider value={{ triggerRefresh }}>
      {children}
    </HomeNavbarRefreshContext.Provider>
  );
};
