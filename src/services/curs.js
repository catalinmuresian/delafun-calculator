// The exchange rate of the app: the official BNR rate (two decimals, cut), fetched through the server
//  - automatically once a day: the first time the app is opened (or comes back on screen) that day,
//  - every time Curs valutar is opened in the settings.
// A rate typed by hand wins for 24 hours, across restarts: BNR is still fetched and shown next to it,
// but only takes over when the 24 hours are up or with "Foloseste cursul BNR".
import { date } from 'quasar'
import { getCurs } from './calcApi'

const BNR_KEY = 'calc_bnr' // { rate, date, fetchedDay }
const MANUAL_KEY = 'calc_curs_manual' // { rate, until }
const MANUAL_HOURS = 24

const today = () => date.formatDate(new Date(), 'YYYY-MM-DD')

function read (key) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') } catch (e) { return null }
}
function write (key, value) {
  try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value)) } catch (e) { /* storage blocked */ }
}

// The hand-typed rate while its 24 hours last, else null (and forgotten).
export function manualOverride () {
  const m = read(MANUAL_KEY)
  if (m?.rate && m.until > Date.now()) return m
  if (m) write(MANUAL_KEY, null)
  return null
}

function apply (store, rate, bnrDate) {
  const manual = manualOverride()
  if (manual) {
    store.commit('moduleExample/SET_BNR_INFO', { rate, date: bnrDate })
    if (store.state.moduleExample.cursEuro !== manual.rate || store.state.moduleExample.cursSource !== 'manual') {
      store.commit('moduleExample/SET_CURS_EURO', manual.rate)
    }
  } else {
    store.commit('moduleExample/SET_CURS_BNR', { rate, date: bnrDate })
  }
}

// Asks the server for the BNR rate now. True when it answered.
export async function loadCurs (store) {
  try {
    const { rate, date: bnrDate } = await getCurs()
    write(BNR_KEY, { rate, date: bnrDate, fetchedDay: today() })
    apply(store, rate, bnrDate)
    return true
  } catch (e) {
    return false // offline or BNR down: the rate in use stays
  }
}

function loadIfNewDay (store) {
  if (read(BNR_KEY)?.fetchedDay !== today()) loadCurs(store)
}

export function startCurs (store) {
  const manual = manualOverride()
  if (manual) store.commit('moduleExample/SET_CURS_EURO', manual.rate)

  const saved = read(BNR_KEY)
  if (saved?.rate) apply(store, saved.rate, saved.date)

  loadIfNewDay(store)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return
    // The 24 hours of a hand-typed rate may have ended while the app stayed open.
    const bnr = read(BNR_KEY)
    if (store.state.moduleExample.cursSource === 'manual' && !manualOverride() && bnr?.rate) apply(store, bnr.rate, bnr.date)
    loadIfNewDay(store)
  })
}

// Curs valutar → Salveaza: this rate for the next 24 hours.
export function setManualCurs (store, rate) {
  write(MANUAL_KEY, { rate, until: Date.now() + MANUAL_HOURS * 3600 * 1000 })
  store.commit('moduleExample/SET_CURS_EURO', rate)
}

// Curs valutar → Foloseste cursul BNR.
export function useBnrCurs (store) {
  write(MANUAL_KEY, null)
  const { bnrRate, bnrDate } = store.state.moduleExample
  if (bnrRate) store.commit('moduleExample/SET_CURS_BNR', { rate: bnrRate, date: bnrDate })
}
