const flatten = data => ({id: data.id, ...data.data()})

export default flatten