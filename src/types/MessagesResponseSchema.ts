import { z } from "zod";

export const MessagesResponseSchema = z.array(
  z.object({
    id: z.number(),
    messageContent: z.string(),
    sender: z.string(),
    timestamp: z.string(),
  })
);

export const MessageDeleteResponseSchema = z.object({
  message: z.string(),
});
