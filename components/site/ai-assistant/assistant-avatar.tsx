import Image from "next/image"
import { cn } from "@/lib/utils"

interface AssistantAvatarProps {
  className?: string
  src?: string
  alt?: string
}

export function AssistantAvatar({
  className = "h-12 w-12",
  src = "/images/cellie-2d-avatar.webp",
  alt = "Cellie Spreadsheet Bot Mascot",
}: AssistantAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center select-none transition-transform duration-300 group-hover:scale-108 group-hover:-translate-y-1",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={160}
        height={160}
        unoptimized
        priority
        className="h-full w-full object-contain drop-shadow-sm select-none pointer-events-none"
      />
    </div>
  )
}
