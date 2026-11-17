"use client"

import { useState } from "react"
import {
  IconArrowRight,
  IconCheck,
  IconMail,
} from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/api/api-fetch"
import { ApiClientError } from "@/lib/api/error"
import { cn } from "@/lib/utils"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function NewsletterForm({
  source,
  variant = "inline",
}: {
  source: string
  variant?: "inline" | "band"
}) {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = email.trim()
    if (!EMAIL_PATTERN.test(trimmed)) {
      toast.error("Enter a valid email address.")
      return
    }
    setPending(true)
    try {
      await apiFetch("/newsletter/subscribe", {
        method: "POST",
        body: { email: trimmed, source },
      })
      setSubscribed(true)
      toast.success("Welcome aboard! Please check your inbox.")
    } catch (error) {
      if (error instanceof ApiClientError && error.retryAfter) {
        toast.error(`${error.message} — try again in ${error.retryAfter}s`, {
          duration: error.retryAfter * 1000,
        })
      } else {
        toast.error(
          error instanceof ApiClientError
            ? error.message
            : "Could not subscribe. Please try again."
        )
      }
    } finally {
      setPending(false)
    }
  }

  if (subscribed) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-brand/30 bg-brand/10 p-4 text-sm font-semibold text-brand shadow-xs">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">
          <IconCheck className="size-4 stroke-[3]" />
        </div>
        <span>You&apos;re subscribed! Check your inbox for the free 50+ Formula PDF Guide.</span>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={cn(
          "flex flex-col gap-2.5 sm:flex-row",
          variant === "band" ? "max-w-xl" : "max-w-md"
        )}
      >
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
            <IconMail className="size-4" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your work or personal email..."
            aria-label="Email address"
            autoComplete="email"
            required
            className="h-11 sm:h-12 w-full rounded-xl border border-border/80 bg-background pl-10 pr-4 text-sm text-foreground shadow-2xs placeholder:text-muted-foreground transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <Button
          type="submit"
          disabled={pending}
          size="lg"
          className="h-11 sm:h-12 shrink-0 rounded-xl bg-brand px-5 sm:px-6 text-sm font-bold text-brand-foreground shadow-xs transition-all duration-200 hover:bg-brand/90 hover:shadow-sm active:scale-[0.98] cursor-pointer"
        >
          <span>{pending ? "Subscribing..." : "Get Free Guide"}</span>
          <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </form>
  )
}
