import { useQuery } from "@tanstack/react-query";
import { useErrorStore, useLoadingStore } from "../stores";
import { GreetingResponseSchema } from "../types/GreetingResponse";
import { BaseToast } from "./shared/BaseToast";

export const GreetingComponent = () => {
  const loading = useLoadingStore();
  const error = useErrorStore();

  const GetGreeting = useQuery({
    queryKey: ["greeting"],

    queryFn: async () => {
      loading.setLoading();

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
      loading.unsetLoading();
    },
  });

  return (
    <>
      {!loading.isLoading && GetGreeting.data && (
        <BaseToast severity="info" message={GetGreeting.data.message} />
      )}
    </>
  );
};
