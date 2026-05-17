import './SubmitButton.css'

interface SubmitButtonProps {
  onClick: () => void
  isLoading?: boolean
  disabled?: boolean
  text?: string
}

function SubmitButton({
  onClick,
  isLoading = false,
  disabled = false,
  text = 'РЕШИТЬ УРАВНЕНИЕ',
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
