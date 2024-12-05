import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useHomeNavbarRefreshContext } from "../contexts/HomeNavbarContext";

function useHomeNavbarRefresh() {
  const { triggerRefresh } = useHomeNavbarRefreshContext();
  const auth = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (auth?.currentUser?.email) {
      // Trigger a refresh whenever the context triggers it
      setRefreshKey((prevKey) => prevKey + 1);
    }
  }, [triggerRefresh]); // Re-run when triggerRefresh changes

  return refreshKey;
}

export default useHomeNavbarRefresh;
