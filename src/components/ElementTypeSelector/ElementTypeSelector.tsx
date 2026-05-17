import type { ElementType } from '../../types/calculation'
import './ElementTypeSelector.css'

interface ElementTypeSelectorProps {
  selectedType: ElementType
  onChange: (type: ElementType) => void
}

function ElementTypeSelector({ selectedType, onChange }: ElementTypeSelectorProps) {
  return (
    <div className="element-type-selector">
      <label className="selector-label">Тип конечных элементов:</label>

      <div className="radio-group">
        <label className={`radio-option ${selectedType === 'triangles' ? 'active' : ''}`}>
          <input
            type="radio"
            name="elementType"
            value="triangles"
            checked={selectedType === 'triangles'}
            onChange={() => onChange('triangles')}
          />
          <span className="radio-custom"></span>
          <span className="radio-text">Треугольники</span>
        </label>

        <label className={`radio-option ${selectedType === 'rectangles' ? 'active' : ''}`}>
          <input
            type="radio"
            name="elementType"
            value="rectangles"
            checked={selectedType === 'rectangles'}
            onChange={() => onChange('rectangles')}
          />
          <span className="radio-custom"></span>
          <span className="radio-text">Прямоугольники</span>
        </label>
      </div>
    </div>
  )
}

export default ElementTypeSelector
