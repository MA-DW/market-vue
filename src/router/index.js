import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import i18next from '@/i18n'
import DefaultLayout from '@/layouts/DefaultLayout'
import { useIndustrialData } from '../views/Home/composables/useIndustrialData'

const routes = [
  {
    path: '/',
    name: () => i18next.t('home'),
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: () => i18next.t('dashboard'),
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: '/Home',
        name: () => i18next.t('AVAILABILITY BUILDINGS'),
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        // Agregamos el provider como layout intermedio para esta sección
        redirect: '/Home/industrial',
        beforeEnter: async (to, from, next) => {
          const { loadData, loading, error } = useIndustrialData()
          
          if (!loading.value && !error.value) {
            try {
              await loadData()
            } catch (error) {
              console.error('Error loading industrial data:', error)
            }
          }
          next()
        },
        children: [
          {
            path: 'industrial',
            name: 'industrial-dashboard',
            component: () => import('@/views/Home/IndustrialDashboard.vue'),
          },
          // Aquí puedes agregar más rutas hijas relacionadas con la sección industrial
          // {
          //   path: 'details/:id',
          //   name: 'industrial-details',
          //   component: () => import('@/views/Home/IndustrialDetails.vue'),
          // }
        ]
      },
      {
        path: '/industrial/details/:id',
        name: 'industrial-details',
        component: () => import('@/views/Home/IndustrialDetails.vue')
      },
      {
        path: '/theme/MARKET OVERVIEW',
        name: 'market-overview',
        component: () => import('@/views/theme/MarketOverview.vue')
      },
      {
        path: '/theme/FIBRAS',
        name: 'fibras',
        component: () => import('@/views/theme/Fibras.vue')
      },
      {
        path: '/theme/SETTINGS',
        name: 'settings',
        component: () => import('@/views/theme/Settings.vue')
      },
      {
        path: '/MARKET REPORTS',
        name: 'market-reports',
        component: () => import('@/views/MarketReports.vue')
      },
      {
        path: '/BI CHARTS',
        name: 'bi-charts',
        component: () => import('@/views/BiCharts.vue')
      }
    ]
  },
  // ... resto de tus rutas fuera del layout principal
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router