<script setup>
import { computed, ref } from 'vue'
import HomeTab from './components/HomeTab.vue'
import SportsTab from './components/SportsTab.vue'

const activeTab = ref('Home')
const isHome = computed(() => activeTab.value === 'Home')
const isSports = computed(() => activeTab.value === 'Sports')
</script>

<template>
  <HomeTab v-if="isHome" :active="activeTab" @change="activeTab = $event" />
  <SportsTab v-else-if="isSports" :active="activeTab" @change="activeTab = $event" />
  <HomeTab v-else :active="activeTab" @change="activeTab = $event" />
</template>
