export default [
  {
    label: 'Scenariu 1 - Basic',
    events: [
      { value: 1000, focus: false, name: 'Nunta Popescu',  currency: '€',   companyEvent: true,  priceWithCompanySpendings: 890,  ifAvans: true,  pretAvans: 200,  valutaAvans: '€',   avansMembrii: ['Ion', 'Radu'] },
      { value: 500,  focus: false, name: 'Botez Ionescu',  currency: '€',   companyEvent: false, priceWithCompanySpendings: 500,  ifAvans: false, pretAvans: null, valutaAvans: '€',   avansMembrii: [] },
      { value: 3000, focus: false, name: 'Eveniment Lei',  currency: 'lei', companyEvent: false, priceWithCompanySpendings: 3000, ifAvans: false, pretAvans: null, valutaAvans: '€',   avansMembrii: [] },
    ],
    spendings: [
      { value: 200, focus: false, name: 'Flori',   currency: '€' },
      { value: 500, focus: false, name: 'Mancare', currency: 'lei' },
    ]
  },
  {
    label: 'Scenariu 2 - Complex mixt',
    events: [
      { value: 1500, focus: false, name: 'Nunta Ionescu',   currency: '€',   companyEvent: true,  priceWithCompanySpendings: 1335, ifAvans: true,  pretAvans: 300,  valutaAvans: '€',   avansMembrii: ['Catalin', 'Vali', 'Ion'] },
      { value: 800,  focus: false, name: 'Botez Popa',      currency: '€',   companyEvent: false, priceWithCompanySpendings: 800,  ifAvans: true,  pretAvans: 1000, valutaAvans: 'lei', avansMembrii: ['Sarpe', 'Tony'] },
      { value: 2500, focus: false, name: 'Festival Vara',   currency: 'lei', companyEvent: true,  priceWithCompanySpendings: 2225, ifAvans: false, pretAvans: null, valutaAvans: '€',   avansMembrii: [] },
      { value: 600,  focus: false, name: 'Aniversare Club', currency: '€',   companyEvent: false, priceWithCompanySpendings: 600,  ifAvans: false, pretAvans: null, valutaAvans: '€',   avansMembrii: [] },
      { value: 4000, focus: false, name: 'Petrecere Firma', currency: 'lei', companyEvent: false, priceWithCompanySpendings: 4000, ifAvans: true,  pretAvans: 500,  valutaAvans: 'lei', avansMembrii: ['Radu'] },
    ],
    spendings: [
      { value: 350,  focus: false, name: 'Flori & Decoratiuni', currency: '€' },
      { value: 1200, focus: false, name: 'Catering',            currency: 'lei' },
      { value: 150,  focus: false, name: 'Transport',           currency: '€' },
      { value: 800,  focus: false, name: 'Inchiriere sala',     currency: 'lei' },
    ]
  },
  {
    // Sarpe + Tony absenti → partea lor (euro + lei) se redistribuie la cei 4 ramasi
    label: 'Scenariu 3 - 4 membrii (fara Sarpe, Tony)',
    members: { sarpe: false, tony: false },
    events: [
      { value: 1200, focus: false, name: 'Nunta Gheorghe',  currency: '€',   companyEvent: true,  priceWithCompanySpendings: 1068, ifAvans: true,  pretAvans: 400, valutaAvans: '€',   avansMembrii: ['Catalin', 'Ion'] },
      { value: 700,  focus: false, name: 'Petrecere VIP',   currency: '€',   companyEvent: false, priceWithCompanySpendings: 700,  ifAvans: true,  pretAvans: 150, valutaAvans: '€',   avansMembrii: ['Vali'] },
      { value: 5000, focus: false, name: 'Concert Outdoor', currency: 'lei', companyEvent: true,  priceWithCompanySpendings: 4450, ifAvans: false, pretAvans: null, valutaAvans: '€',  avansMembrii: [] },
      { value: 2000, focus: false, name: 'Seara Privata',   currency: 'lei', companyEvent: false, priceWithCompanySpendings: 2000, ifAvans: false, pretAvans: null, valutaAvans: '€',  avansMembrii: [] },
    ],
    spendings: [
      { value: 250,  focus: false, name: 'Logistica',  currency: '€' },
      { value: 300,  focus: false, name: 'Echipament', currency: '€' },
      { value: 1500, focus: false, name: 'Catering',   currency: 'lei' },
    ]
  },
  {
    // Lei cheltuieli (3500) > lei evenimente (2602) → 898 lei se convertesc in euro si se scad
    // Radu + Tony absenti → redistribuire catre 4 membrii
    label: 'Scenariu 4 - Conversie lei→euro + 2 absenti',
    members: { radu: false, tony: false },
    events: [
      { value: 900,  focus: false, name: 'Botez Marinescu',  currency: '€',   companyEvent: true,  priceWithCompanySpendings: 801,  ifAvans: true,  pretAvans: 100, valutaAvans: '€',   avansMembrii: ['Catalin', 'Vali'] },
      { value: 1800, focus: false, name: 'Sala Evenimente',  currency: 'lei', companyEvent: true,  priceWithCompanySpendings: 1602, ifAvans: false, pretAvans: null, valutaAvans: '€',  avansMembrii: [] },
      { value: 400,  focus: false, name: 'Majorat',          currency: '€',   companyEvent: false, priceWithCompanySpendings: 400,  ifAvans: false, pretAvans: null, valutaAvans: '€',  avansMembrii: [] },
      { value: 1000, focus: false, name: 'Festival',         currency: 'lei', companyEvent: false, priceWithCompanySpendings: 1000, ifAvans: true,  pretAvans: 300, valutaAvans: 'lei', avansMembrii: ['Ion'] },
    ],
    spendings: [
      { value: 200,  focus: false, name: 'Sunet & Lumini', currency: '€' },
      { value: 2000, focus: false, name: 'Mancare',        currency: 'lei' },
      { value: 1500, focus: false, name: 'Bauturi',        currency: 'lei' },
    ]
  },
  {
    // Euro cheltuieli (1700) > euro evenimente (1468) → 232€ convertiti in lei si scazuti
    // Tony absent → redistribuire la 5 membrii
    // Rezultat: toata suma in lei (euro epuizat de cheltuieli)
    label: 'Scenariu 5 - Conversie euro→lei + 1 absent',
    members: { tony: false },
    events: [
      { value: 1200, focus: false, name: 'Nunta Florescu', currency: '€',   companyEvent: true,  priceWithCompanySpendings: 1068, ifAvans: true,  pretAvans: 250,  valutaAvans: '€',   avansMembrii: ['Ion', 'Radu'] },
      { value: 400,  focus: false, name: 'Botez Mihai',    currency: '€',   companyEvent: false, priceWithCompanySpendings: 400,  ifAvans: false, pretAvans: null, valutaAvans: '€',   avansMembrii: [] },
      { value: 8000, focus: false, name: 'Festival Vara',  currency: 'lei', companyEvent: false, priceWithCompanySpendings: 8000, ifAvans: true,  pretAvans: 800,  valutaAvans: 'lei', avansMembrii: ['Catalin', 'Vali'] },
    ],
    spendings: [
      { value: 800,  focus: false, name: 'Echipament',           currency: '€' },
      { value: 900,  focus: false, name: 'Transport International', currency: '€' },
      { value: 2000, focus: false, name: 'Catering',             currency: 'lei' },
    ]
  }
]
