import { z } from "zod";

export const GreetingResponseSchema = z.object({
  message: z.string(),
});
