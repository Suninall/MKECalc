import './ResultsPanel.css'

interface NodeResult {
  id: number;           // Номер узла
  x: number;           // Координата x
  y: number;           // Координата y
  value: number;       // Значение функции в узле
}

interface ResultsPanelProps {
  results: NodeResult[] | null;  // Массив результатов или null
  isLoading?: boolean;           // Состояние загрузки
  error?: string | null;         // Ошибка
}

function ResultsPanel({ results, isLoading = false, error = null }: ResultsPanelProps) {
  
  // Состояние загрузки
  if (isLoading) {
    return (
      <div className="results-panel loading">
        <div className="loading-spinner"></div>
        <p>Вычисление...</p>
      </div>
    )
  }
  
  // Ошибка
  if (error) {
    return (
      <div className="results-panel error">
        <div className="error-icon"></div>
        <h3>Ошибка вычисления</h3>
        <p>{error}</p>
      </div>
    )
  }
  
  // Нет результатов
  if (!results || results.length === 0) {
    return (
      <div className="results-panel empty">
        <p>Пока что результатов</p>
      </div>
    )
  }
  
  // Есть результаты
  return (
    <div className="results-panel">
      <div className="results-header">
        <h3>Результаты значений в узлах сетки:</h3>
        <div className="results-stats">
          <span>Всего узлов: {results.length}</span>
        </div>
      </div>
      
      <div className="results-table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th>№ узла</th>
              <th>Координата x</th>
              <th>Координата y</th>
              <th>Значение u(x, y)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((node) => (
              <tr key={node.id}>
                <td className="node-id">{node.id}</td>
                <td className="node-coord">{node.x.toFixed(6)}</td>
                <td className="node-coord">{node.y.toFixed(6)}</td>
                <td className="node-value">{node.value.toFixed(8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResultsPanel