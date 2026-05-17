import { useState } from 'react'
import './App.css'
import InputField from './components/InputField/InputField'
import ElementTypeSelector from './components/ElementTypeSelector/ElementTypeSelector'
import SubmitButton from './components/SubmitButton/SubmitButton'
import ResultsPanel from './components/ResultsPanel/ResultsPanel'

interface NodeResult {
  id: number;
  x: number;
  y: number;
  value: number;
}

function App() {
  const [functionF, setFunctionF] = useState<string|null>(null);
  const [ug, setUg] = useState<string|null>(null);

  const [xMin, setXMin] = useState<string|null>(null);
  const [yMin, setYMin] = useState<string|null>(null);
  const [xMax, setXMax] = useState<string|null>(null);
  const [yMax, setYMax] = useState<string|null>(null);

  const [xSteps, setXSteps] = useState<string|null>(null);
  const [ySteps, setYSteps] = useState<string|null>(null);

  const [results, setResults] = useState<NodeResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [elementType, setElementType] = useState<'triangles' | 'rectangles'>('triangles')

  const handleSolve = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // вызов бэка
      console.log('Решение уравнения...')
      
      // Имитация задержки
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      //рандомные значения
      const mockResults: NodeResult[] = []
      for (let i = 0; i < 20; i++) {
        mockResults.push({
          id: i,
          x: i * 0.1,
          y: i * 0.05,
          value: Math.sin(i * 0.3) * Math.exp(-i * 0.05)
        })
      }
      
      setResults(mockResults)
      
    } catch (err) {
      setError('Произошла ошибка при вычислении. Проверьте введенные данные.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

   return (
  <>
      <header className='pageHeader'>
        <nav>
        <ul>
          <li ><a className='headerLink' href="#">ГЛАВНАЯ</a></li>
          <li ><a className='headerLink' href="#">О ПРОГРАММЕ</a></li>
        </ul>
      </nav>
      </header>

    <div className='pageContainer'>
      <h1 className='pageTitle'>Калькулятор для двумерных эллиптических краевых задач в декартовой системе координат</h1>
      
      <main className='inputSection'>
        <article className='inputs'>
          <h2 className='inputTitle'>Ввод параметров задачи:</h2>
          <p className='inputBlockText'>Введите функцию f(x,y), краевые условия и параметры сетки. Все обязательные поля выделены <b>жирным</b></p>
          <div className='selectorType'>
              <ElementTypeSelector 
              selectedType={elementType}
              onChange={setElementType}
              />
            </div>
          <div className='equationInfo'>
            <div className="inputs-grid">
            <div className="inputs-column">
              <InputField
                id="function-f"
                label="Функция f(x, y)"
                value={functionF}
                onChange={setFunctionF}
                placeholder="x * x + y * y"
                required
              />
              
              <InputField
                id="ug"
                label="Первое краевое условие ug(x, y)"
                value={ug}
                onChange={setUg}
                placeholder="x + y"
                required
              />

              <InputField
                id="x-min"
                label="Минимальная координата по х"
                value={xMin}
                onChange={setXMin}
                placeholder="0"
              />
              <InputField
                id="y-min"
                label="Минимальная координата по y"
                value={yMin}
                onChange={setYMin}
                placeholder="0"
              />
                          
              
            </div>   
          </div>
          <div className='seconInfoBlock'>
            <div className='chooseElementBlock'>
              <InputField
                id="x-max"
                label="Максимальная координата по х"
                value={xMax}
                onChange={setXMax}
                placeholder="0"
              />

              <InputField
                id="y-max"
                label="Максимальная координата по y"
                value={yMax}
                onChange={setYMax}
                placeholder="0"
              />
        
              <InputField
                id="x-steps"
                label="Количесвто отрезков по х"
                value={xSteps}
                onChange={setXSteps}
                placeholder="1"
              />
              <InputField
                id="y-steps"
                label="Количесвто отрезков по y"
                value={ySteps}
                onChange={setYSteps}
                placeholder="1"
              />

          </div>
          </div>   
          </div>    

        </article>

        <aside>
          <div className='button-section'>
            <SubmitButton 
            onClick={handleSolve}
            isLoading={isLoading}
            disabled={false}
            text="РЕШИТЬ УРАВНЕНИЕ"
          />
          </div>
          
      </aside>

      <div className='resuly-section'>
        <ResultsPanel 
            results={results}
            isLoading={isLoading}
            error={error}
          />
      </div>

      </main>
    </div>   

    <footer>
        <p>&copy; 2026 MKE Calculator</p>
    </footer>
  </>
);
}

export default App
