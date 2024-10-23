<script setup>
import { onMounted, ref } from 'vue'
import { useTranslation } from 'i18next-vue'
import { useColorModes } from '@coreui/vue-pro'

import AppHeaderDropdownAccnt from '@/components/AppHeaderDropdownAccnt.vue'
import AppHeaderDropdownMssgs from '@/components/AppHeaderDropdownMssgs.vue'
import AppHeaderDropdownNotif from '@/components/AppHeaderDropdownNotif.vue'
import AppHeaderDropdownTasks from '@/components/AppHeaderDropdownTasks.vue'
import { useAsideStore } from '@/stores/aside.js'
import { useSidebarStore } from '@/stores/sidebar.js'

const { t, i18next } = useTranslation()
const aside = useAsideStore()
const sidebar = useSidebarStore()
const headerClassNames = ref('p-0')
const { colorMode, setColorMode } = useColorModes('coreui-pro-vue-admin-template-theme-modern')

onMounted(() => {
  document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 0) {
      headerClassNames.value = 'p-0 shadow-sm'
    } else {
      headerClassNames.value = 'p-0'
    }
  })
})
</script>

<template>
  <CHeader position="sticky" :class="headerClassNames" class="header-background">
    <CContainer class="" fluid>
       
      <CHeaderToggler
        :class="['d-lg-none', { 'prevent-hide': !sidebar.visible }]"
        @click="sidebar.toggleVisible()"
        style="margin-inline-start: -14px"
      >
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>

      <img src="../assets/images/market-logo.jpg" class="header-image" />
      <CHeaderNav class="ms-auto ms-md-0">
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <CDropdown variant="nav-item" placement="bottom-end">
          <CDropdownToggle :caret="false">
            <CIcon v-if="colorMode === 'dark'" icon="cil-moon" size="lg" />
            <CIcon v-else-if="colorMode === 'light'" icon="cil-sun" size="lg" />
            <CIcon v-else icon="cil-contrast" size="lg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              :active="colorMode === 'light'"
              as="button"
              class="d-flex align-items-center"
              type="button"
              @click="setColorMode('light')"
            >
              <CIcon class="me-2" icon="cil-sun" size="lg" /> Light
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'dark'"
              as="button"
              class="d-flex align-items-center"
              type="button"
              @click="setColorMode('dark')"
            >
              <CIcon class="me-2" icon="cil-moon" size="lg" /> Dark
            </CDropdownItem>
          
          </CDropdownMenu>
        </CDropdown>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
      </CHeaderNav>
     
      
    </CContainer>
  </CHeader>
</template>
