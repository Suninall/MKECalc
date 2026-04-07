import './InputField.css'

interface InputFieldProps {
  id: string;          
  label: string;       
  value: string;       
  onChange: (value: string) => void;     
  placeholder?: string; 
  required?: boolean;   
}

function InputField({ 
  id, 
  label, 
  value, 
  onChange, 
  placeholder = '', 
  required = false 
}: InputFieldProps) {
  return (
    <div className="input-field">
      <label htmlFor={id} className={`input-label ${required ? 'required' : ''}`}>
        {label}
      </label>
      
      <input
        id={id}
        className="input-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default InputField