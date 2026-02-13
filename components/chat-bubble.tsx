import { cn } from "@/lib/utils"
import { getMessageTime } from "@/lib/mock-data"

interface ChatBubbleProps {
  content: string
  timestamp: string
  isSent: boolean
}

export function ChatBubble({ content, timestamp, isSent }: ChatBubbleProps) {
  return (
    <div
      className={cn("flex", isSent ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2.5",
          isSent
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        )}
      >
        <p className="text-sm leading-relaxed">{content}</p>
        <p
          className={cn(
            "text-[10px] mt-1",
            isSent ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {getMessageTime(timestamp)}
        </p>
      </div>
    </div>
  )
}
