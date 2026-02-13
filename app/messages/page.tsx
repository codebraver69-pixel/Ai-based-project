"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Send, ArrowLeft, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ChatBubble } from "@/components/chat-bubble"
import {
  conversations as initialConversations,
  currentUserId,
  getUserById,
  getBookById,
  getMessageTime,
  autoReplies,
  type Conversation,
  type Message,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function MessagesPage() {
  const [convos, setConvos] = useState<Conversation[]>(initialConversations)
  const [selectedConvoId, setSelectedConvoId] = useState<string | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [mobileShowChat, setMobileShowChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const selectedConvo = convos.find((c) => c.id === selectedConvoId)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [selectedConvo?.messages.length, scrollToBottom])

  function getOtherUser(convo: Conversation) {
    const otherId = convo.participants.find((p) => p !== currentUserId)
    return otherId ? getUserById(otherId) : null
  }

  function handleSelectConvo(convoId: string) {
    setSelectedConvoId(convoId)
    setMobileShowChat(true)
    // Mark as read
    setConvos((prev) =>
      prev.map((c) =>
        c.id === convoId ? { ...c, unreadCount: 0 } : c
      )
    )
  }

  function handleSendMessage() {
    if (!messageInput.trim() || !selectedConvoId) return

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      senderId: currentUserId,
      content: messageInput.trim(),
      timestamp: new Date().toISOString(),
      read: true,
    }

    setConvos((prev) =>
      prev.map((c) => {
        if (c.id !== selectedConvoId) return c
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: newMessage.content,
          lastTimestamp: newMessage.timestamp,
        }
      })
    )
    setMessageInput("")

    // Auto-reply after 2 seconds
    setTimeout(() => {
      const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)]
      const replyMessage: Message = {
        id: `m-${Date.now()}-reply`,
        senderId:
          convos
            .find((c) => c.id === selectedConvoId)
            ?.participants.find((p) => p !== currentUserId) || "u2",
        content: reply,
        timestamp: new Date().toISOString(),
        read: true,
      }

      setConvos((prev) =>
        prev.map((c) => {
          if (c.id !== selectedConvoId) return c
          return {
            ...c,
            messages: [...c.messages, replyMessage],
            lastMessage: replyMessage.content,
            lastTimestamp: replyMessage.timestamp,
          }
        })
      )
    }, 2000)
  }

  // Conversation list
  const ConvoList = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/60">
        <h1 className="text-xl font-bold text-foreground">Messages</h1>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {convos.map((convo) => {
            const otherUser = getOtherUser(convo)
            const book = getBookById(convo.bookId)
            if (!otherUser || !book) return null

            return (
              <button
                key={convo.id}
                onClick={() => handleSelectConvo(convo.id)}
                className={cn(
                  "flex items-start gap-3 p-4 text-left hover:bg-muted/50 transition-colors border-b border-border/40",
                  selectedConvoId === convo.id && "bg-muted/70"
                )}
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {otherUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {otherUser.name}
                    </p>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {getMessageTime(convo.lastTimestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {book.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {convo.lastMessage}
                  </p>
                </div>
                {convo.unreadCount > 0 && (
                  <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] shrink-0">
                    {convo.unreadCount}
                  </Badge>
                )}
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )

  // Chat view
  const ChatView = selectedConvo ? (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/60">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0"
          onClick={() => setMobileShowChat(false)}
          aria-label="Back to conversations"
        >
          <ArrowLeft size={18} />
        </Button>
        {(() => {
          const otherUser = getOtherUser(selectedConvo)
          const book = getBookById(selectedConvo.bookId)
          return (
            <>
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {otherUser?.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {otherUser?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Discussing: {book?.title}
                </p>
              </div>
            </>
          )
        })()}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-3">
          {selectedConvo.messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              content={msg.content}
              timestamp={msg.timestamp}
              isSent={msg.senderId === currentUserId}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border/60">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type a message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="bg-muted/50"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!messageInput.trim()}
            aria-label="Send message"
          >
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <MessageSquare size={28} className="text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-foreground mb-1">
        Select a conversation
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Choose a conversation from the left to start chatting with a book
        trader.
      </p>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="rounded-xl border border-border/60 bg-card overflow-hidden" style={{ height: "calc(100vh - 10rem)" }}>
        <div className="flex h-full">
          {/* Conversation list */}
          <div
            className={cn(
              "w-full md:w-80 md:border-r md:border-border/60 shrink-0",
              mobileShowChat ? "hidden md:block" : "block"
            )}
          >
            {ConvoList}
          </div>

          {/* Chat area */}
          <div
            className={cn(
              "flex-1",
              !mobileShowChat ? "hidden md:block" : "block"
            )}
          >
            {ChatView}
          </div>
        </div>
      </div>
    </div>
  )
}
