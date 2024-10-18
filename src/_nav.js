import i18next from '@/i18n';

export default [
  {
    component: 'CNavItem',
    name: () => i18next.t('dashboard'),
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  // {
  //   component: 'CNavTitle',
  //   name: () => i18next.t('theme'),
  // },
  {
    component: 'CNavItem',
    name: () => i18next.t('HOME'),
    to: '/HOME',
    icon: 'cilHome',
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('MARKET REPORTS'),
    to: '/MARKET REPORTS',
    icon: 'cilClipboard',
  },
  {
    component: 'CNavGroup',
    name: () => i18next.t('ANALYTICS'),
    to: '/ANALYTICS',
    icon: 'cilChart',
    items: [
      {
        component: 'CNavItem',
        name: 'Availability',
        to: '/base/Availability',
      },
      {
        component: 'CNavItem',
        name: 'Absorption',
        to: '/base/Absorption',
      },
    ],
  },
  {
    component: 'CNavItem',
    // component: 'CNavGroup',
    name: () => i18next.t('BI CHARTS'),
    to: '/BI CHARTS',
    icon: 'cilChartPie',
    // items: [
    //   {
    //     component: 'CNavItem',
    //     name: 'Availability',
    //     to: '/base/Availability',
    //   },
    //   {
    //     component: 'CNavItem',
    //     name: 'Absorption',
    //     to: '/base/Absorption',
    //   },
    // ],
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('MARKET OVERVIEW'),
    to: '/theme/MARKET OVERVIEW',
    icon: 'cilChartLine',
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('FIBRAS'),
    to: '/theme/FIBRAS',
    icon: 'cibCashapp',
    
    
  },
  {
    component: 'CNavItem',
    name: () => i18next.t('SETTINGS'),
    to: '/theme/SETTINGS',
    icon: 'cilSettings',
  },
  // {
  //   component: 'CNavItem',
  //   name: 'Smart Table',
  //   to: '/smart-table',
  //   icon: 'cil-grid',
  //   badge: {
  //     color: 'danger',
  //     text: 'PRO',
  //   },
  // },
  // {
  //   component: 'CNavTitle',
  //   name: () => i18next.t('plugins'),
  // },
  // {
  //   component: 'CNavItem',
  //   name: () => i18next.t('calendar'),
  //   to: '/calendar',
  //   icon: 'cil-calendar',
  //   badge: {
  //     color: 'danger',
  //     text: 'PRO',
  //   },
  // },
  // {
  //   component: 'CNavItem',
  //   name: () => i18next.t('charts'),
  //   to: '/charts',
  //   icon: 'cil-chart-pie',
  // },
  // {
  //   component: 'CNavTitle',
  //   name: 'Extras',
  // },
  // {
  //   component: 'CNavGroup',
  //   name: () => i18next.t('pages'),
  //   to: '/pages',
  //   icon: 'cil-star',
  //   items: [
  //     {
  //       component: 'CNavItem',
  //       name: () => i18next.t('login'),
  //       to: '/pages/login',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: () => i18next.t('register'),
  //       to: '/pages/register',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: () => i18next.t('error404'),
  //       to: '/pages/404',
  //     },
  //     {
  //       component: 'CNavItem',
  //       name: () => i18next.t('error500'),
  //       to: '/pages/500',
  //     },
  //   ],
  // },
  // {
  //   component: 'CNavGroup',
  //   name: () => i18next.t('apps'),
  //   to: '/apps',
  //   icon: 'cil-layers',
  //   items: [
  //     {
  //       component: 'CNavGroup',
  //       name: 'Invoicing',
  //       to: '/apps/invoicing',
  //       icon: 'cil-spreadsheet',
  //       items: [
  //         {
  //           component: 'CNavItem',
  //           name: 'Invoice',
  //           to: '/apps/invoicing/invoice',
  //           badge: {
  //             color: 'danger',
  //             text: 'PRO',
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       component: 'CNavGroup',
  //       name: 'Email',
  //       to: '/apps/email',
  //       icon: 'cil-envelope-closed',
  //       items: [
  //         {
  //           component: 'CNavItem',
  //           name: 'Inbox',
  //           to: '/apps/email/inbox',
  //           icon: 'cil-envelope-closed',
  //           badge: {
  //             color: 'danger',
  //             text: 'PRO',
  //           },
  //         },
  //         {
  //           component: 'CNavItem',
  //           name: 'Message',
  //           to: '/apps/email/message',
  //           icon: 'cil-envelope-open',
  //           badge: {
  //             color: 'danger',
  //             text: 'PRO',
  //           },
  //         },
  //         {
  //           component: 'CNavItem',
  //           name: 'Compose',
  //           to: '/apps/email/compose',
  //           icon: 'cil-envelope-letter',
  //           badge: {
  //             color: 'danger',
  //             text: 'PRO',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
]
