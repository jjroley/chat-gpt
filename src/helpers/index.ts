import type { MessageType } from "@/components/Message"

export const getFormattedMessages = (messages:MessageType[]) => {
  return messages.map(message => ({
    role: message.role,
    content: message.content
  }))
}
