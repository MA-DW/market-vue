<script setup lang="ts">
const isCollapsed = inject('isCollapsed') as Ref<boolean>;

const menuItems = [
{
    title: 'HOME',
    icon: 'home',
    to: {name: 'market'},
  },
  {
    title: 'MARKET REPORT',
    icon: 'market-report',
    to: {name: 'market-report'},
  },
  {
    title: 'ANALYTICS',
    icon: 'analytics',
    children: [
      { title: 'Report', to: {name: 'market-option1'} },
      { title: 'Table', to: {name: 'market-option2'} },
    ]
  },
  {
    title: 'MARKET OVERVIEW',
    icon: 'market-overview',
    to: {name: 'market-overview'},
  },
  {
    title: 'BI CHARTS',
    icon: 'charts',
    to: {name: 'market-bicharts'},
  },
  {
    title: 'REIT',
    icon: 'reit',
    to: {name: 'market-reit'},
  },
  {
    title: 'GLOSSARY',
    icon: 'glosary',
    to: {name: 'market-glossary'},
  },
];
const route = useRoute();

const openItems = ref<Record<string, boolean>>({});

const toggle = (itemTitle: string) => {
  openItems.value[itemTitle] = !openItems.value[itemTitle];
};

const isActiveRootByChilden = (childrens: (typeof menuItems)[number]['children']) => childrens?.map(i => i.to.name).includes(route.name as string);
</script>
<template>
  <aside class="bg-oscuro-100 p-6 transition-all duration-300 overflow-x-hidden overflow-y-auto flex-shrink-0" :class="[isCollapsed ? 'w-24' : 'w-72']">
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.title" class="mb-1">
            <div class="flex items-center justify-between">
              <NuxtLink v-if="!item.children || item.children.length === 0" :title="item.title" :to="item.to" class="text-[#403F41] rounded w-full hover:no-underline bg-transparent flex items-center py-2 px-3 hover:bg-[#dbdbde] text-[20px]" exact-active-class="!bg-primary !text-white">
                <div v-if="item.icon" class="me-2"><UikitIcon :name="(item.icon as any)" :color="(item.to && route.name === item.to.name) ? 'currentColor' : undefined"></UikitIcon></div>
                <div v-show="!isCollapsed" class="flex-1 pt-1">{{ item.title }}</div>
              </NuxtLink>
              <div v-else @click="toggle(item.title)" :title="item.title" class="text-[#403F41] rounded w-full hover:no-underline bg-transparent flex items-center py-2 px-3 hover:bg-[#dbdbde] text-[20px]" :class="[isActiveRootByChilden(item.children) ? '!bg-primary !text-white': '']">
                <div v-if="item.icon" class="me-2"><UikitIcon :name="(item.icon as any)" :color="(isActiveRootByChilden(item.children)) ? 'currentColor' : undefined"></UikitIcon></div>
                <div v-show="!isCollapsed" class="flex-1 pt-1">{{ item.title }}</div>
                <button class="text-sm  px-2">
                  <svg :class="{ 'rotate-180': openItems[item.title] }" class="transition-transform" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.08301L6.83333 6.91634L12.6667 1.08301" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <ul v-if="item.children && openItems[item.title]" :class="['mt-1', isCollapsed ? 'pl-0' : 'pl-3']" >
              <li v-for="child in item.children" :key="child.title">
                <NuxtLink :to="child.to" :title="child.title" class="text-oscuro-200 w-full hover:no-underline bg-transparent flex items-center py-2 px-3 hover:bg-[#dbdbde] text-lg" exact-active-class="!text-oscuro">
                  <div v-show="isCollapsed" class="font-bold rounded-full bg-secondary text-primary w-6 h-6 text-center">{{ child.title[0] }}</div>
                  <div v-show="!isCollapsed" class="flex-1 pt-1">{{ child.title }}</div>
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>

        <ul class="mt-10">
          <li>
            <div title="Sign Out" class="text-[#403F41] rounded w-full hover:no-underline bg-transparent flex items-center py-2 px-3 hover:bg-[#dbdbde] text-[20px]">
              <div class="me-2"><UikitIcon name="signout"></UikitIcon></div>
              <div v-show="!isCollapsed" class="flex-1 pt-1">Sign Out</div>
            </div>
          </li>
        </ul>
      </nav>
  </aside>
</template>