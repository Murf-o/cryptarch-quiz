import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { useAuthRefreshContext } from "../contexts/AuthRefreshContext";

function useAuthRefresh() {
  const { triggerAuthRefresh } = useAuthRefreshContext();
  const auth = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (auth?.currentUser?.email) {
      // Trigger a refresh whenever the context triggers it
      setRefreshKey((prevKey) => prevKey + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerAuthRefresh]); // Re-run when triggerRefresh changes

  return refreshKey;
}

export default useAuthRefresh;
