import { DateTime } from 'luxon'

export const YEAR_DIFFERENCE = 2561 - 2018
const NOW = DateTime.local()
const { year } = NOW
export { year as i10l }

export const thai = YEAR_DIFFERENCE + year
