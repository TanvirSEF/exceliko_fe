"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  IconArticle,
  IconArrowUp,
  IconCalculator,
  IconChevronRight,
  IconRefresh,
  IconThumbDown,
  IconThumbUp,
  IconX,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { API_BASE_PATH, config } from "@/lib/config"
import { cn } from "@/lib/utils"
import { MessageRenderer } from "./message-renderer"

interface RecommendedArticle {
  title: string
  url: string
  excerpt?: string
}

interface RecommendedCalculator {
  name: string
  url: string
  hub: string
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  queryId?: string
  rating?: "up" | "down"
  articles?: RecommendedArticle[]
  calculators?: RecommendedCalculator[]
}

const QUICK_PROMPTS = [
  "How to use XLOOKUP with multiple criteria?",
  "How do I fix a #N/A formula error?",
  "Calculate Retail Profit Margin & Markup",
  "Compare two columns and find duplicates",
]

function generateMessageId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}

export function ChatWidget() {
  const STORAGE_KEY = "exceliko_cellie_chat_v1"
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const streamAccumulatorRef = useRef("")
  const sendMessageRef = useRef<((text?: string) => Promise<void>) | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Load persisted chat on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTimeout(() => {
            setMessages(parsed)
          }, 0)
        }
      }
    } catch {}
  }, [])

  // Auto-save messages to localStorage (capped at 20)
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)))
      } catch {}
    }
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, messages, isGenerating])

  useEffect(() => {
    const handleOpenEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ query?: string }>
      const query = customEvent.detail?.query?.trim()
      setIsOpen(true)
      if (query) {
        void sendMessageRef.current?.(query)
      }
    }

    window.addEventListener("exceliko:open-ai", handleOpenEvent)
    return () => window.removeEventListener("exceliko:open-ai", handleOpenEvent)
  }, [])

  const handleFeedback = async (messageId: string, rating: "up" | "down") => {
    const target = messages.find((m) => m.id === messageId)
    if (!target || target.rating === rating) return

    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, rating } : m))
    )

    if (target.queryId) {
      try {
        await fetch(`${config.publicApiUrl}${API_BASE_PATH}/assistant/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query_id: target.queryId,
            rating,
          }),
        })
      } catch {}
    }
  }

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? input).trim()
    if (!text || isGenerating) return

    const userMessage: ChatMessage = {
      id: generateMessageId("user"),
      role: "user",
      content: text,
    }

    const assistantMessageId = generateMessageId("assistant")
    const placeholderAssistant: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
    }

    streamAccumulatorRef.current = ""
    setMessages((prev) => [...prev, userMessage, placeholderAssistant])
    setInput("")
    setIsGenerating(true)

    const payloadMessages = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const endpoint = `${config.publicApiUrl}${API_BASE_PATH}/assistant/chat`
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      })

      if (!response.ok || !response.body) {
        throw new Error("Assistant response failed")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let metaArticles: RecommendedArticle[] = []
      let metaCalculators: RecommendedCalculator[] = []
      let receivedQueryId: string | undefined = undefined

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonStr = line.slice(6).trim()
            if (!jsonStr) continue
            try {
              const data = JSON.parse(jsonStr)

              if (data.type === "token" && data.text) {
                streamAccumulatorRef.current += data.text
                const currentText = streamAccumulatorRef.current
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessageId
                      ? { ...m, content: currentText }
                      : m
                  )
                )
              } else if (data.type === "done") {
                if (data.articles) metaArticles = data.articles
                if (data.calculators) metaCalculators = data.calculators
                if (data.query_id) receivedQueryId = data.query_id
              } else if (data.error) {
                streamAccumulatorRef.current = data.error
                const errText = streamAccumulatorRef.current
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMessageId
                      ? { ...m, content: errText }
                      : m
                  )
                )
              }
            } catch {
              // Ignore partial JSON parse chunks
            }
          }
        }
      }

      const finalContent = streamAccumulatorRef.current
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                content: finalContent,
                queryId: receivedQueryId,
                articles: metaArticles.length > 0 ? metaArticles : undefined,
                calculators:
                  metaCalculators.length > 0 ? metaCalculators : undefined,
              }
            : m
        )
      )
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessageId
            ? {
                ...m,
                content:
                  "Could not connect to the assistant. Please check your internet connection and try again.",
              }
            : m
        )
      )
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    sendMessageRef.current = handleSendMessage
  })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClearChat = () => {
    setMessages([])
    setInput("")
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }

  return (
    <div className="fixed bottom-5 right-5 z-[2147483647] flex flex-col items-end pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-end">
        {/* Active Excel Formula Cell Trigger */}
        {!isOpen ? (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open Exceliko AI"
            className="group relative flex items-center gap-2.5 rounded-sm border border-brand bg-card px-3 py-2 text-left shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-inset ring-brand/20 transition-colors duration-150 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer select-none"
          >
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-sm border border-brand/30 bg-brand/10 font-mono text-xs font-semibold text-brand">
              fx
            </span>

            <div className="flex flex-col pr-1">
              <span className="text-xs font-semibold leading-tight text-foreground">
                Exceliko AI
              </span>
              <span className="hidden text-xs leading-tight text-muted-foreground sm:block">
                Debug errors &amp; build formulas
              </span>
            </div>

            {/* Excel Active-Cell Fill Handle */}
            <span
              aria-hidden
              className="absolute -bottom-[3.5px] -right-[3.5px] size-[7px] border border-background bg-brand"
            />
          </button>
        ) : null}

        {/* Chat Window Panel */}
        {isOpen ? (
          <div className="flex h-[520px] max-h-[calc(100vh-100px)] w-[410px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_16px_40px_rgba(0,0,0,0.16)] animate-in fade-in-50 zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-brand/30 bg-brand/10 font-mono text-xs font-semibold text-brand">
                  fx
                </span>
                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold leading-tight text-foreground">
                    Exceliko AI
                  </h3>
                  <span className="text-xs leading-tight text-muted-foreground">
                    Spreadsheet &amp; formula assistant
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 ? (
                  <button
                    type="button"
                    onClick={handleClearChat}
                    title="Clear conversation"
                    className="rounded-lg p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground cursor-pointer"
                  >
                    <IconRefresh className="size-4 stroke-[1.5]" />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  <IconX className="size-4 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4 [scrollbar-width:thin]">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 px-2 py-4 text-center">
                  <span className="inline-flex size-11 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 font-mono text-base font-semibold text-brand">
                    fx
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-foreground">
                      Ask Exceliko AI
                    </h4>
                    <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
                      Ask how to build any formula, troubleshoot errors like #N/A or #VALUE!, or explore Excel tutorials.
                    </p>
                  </div>

                  <div className="w-full space-y-2 pt-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Suggested prompts
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {QUICK_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSendMessage(prompt)}
                          className="rounded-lg border border-border bg-background px-3 py-2 text-left text-xs font-medium text-foreground transition-colors duration-150 hover:border-brand/40 hover:bg-muted/50 cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex flex-col",
                    m.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed sm:text-sm",
                      m.role === "user"
                        ? "rounded-br-xs bg-primary font-medium text-primary-foreground"
                        : "rounded-bl-xs border border-border bg-muted/40 text-foreground"
                    )}
                  >
                    {m.role === "user" ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <>
                        {m.content ? (
                          <MessageRenderer content={m.content} />
                        ) : (
                          <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                            <span className="size-1.5 rounded-full bg-brand/70 animate-bounce" />
                            <span className="size-1.5 rounded-full bg-brand/70 animate-bounce [animation-delay:0.2s]" />
                            <span className="size-1.5 rounded-full bg-brand/70 animate-bounce [animation-delay:0.4s]" />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Recommended Articles & Calculators Cards */}
                  {m.articles && m.articles.length > 0 ? (
                    <div className="mt-2.5 w-full max-w-[90%] space-y-1.5">
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <IconArticle className="size-3.5 stroke-[1.5] text-brand" />
                        <span>Recommended tutorials</span>
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {m.articles.map((art) => (
                          <Link
                            key={art.url}
                            href={art.url}
                            prefetch={false}
                            className="group flex items-center justify-between rounded-lg border border-border bg-background p-2 text-xs transition-colors duration-150 hover:border-brand/40 hover:bg-muted/40"
                          >
                            <span className="truncate pr-2 font-medium text-foreground transition-colors duration-150 group-hover:text-brand">
                              {art.title}
                            </span>
                            <IconChevronRight className="size-3.5 shrink-0 stroke-[1.5] text-muted-foreground transition-colors duration-150 group-hover:text-brand" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {m.calculators && m.calculators.length > 0 ? (
                    <div className="mt-2 w-full max-w-[90%] space-y-1.5">
                      <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <IconCalculator className="size-3.5 stroke-[1.5] text-brand" />
                        <span>Related calculators</span>
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {m.calculators.map((calc) => (
                          <Link
                            key={calc.url}
                            href={calc.url}
                            prefetch={false}
                            className="group flex items-center justify-between rounded-lg border border-brand/25 bg-brand/5 p-2 text-xs transition-colors duration-150 hover:border-brand/50"
                          >
                            <span className="truncate pr-2 font-medium text-foreground transition-colors duration-150 group-hover:text-brand">
                              {calc.name} ({calc.hub})
                            </span>
                            <IconChevronRight className="size-3.5 shrink-0 stroke-[1.5] text-muted-foreground transition-colors duration-150 group-hover:text-brand" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Feedback Toolbar for Assistant Messages */}
                  {m.role === "assistant" && m.content && !isGenerating ? (
                    <div className="mt-1.5 flex items-center gap-1.5 px-1 text-xs text-muted-foreground select-none">
                      <span className="text-muted-foreground/80">Helpful?</span>
                      <button
                        type="button"
                        onClick={() => handleFeedback(m.id, "up")}
                        title="Helpful"
                        className={cn(
                          "flex size-6 items-center justify-center rounded-md transition-colors duration-150 hover:bg-muted cursor-pointer",
                          m.rating === "up"
                            ? "bg-brand/15 font-medium text-brand"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <IconThumbUp className="size-3.5 stroke-[1.5]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFeedback(m.id, "down")}
                        title="Not helpful"
                        className={cn(
                          "flex size-6 items-center justify-center rounded-md transition-colors duration-150 hover:bg-muted cursor-pointer",
                          m.rating === "down"
                            ? "bg-rose-500/15 font-medium text-rose-600 dark:text-rose-400"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <IconThumbDown className="size-3.5 stroke-[1.5]" />
                      </button>
                      {m.rating ? (
                        <span className="text-xs text-brand animate-in fade-in duration-150">
                          Thanks
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-muted/20 p-3">
              <div className="flex items-center gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about a formula, error, or workbook"
                  rows={1}
                  disabled={isGenerating}
                  className="max-h-24 flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand disabled:opacity-50 sm:text-sm"
                />
                <Button
                  type="button"
                  size="icon"
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isGenerating}
                  className="size-9 shrink-0 rounded-lg cursor-pointer"
                  aria-label="Send message"
                >
                  <IconArrowUp className="size-4 stroke-[1.5]" />
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
