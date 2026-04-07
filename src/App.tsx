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
  const [functionF, setFunctionF] = useState('return x + y;')
  const [ug, setUg] = useState('return x;')
  const [betta, setBetta] = useState('return 1;')
  const [tetta, setTetta] = useState('return 0;')
  const [uBetta, setUBetta] = useState('return x;')

  const [xMin, setXMin] = useState('return 0;')
  const [yMin, setYMin] = useState('return 0;')
  const [xMax, setXMax] = useState('return 0;')
  const [yMax, setYMax] = useState('return 0;')

  const [xSteps, setXSteps] = useState('return 1;')
  const [ySteps, setYSteps] = useState('return 1;')

  const [results, setResults] = useState<NodeResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [elementType, setElementType] = useState<'triangles' | 'rectangles'>('triangles')

  const handleSolve = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Здесь будет вызов вашего C++ солвера
      console.log('Решение уравнения...')
      
      // Имитация задержки
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // ВРЕМЕННЫЕ ТЕСТОВЫЕ ДАННЫЕ (потом замените на реальные)
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
        <article>
          <h2 className='inputTitle'>Ввод параметров задачи:</h2>
          <p className='inputBlockText'>Введите функцию f(x,y), краевые условия и параметры сетки. Все обязательные поля выделены <b>жирным</b></p>
          <div className='equationInfo'>
            <div className="inputs-grid">
            <div className="inputs-column">
              <InputField
                id="function-f"
                label="Функция f(x, y)"
                value={functionF}
                onChange={setFunctionF}
                placeholder="Пример: return x * x + y * y;"
                required
              />
              
              <InputField
                id="ug"
                label="Первое краевое условие ug(x, y)"
                value={ug}
                onChange={setUg}
                placeholder="Пример: return x + y;"
                required
              />
              
              <InputField
                id="betta"
                label="Коэффициент теплоотдачи Betta(x, y)"
                value={betta}
                onChange={setBetta}
                placeholder="Пример: return 1;"
              />
            </div>
            
            <div className="inputs-column">
              <InputField
                id="tetta"
                label="Второе краевое условие Teta(x, y)"
                value={tetta}
                onChange={setTetta}
                placeholder="Пример: return 1/9;"
              />
              
              <InputField
                id="u-betta"
                label="Третье краевое условие u_betta(x, y)"
                value={uBetta}
                onChange={setUBetta}
                placeholder="Пример: return x;"
              />
            </div>
          </div>
          <div className='seconInfoBlock'>
            <div className='chooseElementBlock'>
            <ElementTypeSelector 
            selectedType={elementType}
            onChange={setElementType}
            />

            <InputField
                id="x-min"
                label="Минимальная координата по х"
                value={xMin}
                onChange={setXMin}
                placeholder="Пример: return 0;"
              />
              <InputField
                id="y-min"
                label="Минимальная координата по y"
                value={yMin}
                onChange={setYMin}
                placeholder="Пример: return 0;"
              />
              <InputField
                id="x-max"
                label="Максимальная координата по х"
                value={xMax}
                onChange={setXMax}
                placeholder="Пример: return 0;"
              />
              <InputField
                id="y-max"
                label="Максимальная координата по y"
                value={yMax}
                onChange={setYMax}
                placeholder="Пример: return 0;"
              />
              <InputField
                id="x-steps"
                label="Количесвто отрезков по х"
                value={xSteps}
                onChange={setXSteps}
                placeholder="Пример: return 1;"
              />
              <InputField
                id="y-steps"
                label="Количесвто отрезков по y"
                value={ySteps}
                onChange={setYSteps}
                placeholder="Пример: return 1;"
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
