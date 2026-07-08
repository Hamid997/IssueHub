interface TextareaProps {
    value: string
    placeholder?: string
    rows?: number
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({ value, onChange, placeholder, rows }: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows ?? 4}
      className="textarea"
    />
  )
};
