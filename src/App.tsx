import { useState } from 'react'
import './App.css'
import InputField from './components/InputField/InputField'
import ElementTypeSelector from './components/ElementTypeSelector/ElementTypeSelector'
import SubmitButton from './components/SubmitButton/SubmitButton'
import ResultsPanel from './components/ResultsPanel/ResultsPanel'
import { calculate } from './services/calculationApi'
import type { CalculationRequest, ElementType, NodeResult } from './types/calculation'

const parseRequiredNumber = (value: string | null, fieldName: string) => {
  const normalizedValue = value?.trim().replace(',', '.')
  const parsedValue = Number(normalizedValue)

  if (!normalizedValue || Number.isNaN(parsedValue)) {
    throw new Error(`${fieldName}: введите число`)
  }

  return parsedValue
}

const parseRequiredInteger = (value: string | null, fieldName: string) => {
  const parsedValue = parseRequiredNumber(value, fieldName)

  if (!Number.isInteger(parsedValue)) {
    throw new Error(`${fieldName}: введите целое число`)
  }

  return parsedValue
}

function App() {
  const [functionF, setFunctionF] = useState<string | null>(null)
  const [ug, setUg] = useState<string | null>(null)

  const [xMin, setXMin] = useState<string | null>(null)
  const [yMin, setYMin] = useState<string | null>(null)
  const [xMax, setXMax] = useState<string | null>(null)
  const [yMax, setYMax] = useState<string | null>(null)

  const [xSteps, setXSteps] = useState<string | null>(null)
  const [ySteps, setYSteps] = useState<string | null>(null)

  const [results, setResults] = useState<NodeResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [elementType, setElementType] = useState<ElementType>('triangles')

  const buildCalculationRequest = (): CalculationRequest => {
    const trimmedFunction = functionF?.trim()
    const trimmedUg = ug?.trim()

    if (!trimmedFunction) {
      throw new Error('Введите функцию f(x, y)')
    }

    if (!trimmedUg) {
      throw new Error('Введите первое краевое условие ug(x, y)')
    }

    const request: CalculationRequest = {
      function: trimmedFunction,
      ug: trimmedUg,
      elemType: elementType === 'triangles' ? 0 : 1,
      xMin: parseRequiredNumber(xMin, 'Минимальная координата X'),
      yMin: parseRequiredNumber(yMin, 'Минимальная координата Y'),
      xMax: parseRequiredNumber(xMax, 'Максимальная координата X'),
      yMax: parseRequiredNumber(yMax, 'Максимальная координата Y'),
      nx: parseRequiredInteger(xSteps, 'Количество отрезков по X'),
      ny: parseRequiredInteger(ySteps, 'Количество отрезков по Y'),
    }

    if (request.xMax <= request.xMin) {
      throw new Error('Максимальная координата X должна быть больше минимальной')
    }

    if (request.yMax <= request.yMin) {
      throw new Error('Максимальная координата Y должна быть больше минимальной')
    }

    if (request.nx <= 0 || request.ny <= 0) {
      throw new Error('Количество отрезков по X и Y должно быть больше 0')
    }

    return request
  }

  const handleSolve = async () => {
    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const request = buildCalculationRequest()
      const calculationResults = await calculate(request)

      setResults(calculationResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при вычислении')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <header className="pageHeader">
        <nav>
          <ul>
            <li>
              <a className="headerLink" href="#">
                ГЛАВНАЯ
              </a>
            </li>
            <li>
              <a className="headerLink" href="#">
                О ПРОГРАММЕ
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="pageContainer">
        <h1 className="pageTitle">
          Калькулятор для двумерных эллиптических краевых задач в декартовой системе координат
        </h1>

        <main className="inputSection">
          <article className="inputs">
            <h2 className="inputTitle">Ввод параметров задачи:</h2>
            <p className="inputBlockText">
              Введите функцию f(x,y), краевые условия и параметры сетки. Все обязательные поля выделены{' '}
              <b>жирным</b>
            </p>

            <div className="selectorType">
              <ElementTypeSelector selectedType={elementType} onChange={setElementType} />
            </div>

            <div className="equationInfo">
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
                    label="Минимальная координата по x"
                    value={xMin}
                    onChange={setXMin}
                    placeholder="0"
                    required
                  />

                  <InputField
                    id="y-min"
                    label="Минимальная координата по y"
                    value={yMin}
                    onChange={setYMin}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="seconInfoBlock">
                <div className="chooseElementBlock">
                  <InputField
                    id="x-max"
                    label="Максимальная координата по x"
                    value={xMax}
                    onChange={setXMax}
                    placeholder="1"
                    required
                  />

                  <InputField
                    id="y-max"
                    label="Максимальная координата по y"
                    value={yMax}
                    onChange={setYMax}
                    placeholder="1"
                    required
                  />

                  <InputField
                    id="x-steps"
                    label="Количество отрезков по x"
                    value={xSteps}
                    onChange={setXSteps}
                    placeholder="10"
                    required
                  />

                  <InputField
                    id="y-steps"
                    label="Количество отрезков по y"
                    value={ySteps}
                    onChange={setYSteps}
                    placeholder="10"
                    required
                  />
                </div>
              </div>
            </div>
          </article>

          <aside>
            <div className="button-section">
              <SubmitButton
                onClick={handleSolve}
                isLoading={isLoading}
                disabled={isLoading}
                text="РЕШИТЬ УРАВНЕНИЕ"
              />
            </div>
          </aside>

          <div className="result-section">
            <ResultsPanel results={results} isLoading={isLoading} error={error} />
          </div>
        </main>
      </div>

      <footer>
        <p>&copy; 2026 MKE Calculator</p>
      </footer>
    </>
  )
}

export default App
