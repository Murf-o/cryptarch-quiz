import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { firestoreGetUserInfo } from "../../firebase/firestore";
import { useAuthRefreshContext } from "../AuthRefreshContext";

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  puzzlesSolved: number | null;
  username: string | null;
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
  const [username, setUsername] = useState<string | null>(null);
  const { triggerAuthRefresh } = useAuthRefreshContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user || null);
      setUserLoggedIn(!!user);
      setLoading(false);

      if (user?.email) {
        const userInfo = await firestoreGetUserInfo();
        setPuzzlesSolved(userInfo.puzzlesSolved);
        setUsername(userInfo.username);
      } else {
        setPuzzlesSolved(null);
      }
    });
    return unsubscribe;
  }, [triggerAuthRefresh]);

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
    puzzlesSolved,
    username,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
