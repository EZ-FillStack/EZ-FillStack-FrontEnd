// 신청 관련 포함해서 상태를 나타내는 뱃지 컴포넌트입니다.
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium transition-colors",
    {
        variants: {
            variant: { //현재로서는 default success warning만 두었습니다.
                default:
                    "bg-muted text-muted-foreground",
                success:
                    "bg-success text-success-foreground",
                warning:
                    "bg-warning text-warning-foreground",
            },
            size: { //뱃지 사이즈는 임의로 설정. 하면서 수정됩니다.
                default: "px-2 py-0.5 rounded-sm",
                sm: "px-1.5 py-0 text-[10px]",
                lg: "px-2.5 py-1 text-sm rounded-md",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
    return (
        <span
            data-slot="badge"
            data-variant={variant}
            data-size={size}
            className={cn(badgeVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Badge, badgeVariants }