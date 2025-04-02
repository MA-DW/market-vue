<script setup lang="ts">
import { UikitIcon } from '#components';
</script>
<template>
  <div class="flex gap-4">
    <UikitIcon name="website"></UikitIcon>
    <UikitIcon name="configuration-unread"></UikitIcon>

    <UikitIcon name="website" color="black"></UikitIcon>
    <UikitIcon name="configuration-unread" color="black"></UikitIcon>

    <div class="bg-primary flex gap-4">
      <UikitIcon name="website" class="text-4xl" color="white"></UikitIcon>
      <UikitIcon name="configuration-unread" color="white"></UikitIcon>
    </div>

    <UikitIcon name="user"></UikitIcon>
    <UikitIcon name="user-solid"></UikitIcon>

    <UikitIcon name="signout" class="text-3xl"></UikitIcon>

    <UikitIcon name="linkendin"></UikitIcon>
    <UikitIcon name="instagram"></UikitIcon>
    <UikitIcon name="facebook"></UikitIcon>
    <UikitIcon name="twitter"></UikitIcon>

    <UikitIcon name="home"></UikitIcon>
    <UikitIcon name="market-report"></UikitIcon>

    <UikitIcon name="market-report" color="red"></UikitIcon>

  </div>
</template>