import { z } from "zod";

export const RegisterUserResponseSchema = z.union([
  // on successfull registration, the server returns the username and token
  z.object({
    username: z.string(),
    token: z.string(),
  }),
  // if the username already exists, the server returns an error message
  z.object({
    message: z.string(),
  }),
]);