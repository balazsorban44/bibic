/**
 * Filters an Object by keys
 * @param {*} obj Object to filter
 * @param {Array} filteredKeys the keys that should be preserved
 */
export function filterObject(obj, filteredKeys) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => filteredKeys.includes(key))
  )
}