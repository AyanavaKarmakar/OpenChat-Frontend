import { z } from "zod";

export const MessagesResponseSchema = z.array(
  z.object({
    id: z.number(),
    messageContent: z.string(),
    sender: z.string(),
    timestamp: z.string(),
  })
);

export type TMessagesResponse = z.infer<typeof MessagesResponseSchema>;

export const MessageDeleteResponseSchema = z.object({
  message: z.string(),
});

const MessageSchema = z.object({
  id: z.number(),
  sender: z.string(),
  messageContent: z.string(),
  timestamp: z.string(),
});

export type TMessage = z.infer<typeof MessageSchema>;
