interface badgeProps{
    children: string
    variant?: "open" | "closed" | "in-progress" | "high" | "medium" | "low"
}


export default function Badge({children, variant}:badgeProps){
    return (
        <span className={`badge ${variant}`}>
            {children}
        </span>
    )
}