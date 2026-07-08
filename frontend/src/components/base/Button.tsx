interface ButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    variant?: "primary" | "danger" | "secondary";
    type?: "button" | "submit" | "reset";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, variant, disabled, type, onClick }: ButtonProps) {
    return (
        <button
            type={type ?? "button"}
            className={`button button-${variant ?? "primary"}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}