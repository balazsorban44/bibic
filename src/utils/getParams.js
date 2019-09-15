
const snakeToCamelCase = s => s.replace(/([-_]\w)/g, g => g[1].toUpperCase())

const getParams = (search, ...params) => {
  search = new URLSearchParams(search)
  return params.reduce((acc, param) => ({
    ...acc,
    [snakeToCamelCase(param)]: search.get(param)
  }), {})
}

export default getParams