import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase";

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(children: []) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
      setUserLoggedIn(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // async function initializeUser(user) {
  //   if (user) {
  //     setCurrentUser({ ...user });
  //     setUserLoggedIn(true);
  //   } else {
  //     setCurrentUser(null);
  //     setUserLoggedIn(false);
  //   }
  //   setLoading(false);
  // }

  const value = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
