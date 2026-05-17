import type { CalculationRequest, NodeResult } from '../types/calculation'

const CALCULATION_API_URL = 'http://localhost:5057/api/calculation'

type CalculationResponse =
  | NodeResult[]
  | {
      results?: NodeResult[]
      data?: NodeResult[]
      nodes?: Array<{
        index: number
        x: number
        y: number
      }>
      x0?: number[]
    }

export async function calculate(input: CalculationRequest): Promise<NodeResult[]> {
  const response = await fetch(CALCULATION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Calculation request failed: ${response.status}`)
  }

  const data = (await response.json()) as CalculationResponse

  if (Array.isArray(data)) {
    return data
  }

  if (data.results) {
    return data.results
  }

  if (data.data) {
    return data.data
  }

  if (data.nodes && data.x0) {
    return data.nodes.map((node, index) => ({
      id: node.index,
      x: node.x,
      y: node.y,
      value: data.x0?.[index] ?? 0,
    }))
  }

  return []
}
