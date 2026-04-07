import './SubmitButton.css'

interface SubmitButtonProps {
  onClick: () => void;           // Функция при нажатии
  isLoading?: boolean;           // Состояние загрузки
  disabled?: boolean;            // Блокировка кнопки
  text?: string;                 // Текст на кнопке
}

function SubmitButton({ 
  onClick, 
  isLoading = false, 
  disabled = false,
  text = 'РЕШИТЬ УРАВНЕНИЕ'
}: SubmitButtonProps) {
  return (
    <button 
      className={`submit-button ${isLoading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <span className="spinner"></span>
          <span>ВЫЧИСЛЕНИЕ...</span>
        </>
      ) : (
        <span>{text}</span>
      )}
    </button>
  )
}

export default SubmitButton