import { useState, useEffect } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let hasVisited = false;

    try {
      hasVisited = sessionStorage.getItem('hasVisited') === 'true';
    } catch (error) {
      // sessionStorage unavailable (e.g., private browsing, storage blocked)
      hasVisited = true;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      try {
        sessionStorage.setItem('hasVisited', 'true');
      } catch (error) {
        // Ignore storage errors
      }
    }, hasVisited ? 0 : 3000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading;
};

export default useLoader;
