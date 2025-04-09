<script setup lang="ts">
import { ref } from 'vue';

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
  <aside class="bg-oscuro-100 p-6">
    <ul>
      <li v-for="item in menuItems" :key="item.title" class="mb-1">
        <div class="flex items-center justify-between">
          <NuxtLink v-if="!item.children || item.children.length === 0" :to="item.to" class="text-[#403F41] rounded w-full hover:no-underline bg-transparent flex items-center py-2 px-3 hover:bg-[#dbdbde] text-[20px]" exact-active-class="!bg-primary !text-white">
            <div v-if="item.icon" class="me-2"><UikitIcon :name="(item.icon as any)" :color="(item.to && route.name === item.to.name) ? 'currentColor' : undefined"></UikitIcon></div>
            <div class="flex-1 pt-1">{{ item.title }}</div>
          </NuxtLink>
          <div v-else @click="toggle(item.title)" class="text-[#403F41] rounded w-full hover:no-underline bg-transparent flex items-center py-2 px-3 hover:bg-[#dbdbde] text-[20px]" :class="[isActiveRootByChilden(item.children) ? '!bg-primary !text-white': '']">
            <div v-if="item.icon" class="me-2"><UikitIcon :name="(item.icon as any)" :color="(isActiveRootByChilden(item.children)) ? 'currentColor' : undefined"></UikitIcon></div>
            <div class="flex-1 pt-1">{{ item.title }}</div>
            <button class="text-sm  px-2">
              <svg :class="{ 'rotate-180': openItems[item.title] }" class="transition-transform" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.08301L6.83333 6.91634L12.6667 1.08301" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <ul v-if="item.children && openItems[item.title]" class="pl-6 mt-1">
          <li v-for="child in item.children" :key="child.title">
            <NuxtLink :to="child.to" class="text-[#403F41] w-full rounded hover:no-underline bg-transparent flex items-center py-2 px-3 hover:bg-[#dbdbde] text-[20px]" exact-active-class="!bg-primary !text-white">
              <div class="flex-1 pt-1">{{ child.title }}</div>
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>