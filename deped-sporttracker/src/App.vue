<script setup>
import { ref } from 'vue'
import HomeTab from './components/HomeTab.vue'
import HomeLeagues from './components/HomeLeagues.vue'

const activeTab = ref('Home')
</script>

<template>
    <div>
      <HomeTab :active="activeTab" @change="activeTab = $event">
        <!-- Content slot for cards below navigation -->
        <HomeLeagues v-if="activeTab === 'Home'" />
      </HomeTab>
  </div>
</template>
