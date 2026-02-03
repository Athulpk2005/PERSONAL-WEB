import { useState, useEffect } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasVisited', 'true');
    }, hasVisited ? 0 : 3000); // Show loader for 3 seconds on first visit only

    return () => clearTimeout(timer);
  }, []);

  return isLoading;
};

export default useLoader;
