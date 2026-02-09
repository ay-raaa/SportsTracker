<script setup>
import { ref } from 'vue'
import HomeTab from './components/HomeTab.vue'

const activeTab = ref('Home')
</script>

<template>
  <HomeTab :active="activeTab" @change="activeTab = $event" />
</template>
