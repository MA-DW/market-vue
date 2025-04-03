<script setup lang="ts">
import { UikitCardNumber } from '#components';
</script>

<template>
  <div class="p-4">
    <h1>Card Number</h1>
    <div class="flex">
      <div class="w-1/3">
        <UikitCardNumber title="Card title/hame/header" text="000,000,000" value="000"></UikitCardNumber>
      </div>
      <div class="w-1/3">
        <UikitCardNumber title="Card title/hame/header" text="000,000,000" value="000" size="md"></UikitCardNumber>
      </div>
    </div>
    <div class="w-100 my-3"></div>
    <div class="flex">
      <div class="w-1/3">
        <UikitCardNumber>
          <template #value>111</template>
          <template #title>Card title/hame/header</template>
          <template #text>111,000,000</template>
        </UikitCardNumber>
      </div>
      <div class="w-1/3">
        <UikitCardNumber size="md">
          <template #title>Card title/hame/header</template>
          <template #text>111,000,000</template>
        </UikitCardNumber>
      </div>
    </div>

    <div class="bg-primary p-3">
      <div class="flex">
        <div class="w-1/3">
          <UikitCardNumber title="Card title/hame/header" text="000,000,000" value="000"></UikitCardNumber>
        </div>
        <div class="w-1/3">
          <UikitCardNumber title="Card title/hame/header" text="000,000,000" value="000" size="md"></UikitCardNumber>
        </div>
      </div>
      <div class="w-100 my-3"></div>
      <div class="flex">
        <div class="w-1/3">
          <UikitCardNumber>
            <template #value>111</template>
            <template #title>Card title/hame/header</template>
            <template #text>111,000,000</template>
          </UikitCardNumber>
        </div>
        <div class="w-1/3">
          <UikitCardNumber size="md">
            <template #title>Card title/hame/header</template>
            <template #text>111,000,000</template>
          </UikitCardNumber>
        </div>
      </div>
    </div>
  </div>
</template>