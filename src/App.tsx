import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GreetingResponseSchema } from "./types/GreetingResponse";

const App = () => {
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState({ isError: false, message: "" });

  const GetGreeting = useQuery({
    queryKey: ["greeting"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5271");
      const data = await response.json();

      return GreetingResponseSchema.parse(data);
    },
    enabled: true,
    onError: () => {
      setError({
        isError: true,
        message: "Something went wrong. Please try again!",
      });
    },
    onSettled: () => {
      isLoading(false);
    },
  });

  return (
    <>
      <p>{GetGreeting.data?.message}</p>

      {loading && <p>Loading...</p>}

      {error.isError && <p>{error.message}</p>}
    </>
  );
};

export default App;
