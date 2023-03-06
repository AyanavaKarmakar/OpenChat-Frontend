import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useErrorStore, useLoadingStore } from "../stores";
import { GreetingResponseSchema } from "../types/GreetingResponse";
import { BaseToast } from "./shared/BaseToast";
import { useEffect } from "react";

export const GreetingComponent = () => {
  const loading = useLoadingStore();
  const error = useErrorStore();
  const queryClient = useQueryClient();
  const queryKey = ["greeting"];

  const GetGreeting = useQuery({
    queryKey,

    queryFn: async () => {
      loading.setLoading();

      const response = await fetch("http://localhost:5271");
      const data = await response.json();

      return GreetingResponseSchema.parse(data);
    },

    enabled: false,

    onSuccess: () => {
      error.clearError();
    },

    onError: () => {
      error.setError();
    },

    onSettled: () => {
      loading.unsetLoading();
    },
  });

  // show greeting toast only once on page load
  useEffect(() => {
    queryClient.fetchQuery(queryKey);
  }, []);

  return (
    <>
      {!loading.isLoading && GetGreeting.data && (
        <BaseToast severity="info" message={GetGreeting.data.message} />
      )}
    </>
  );
};
