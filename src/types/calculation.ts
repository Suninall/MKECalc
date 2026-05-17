export type ElementType = 'triangles' | 'rectangles'

export interface CalculationRequest {
  function: string
  ug: string
  elemType: number
  xMin: number
  yMin: number
  xMax: number
  yMax: number
  nx: number
  ny: number
}

export interface NodeResult {
  id: number
  x: number
  y: number
  value: number
}
