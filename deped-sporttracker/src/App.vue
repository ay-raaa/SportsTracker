<script setup>
import { computed, ref } from 'vue'
import HomeTab from './components/HomeTab.vue'
import SportsTab from './components/SportsTab.vue'
import HomeLeagues from './components/HomeLeagues.vue'
import AboutUs from './components/AboutUs.vue'

const activeTab = ref('Home')
const isSports = computed(() => activeTab.value === 'Sports')
</script>

<template>
  <div>
    <HomeTab v-if="activeTab === 'Home'" :active="activeTab" @change="activeTab = $event">
      <!-- Content slot for cards below navigation -->
      <HomeLeagues />
    </HomeTab>
    <SportsTab v-else-if="isSports" :active="activeTab" @change="activeTab = $event" />
    <AboutUs v-else-if="activeTab === 'About Us'" :active="activeTab" @change="activeTab = $event" />
  </div>
</template>

