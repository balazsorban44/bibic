const objectToArray = o => Object.entries(o)
  .reduce((acc, [key, value]) => ([...acc, {key, ...value}]), [])

export default objectToArray