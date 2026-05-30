import { cn } from "@/lib/utils"

interface SpinnerProps {
    className?: string
    text?: string
}

export function Spinner({ className, text = "Cargando..." }: SpinnerProps) {
    return (
        <div className="flex items-center gap-2">
            <div
                className={cn(
                    "h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-primary",
                    className
                )}
            />
            <span className="text-sm text-muted-foreground">{text}</span>
        </div>
    )
}