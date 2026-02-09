<script setup>
import { ref } from 'vue'
import HomeTab from './components/HomeTab.vue'
import HomeLeagues from './components/HomeLeagues.vue'
import AboutUs from './components/AboutUs.vue'

const activeTab = ref('Home')
</script>

<template>
  <div>
    <HomeTab v-if="activeTab !== 'About Us'" :active="activeTab" @change="activeTab = $event">
      <!-- Content slot for cards below navigation -->
      <HomeLeagues v-if="activeTab === 'Home'" />
    </HomeTab>
    <AboutUs v-if="activeTab === 'About Us'" :active="activeTab" @change="activeTab = $event" />
  </div>
</template>
