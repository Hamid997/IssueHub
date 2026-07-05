interface InputProps{
    value: string
    placeholder?: string
    type?: "text" | "email" | "password" | "number"
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ value, onChange, placeholder, type }: InputProps){
  return (
    <input 
      type={type} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className="custom-input-styles"
    />
  )
};