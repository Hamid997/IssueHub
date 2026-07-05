interface SelectProps {
    children: React.ReactNode
    value?: string
    disabled?: boolean
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}


export default function Select({children, value, disabled, onChange}: SelectProps) {
    return (
        <select
            value={value}
            disabled={disabled}
            onChange={onChange}
        >
            {children}
        </select>
    )
}