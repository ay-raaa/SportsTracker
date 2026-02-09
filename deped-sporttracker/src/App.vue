<script setup>
import { computed, ref } from 'vue'
import HomeTab from './components/HomeTab.vue'
import SportsTab from './components/SportsTab.vue'
import HomeLeagues from './components/HomeLeagues.vue'
import AboutUs from './components/AboutUs.vue'

const activeTab = ref('Home')
const isHome = computed(() => activeTab.value === 'Home')
const isSports = computed(() => activeTab.value === 'Sports')
</script>

<template>
  <HomeTab v-if="isHome" :active="activeTab" @change="activeTab = $event" />
  <SportsTab v-else-if="isSports" :active="activeTab" @change="activeTab = $event" />
  <HomeTab v-else :active="activeTab" @change="activeTab = $event" />
  <div>
    <HomeTab v-if="activeTab !== 'About Us'" :active="activeTab" @change="activeTab = $event">
      <!-- Content slot for cards below navigation -->
      <HomeLeagues v-if="activeTab === 'Home'" />
    </HomeTab>
    <AboutUs v-if="activeTab === 'About Us'" :active="activeTab" @change="activeTab = $event" />
  </div>
</template>
