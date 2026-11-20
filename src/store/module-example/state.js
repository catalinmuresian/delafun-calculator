export default function () {
  return {
    cursEuro: 5.2,
    // Where cursEuro comes from: 'bnr' (the official rate, one decimal) or 'manual' (set in Curs valutar).
    cursSource: 'default',
    // The BNR rate as published and its date, shown in Curs valutar.
    bnrRate: null,
    bnrDate: null
  }
}
