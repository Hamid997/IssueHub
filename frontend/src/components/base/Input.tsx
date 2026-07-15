interface InputProps{
    value: string
    placeholder?: string
    type?: "text" | "email" | "password" | "number"
    name?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ value, onChange, placeholder, type, name }: InputProps){
  return (
    <input 
      type={type} 
      value={value} 
      name={name}
      onChange={onChange} 
      placeholder={placeholder} 
      className="input"
    />
  )
};