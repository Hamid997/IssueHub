interface ButtonProps {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "danger" | "ghost"
    size?: "sm" | "md" | "lg"
    disabled?: boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({children, variant, size, disabled, onClick}: ButtonProps) {
    return (
        <button
            className={`btn ${variant} ${size}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}