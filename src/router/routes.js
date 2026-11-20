const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'calculator', component: () => import('pages/IndexPage.vue') },
      { path: 'calendar', name: 'calendar', component: () => import('pages/CalendarPage.vue') },
      { path: 'calcul/:id', name: 'calculation', component: () => import('pages/CalculationPage.vue') },
      { path: 'raport', name: 'report', component: () => import('pages/ReportPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
