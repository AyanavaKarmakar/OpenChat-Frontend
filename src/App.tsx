import { useEffect, useState } from "react";
import { GreetingResponseSchema } from "./types/GreetingResponse";

const App = () => {
  const [greeting, setGreeting] = useState("");
  const [loading, isLoading] = useState(true);
  const [error, setError] = useState({ isError: false, message: "" });

  const fetchGreeting = async () => {
    try {
      const response = await fetch("http://localhost:5271");
      const data = GreetingResponseSchema.parse(await response.json());
      setGreeting(data.message);
    } catch (error) {
      setError({
        isError: true,
        message: "Something went wrong. Please try again!",
      });
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    fetchGreeting();

    return () => {
      setGreeting("");
      isLoading(true);
      setError({ isError: false, message: "" });
    };
  }, []);

  return (
    <>
      {!loading && !error.isError && <p>{greeting}</p>}

      {loading && <p>Loading...</p>}

      {error.isError && <p>{error.message}</p>}
    </>
  );
};

export default App;
