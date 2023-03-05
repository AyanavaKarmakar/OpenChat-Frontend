import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GreetingResponseSchema } from "./types/GreetingResponse";
import { useErrorStore } from "./stores/ErrorStore";
import { ErrorToast, BaseToast } from "./components";

const App = () => {
  const [loading, isLoading] = useState(true);
  const error = useErrorStore();

  const GetGreeting = useQuery({
    queryKey: ["greeting"],

    queryFn: async () => {
      const response = await fetch("http://localhost:5271");
      const data = await response.json();

      return GreetingResponseSchema.parse(data);
    },

    enabled: true,

    onSuccess: () => {
      error.clearError();
    },

    onError: () => {
      error.setError();
    },

    onSettled: () => {
      isLoading(false);
    },
  });

  return (
    <>
      {!loading && GetGreeting.data && (
        <BaseToast severity="info" message={GetGreeting.data.message} />
      )}

      {loading && <p>Loading...</p>}

      <ErrorToast />
    </>
  );
};

export default App;
