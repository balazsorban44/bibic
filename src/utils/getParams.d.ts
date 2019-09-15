declare function getParams<P extends string[]>(search: string, ...args: P) : {[K in P]: string}

export default getParams