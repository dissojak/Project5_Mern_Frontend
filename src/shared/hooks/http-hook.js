import { useCallback, useEffect, useState } from "react";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequests = []; // Using an array to store controllers

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController(); // Create a new controller for each request
      activeHttpRequests.push(httpAbortController); // Store the controller

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal, // Use the signal from the controller
        });
        const responseData = await response.json();

        // Remove the used controller from the array
        activeHttpRequests.splice(activeHttpRequests.indexOf(httpAbortController), 1);

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (e) {
        setError(e.message);
        setIsLoading(false);
        throw e;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // Abort all pending requests when the component unmounts
  // This ensures that no pending requests will update the state after the component has unmounted
  useEffect(() => {
    return () => {
      activeHttpRequests.forEach((abortCtrl) => {
        abortCtrl.abort();
      });
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
