export function SET_CURS_EURO (state, value) {
  state.cursEuro = value
  state.cursSource = 'manual'
}

// The latest BNR rate as published (shown in Curs valutar), without changing the rate in use.
export function SET_BNR_INFO (state, { rate, date }) {
  state.bnrRate = rate
  state.bnrDate = date
}

// Uses the BNR rate with two decimals, cut (not rounded): 5.3442 -> 5.34, 5.3499 -> 5.34.
export function SET_CURS_BNR (state, { rate, date }) {
  state.bnrRate = rate
  state.bnrDate = date
  state.cursEuro = Math.floor(rate * 100 + 1e-9) / 100
  state.cursSource = 'bnr'
}

export function SET_CURS_UPDATED_AT (state, value) {
  state.cursUpdatedAt = value
}
