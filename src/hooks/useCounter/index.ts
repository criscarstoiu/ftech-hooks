import { useCallback, useState } from 'react'
import { validateInitialValue } from '../../utils/validateInitialValue'
import { limitValue } from '../../utils/limitValue'

export type IUseCounter = {
  count: number
  increment: () => void
  reset: () => void
  decrement: () => void
  set(value: number): void
}

const DEFAULT_OPTIONS = {
  min: -Infinity,
  max: Infinity,
}

export type IUseOptions = {
  max?: number
  min?: number
}

/**
 * Counter example
 *
 * @param    {number} initialValue
 *           initial counter value
 *
 * @param    {number} options
 *           initial counter options
 *
 * @return   {Object}
 *           object with count and methods
 *
 * @property {number} count
 *           The current count state
 *
 * @property {()=>void} increment
 *           the increment function
 *
 * @property {()=>void} decrement
 *           the decrement function
 *
 * @property {()=>void} reset
 *           the reset function
 *
 * @property {(value:number)=>void} set
 *           the set function
 *
 * @example
 *   const ExampleComponent = () => {
 *     const { count, increment, reset, decrement, set } = useCounter();
 *
 *     return (
 *       <>
 *         <button onClick={increment}>Increment counter</button>
 *         <button onClick={reset}>Reset counter</button>
 *         <button onClick={decrement}>Decrement counter</button>
 *         <button onClick={() => set(5)}>Set 5</button>
 *         <p>{count}</p>
 *       </>
 *      )
 *    }
 */

export const useCounter = (initialValue: number, options?: IUseOptions): IUseCounter => {
  const { min, max } = { ...DEFAULT_OPTIONS, ...options }
  const validatedInitialValue = validateInitialValue(initialValue)
  const [count, setCount] = useState<number>(limitValue(validatedInitialValue, min, max))

  const increment = useCallback(
    () => setCount(current => limitValue(current + 1, min, max)),
    [min, max]
  )
  const decrement = useCallback(
    () => setCount(current => limitValue(current - 1, min, max)),
    [min, max]
  )
  const reset = useCallback(
    () => setCount(limitValue(initialValue, min, max)),
    [initialValue, min, max]
  )
  console.log()
  const set = useCallback((value: number) => setCount(limitValue(value, min, max)), [min, max])
  return { count, increment, decrement, reset, set }
}
