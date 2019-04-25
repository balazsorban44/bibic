const today = new Date()
today.setHours(0,0,0,0)
export const TODAY = today

const tomorrow = new Date()
tomorrow.setDate(today.getDate()+1)
tomorrow.setHours(0,0,0,0)
export const TOMORROW = tomorrow

export const NUMBER_OF_ROOMS = 6