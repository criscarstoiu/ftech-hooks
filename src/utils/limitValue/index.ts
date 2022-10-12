/**
 * The limitValue function returns
 * - input number
 *
 * @param {number} initialValue
 *         initial counter value
 *
 * @param {number} min
 *         min counter value
 *
 * @param {number} max
 *         max counter value
 *
 * @return {number}
 *         input number
 *
 * @example
 *        const limitValue = limitValue(value, min, max);
 */

export function limitValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
