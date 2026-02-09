<script setup>
import { ref } from 'vue'
import TabsNav from './TabsNav.vue'

const props = defineProps({
  active: {
    type: String,
    default: 'Sports',
  },
})

const emit = defineEmits(['change'])

const selectedSport = ref(null)

const sports = [
  { name: 'Archery', image: '/images/img2.jpg' },
  { name: 'Arnis', image: '/images/deped.jpg' },
  { name: 'Badminton', image: '/images/img.jpg' },
  { name: 'Baseball', image: '/images/deped.jpg' },
  { name: 'Billiard', image: '/images/img.jpg' },
  { name: 'Boxing', image: '/images/deped.jpg' },
  { name: 'Chess', image: '/images/img.jpg' },
  { name: 'Dance Sport', image: '/images/deped.jpg' },
  { name: 'Foot Ball', image: '/images/img.jpg' },
  { name: 'Gymnastic', image: '/images/deped.jpg' },
  { name: 'Swimming', image: '/images/img.jpg' },
  { name: 'Sipaktakraw', image: '/images/deped.jpg' },
]

const handleSportClick = (sport) => {
  selectedSport.value = sport
}

const closePopup = () => {
  selectedSport.value = null
}
</script>

<template>
  <div class="h-screen overflow-hidden bg-[url('/images/deped.jpg')] bg-cover bg-center bg-fixed">
    <div class="h-full bg-white/60">
      <div class="mx-auto w-full max-w-none px-0 pb-0 pt-0">
        <header
          class="h-24 w-full overflow-hidden bg-[url('/images/img.jpg')] bg-cover bg-center shadow-[0_18px_40px_rgba(16,16,24,0.18)] md:h-28"
        >
          <div class="flex h-full items-center bg-blue-900/70 px-6">
            <div class="flex items-center gap-4">
              <img
                src="/images/deped-logo.png"
                alt="Department of Education Lapu-Lapu Division"
                class="h-18 w-20 rounded-full border-2 border-white/80 object-cover shadow"
              />
              <div>
                <h1 class="text-2xl font-semibold text-white">Leagues</h1>
                <TabsNav :active="props.active" @change="emit('change', $event)" />
              </div>
            </div>
          </div>
        </header>

        <section class="relative mx-auto mt-4 w-full px-4">
          <div class="flex items-center justify-center gap-4 mx-auto max-w-6xl">
            <button
              type="button"
              class="rounded-full bg-orange-200 px-6 py-1 text-xs font-semibold text-orange-900 shadow"
            >
              Elementary
            </button>
            <button
              type="button"
              class="rounded-full bg-orange-200 px-6 py-1 text-xs font-semibold text-orange-900 shadow"
            >
              Secondary
            </button>
          </div>

          <div
            class="mt-3 max-h-[calc(100vh-11.5rem)] overflow-y-auto scrollbar-hide pr-1 grid grid-cols-2 gap-7 sm:grid-cols-3 lg:grid-cols-4 mx-auto max-w-6xl"
          >
            <article
              v-for="sport in sports"
              :key="sport.name"
              class="group relative aspect-[5/3] overflow-hidden rounded-2xl bg-slate-800 shadow-[0_12px_24px_rgba(15,23,42,0.25)] ring-1 ring-white/20 transition"
              :class="selectedSport?.name === sport.name ? 'ring-2 ring-orange-300' : ''"
              role="button"
              tabindex="0"
              @click="handleSportClick(sport)"
              @keydown.enter="handleSportClick(sport)"
              @keydown.space.prevent="handleSportClick(sport)"
            >
              <img
                :src="sport.image"
                :alt="sport.name"
                class="h-full w-full object-cover opacity-85 transition duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black/35"></div>
              <div class="absolute inset-0 flex items-center justify-center px-3">
                <h3 class="text-center text-sm font-semibold uppercase tracking-wide text-white">
                  {{ sport.name }}
                </h3>
              </div>
            </article>
          </div>

          <aside
            v-if="selectedSport"
            class="pointer-events-auto fixed right-0 top-24 h-[565px] w-[360px] overflow-y-auto bg-black/85 px-6 pb-6 pt-5 text-white shadow-[0_20px_46px_rgba(15,23,42,0.5)] ring-1 ring-white/10 sm:w-[380px] md:top-28 z-50"
          >
              <button
                type="button"
                class="absolute left-4 top-4 rounded-full bg-white/10 px-2 py-1 text-sm font-semibold text-white/90 hover:bg-white/20"
                @click="closePopup"
                aria-label="Close popup"
              >
                &larr;
              </button>
              <div class="flex h-full flex-col items-center justify-center gap-4">
              <h2 class="mt-1 text-3xl font-semibold">{{ selectedSport.name }}</h2>
              <div class="mt-2 flex w-full items-center justify-center gap-3">
                <button
                  type="button"
                  class="flex items-center gap-2 rounded-full bg-blue-800 px-4 py-1.5 text-xs font-semibold"
                >
                  Gender
                  <span class="text-[10px]">▼</span>
                </button>
                <button
                  type="button"
                  class="flex items-center gap-2 rounded-full bg-blue-800 px-4 py-1.5 text-xs font-semibold"
                >
                  Category
                  <span class="text-[10px]">▼</span>
                </button>
              </div>

              <div class="flex w-full flex-col gap-0">
                <div class="flex items-center gap-3 rounded-2 bg-blue-900/90 px-4 py-3 text-sm font-semibold">
                  <span class="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/10">
                    <img
                      src="/images/deped-logo.png"
                      alt="Lapu-Lapu City Division"
                      class="h-full w-full object-cover"
                    />
                  </span>
                  <span class="flex-1 text-center">Lapu-Lapu City Division</span>
                  <span class="text-[10px]">▼</span>
                </div>
                <div class="rounded-2 bg-orange-700/90 px-4 py-1 text-center text-[11px] font-semibold tracking-[0.35em]">
                  WIN
                </div>
                <div class="my-3 text-center text-2xl font-semibold">VS.</div>
                <div class="flex items-center gap-3 rounded-2 bg-blue-900/90 px-4 py-3 text-sm font-semibold">
                  <span class="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/10">
                    <img
                      src="/images/deped-logo.png"
                      alt="Bogo City Division"
                      class="h-full w-full object-cover"
                    />
                  </span>
                  <span class="flex-1 text-center">Bogo City Division</span>
                  <span class="text-[10px]">▼</span>
                </div>
                <div class="rounded-2 bg-orange-700/90 px-4 py-1 text-center text-[11px] font-semibold tracking-[0.35em]">
                  LOSE
                </div>
              </div>

              <button
                type="button"
                class="mt-2 rounded-2 bg-blue-800 px-7 py-2 text-xs font-semibold"
              >
                SUBMIT
              </button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  </div>
</template>