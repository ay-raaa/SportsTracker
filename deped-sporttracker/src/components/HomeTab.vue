<script setup>
import TabsNav from './TabsNav.vue'

const props = defineProps({
  active: {
    type: String,
    default: 'Home',
  },
})

const emit = defineEmits(['change'])
</script>

<template>
  <div class="min-h-screen bg-[url('/images/deped.jpg')] bg-cover bg-center bg-fixed">
    <div class="min-h-screen bg-white/60">
      <div class="mx-auto w-full max-w-none px-0 pb-12 pt-0">
        <header
          class="h-24 w-full overflow-hidden bg-[url('/images/img.jpg')] bg-cover bg-[center_30%] shadow-[0_18px_40px_rgba(16,16,24,0.18)] md:h-28"
        >
          <div class="flex h-full items-center bg-blue-900/70 px-6">
            <div class="flex items-center gap-10">
              <img
                src="/images/deped-logo.png"
                alt="Department of Education Lapu-Lapu Division"
                class="h-20 w-20 rounded-full border-2 border-white/80 object-cover shadow"
              />
              <div>
                <h1 class="text-3xl font-semibold text-white">Leagues</h1>
                <TabsNav :active="props.active" @change="emit('change', $event)" />
              </div>
            </div>
          </div>
        </header>

        <!-- Slot for content below navigation -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>