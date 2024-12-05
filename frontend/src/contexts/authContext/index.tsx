import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { firestoreGetUserInfo } from "../../firebase/firestore";

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  puzzlesSolved: number | null;
  incrementPuzzlesSolved: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [puzzlesSolved, setPuzzlesSolved] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user || null);
      setUserLoggedIn(!!user);
      setLoading(false);

      if (user?.email) {
        const userInfo = await firestoreGetUserInfo();
        setPuzzlesSolved(userInfo.puzzlesSolved);
      } else {
        setPuzzlesSolved(null);
      }
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

  const incrementPuzzlesSolved = () => {
    setPuzzlesSolved((prev) => (prev ?? 0) + 1);
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    puzzlesSolved,
    incrementPuzzlesSolved,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
