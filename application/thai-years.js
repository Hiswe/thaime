import { DateTime } from 'luxon'

export const YEAR_DIFFERENCE = 2561 - 2018
const NOW = DateTime.local()
const { year } = NOW
export { year as i10l }

export const thai = YEAR_DIFFERENCE + year

export const toThaiYear = i10lYear => i10lYear + YEAR_DIFFERENCE
export const toI10lYear = thaiYear => thaiYear - YEAR_DIFFERENCE
export const toAge = i10lYear => year - i10lYear
export const fromAge = age => year - age
