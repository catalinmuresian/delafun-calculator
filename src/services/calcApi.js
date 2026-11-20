// Client of the calculator's Cockpit endpoints (cockpit/api/calc/*, on the VPS).
// The API key is public on purpose: its role has no permissions, so it only reaches these endpoints,
// which let in nothing but a paired device (HttpOnly cookie set by /pair, never readable here).
// In dev, quasar.config.js proxies /cockpit/api to https://calc.cmdev.ro.

const BASE = '/cockpit/api/calc'
const API_KEY = 'API-calc-37ecf6bf509f8ac310c5eb81805f2972'
// Remembered so a paired phone keeps working offline (the PWA); the server still checks every request.
const PAIRED_FLAG = 'calc_paired'

export class CalcApiError extends Error {
  constructor (status, code) {
    super(code || `HTTP ${status}`)
    this.status = status
    this.code = code
  }
}

async function request (path, { method = 'GET', body, query } = {}) {
  const url = new URL(BASE + path, window.location.origin)
  Object.entries(query || {}).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url, {
    method,
    credentials: 'same-origin',
    cache: 'no-store',
    headers: {
      'api-key': API_KEY,
      ...(body ? { 'Content-Type': 'application/json' } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  })

  let data = null
  try { data = await res.json() } catch (e) { /* empty or non-JSON body */ }

  if (!res.ok) {
    if (res.status === 401) setPairedFlag(false)
    throw new CalcApiError(res.status, data?.error)
  }
  return data
}

export function getPairedFlag () {
  try { return localStorage.getItem(PAIRED_FLAG) === '1' } catch (e) { return false }
}

function setPairedFlag (on) {
  try { on ? localStorage.setItem(PAIRED_FLAG, '1') : localStorage.removeItem(PAIRED_FLAG) } catch (e) { /* storage blocked */ }
}

// 'paired' | 'locked' | 'offline' (no network, but this device was paired before)
export async function checkDevice () {
  try {
    await request('/me')
    setPairedFlag(true)
    return 'paired'
  } catch (e) {
    if (e instanceof CalcApiError) return 'locked'
    return getPairedFlag() ? 'offline' : 'locked'
  }
}

export async function pairDevice (code) {
  const data = await request('/pair', { method: 'POST', body: { code } })
  setPairedFlag(true)
  return data
}

export const listCalculations = month => request('/calculations', { query: { month } })
export const getCalculation = id => request('/calculation', { query: { id } })
export const saveCalculation = calc => request('/calculations', { method: 'POST', body: calc })
export const deleteCalculation = id => request('/delete', { method: 'POST', body: { id } })
export const getReport = (from, to) => request('/report', { query: { ...(from ? { from } : {}), ...(to ? { to } : {}) } })
export const getCurs = () => request('/curs')
