interface ButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    variant?: "primary" | "danger" | "secondary";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, variant, disabled, onClick }: ButtonProps) {
    return (
        <button
            className={`button button-${variant ?? "primary"}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}