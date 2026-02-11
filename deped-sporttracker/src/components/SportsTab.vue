<script setup>
import { computed, ref } from 'vue'
import TabsNav from './TabsNav.vue'

const props = defineProps({
  active: {
    type: String,
    default: 'Sports',
  },
})

const emit = defineEmits(['change'])

const selectedSport = ref(null)
const resultHome = ref('')
const resultAway = ref('')
const selectedLevel = ref('elementary')
const selectedCategory = ref('')
const selectedGender = ref('')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const sports = [
  { name: 'Archery', image: '/images/archery.jpg' },
  { name: 'Arnis', image: '/images/arnis.jpg' },
  { name: 'Athletics', image: '/images/athletics.jpg' },
  { name: 'Badminton', image: '/images/badminton.jpg' },
  { name: 'Baseball', image: '/images/baseball.jpg' },
  { name: 'Basketball', image: '/images/basketball.jpg' },
  { name: 'Billiard', image: '/images/billiard.jpg' },
  { name: 'Boxing', image: '/images/boxing.jpg' },
  { name: 'Chess', image: '/images/chess.jpg' },
  { name: 'Dance Sport', image: '/images/dance_sport.jpg' },
  { name: 'Football', image: '/images/football.jpg' },
  { name: 'Gymnastic', image: '/images/gymnastic.jpg' },
  { name: 'Swimming', image: '/images/swimming.jpg' },
  { name: 'Sepak Takraw', image: '/images/sepak_takraw.jpg' },
  { name: 'Softball', image: '/images/softball.jpg' },
  { name: 'Tennis', image: '/images/tennis.jpg' },
  { name: 'Table Tennis', image: '/images/table tennis.jpg' },
  { name: 'Taekwondo', image: '/images/taekwondo.jpg' },
  { name: 'Volleyball', image: '/images/volleyball.jpg' },
  { name: 'Special Games', image: '/images/s-games.jpg' },
]

const divisions = [
  { name: 'Bogo City Division', logo: '/images/bogo_logo.png' },
  { name: 'Bohol Division', logo: '/images/bohol_logo.png' },
  { name: 'Cebu Province Division', logo: '/images/cebuprovince_logo.png' },
  { name: 'Cebu City Division', logo: '/images/cebucity_logo.png' },
  { name: 'Carcar City Division', logo: '/images/carcar_logo.png' },
  { name: 'City of Naga Division', logo: '/images/nagacity_logo.png' },
  { name: 'Danao City Division', logo: '/images/danao_logo.png' },
  { name: 'Mandaue City Division', logo: '/images/mandaue_logo.png' },
  { name: 'Tagbilaran City Division', logo: '/images/tagbilaran_logo.png' },
  { name: 'Talisay City Division', logo: '/images/talisay_logo.png' },
  { name: 'Toledo City Division', logo: '/images/toledo_logo.png' },
]

const selectedAwayDivision = ref('')

const categoryMap = {
  'Archery': {
    elementary: [
      '15-meter distance',
      '12-meter distance',
      '72 rounds',
      'Olympic Round (5 meters)',
      'Mixed Team (15 meters)',
    ],
    secondary: [
      '70-m Distance',
      '60-m Distance',
      '50-m Distance',
      '30-m Distance',
      '1440 round 144 arrows - aggregate',
      'Olympic Round (70 meters)',
      'Team Event (70 meters)',
      'Mixed Team (70 meters)',
    ],
  },
  'Arnis': {
    elementary: [
      'Individual Likha Anyo Single Weapon',
      'Individual Likha Anyo Espada y Daga',
      'Individual Likha Anyo Double Weapon',
      'Team (Synchronized Mixed) Double Weapon',
      'Team (Synchronized) Likha Anyo Single Weapon',
      'Team (Synchronized) Likha Anyo Espada y Daga',
      'Team (Synchronized) Likha Anyo Double Weapon',
    ],
    secondary: [
      'Individual Likha Anyo Single Weapon',
      'Individual Likha Anyo Double Weapon',
      'Individual Likha Espada y Daga',
      'Team (Synchronized) Likha Anyo Single Weapon',
      'Team (Synchronized) Likha Anyo Double Weapon',
      'Team (Synchronized) Likha Anyo Espada y Daga',
      'Bladed Weapon (Paded Stick) - Pinweight',
      'Bladed Weapon (Paded Stick) - Bantamweight',
      'Bladed Weapon (Paded Stick) - Featherweight',
      'Bladed Weapon (Paded Stick) - Extra Lightweight',
      'Bladed Weapon (Paded Stick) - Half Lightweight',
    ],
  },
  'Athletics': {
    elementary: [
      '100M',
      '200M',
      '400M',
      '800M',
      '1,500M',
      '2,000M',
      '100H (Hurdles)',
      '110H (Hurdles)',
      '4X100R (Relay)',
      '4X400R (Relay)',
      'Long Jump',
      'Triple Jump',
      'High Jump',
      'Javelin Throw',
      'Shot Put',
      'Discus Throw',
    ],
    secondary: [
      '100M',
      '200M',
      '400M',
      '800M',
      '1,500M',
      '2,000M',
      '3000M',
      '3,000SC (Steeplechase)',
      '5,000M',
      '100H (Hurdles)',
      '110H (Hurdles)',
      '400H (Hurdles)',
      '4X100R (Relay)',
      '4X400R (Relay)',
      '4X100MxR (Mixed Relay)',
      '4X400MxR (Mixed Relay)',
      'Long Jump',
      'Triple Jump',
      'High Jump',
      'Pole Vault',
      'Javelin Throw',
      'Shot Put',
      'Discus Throw',
    ],
  },
  'Badminton': {
    elementary: [
      'Singles',
      'Doubles',
      'Mixed Doubles',
    ],
    secondary: [
      'Singles',
      'Doubles',
      'Mixed Doubles',
    ],
  },
  'Baseball': {
    elementary: ['Baseball'],
    secondary: ['Baseball'],
  },
  'Basketball': {
    elementary: [
      'Basketball 5 x 5',
      'Basketball 3 x 3',
    ],
    secondary: [
      'Basketball 5 x 5',
      'Basketball 3 x 3',
    ],
  },
  'Chess': {
    elementary: [
      'Individual BLITZ',
      'Individual STANDARD',
      'Team STANDARD',
    ],
    secondary: [
      'Individual BLITZ',
      'Individual STANDARD',
      'Team STANDARD',
    ],
  },
  'Dance Sport': {
    elementary: [
      'Modern: Single Dance - Waltz',
      'Modern: Single Dance - Tango',
      'Modern: Single Dance - Viennese Waltz',
      'Modern: Single Dance - Foxtrot',
      'Modern: Single Dance - Quickstep',
      'Modern: Grade A - W, T, VW, F, Q',
      'Latin: Single Dance - Samba',
      'Latin: Single Dance - Chachacha',
      'Latin: Single Dance - Rumba',
      'Latin: Single Dance - Paso Doble',
      'Latin: Single Dance - Jive',
      'Latin: Grade A - S, C, R, PD, J',
    ],
    secondary: [
      'Modern: Single Dance - Waltz',
      'Modern: Single Dance - Tango',
      'Modern: Single Dance - Viennese Waltz',
      'Modern: Single Dance - Foxtrot',
      'Modern: Single Dance - Quickstep',
      'Modern: Grade A - W, T, VW, F, Q',
      'Latin: Single Dance - Samba',
      'Latin: Single Dance - Chachacha',
      'Latin: Single Dance - Rumba',
      'Latin: Single Dance - Paso Doble',
      'Latin: Single Dance - Jive',
      'Latin: Grade A - S, C, R, PD, J',
    ],
  },
  'Football': {
    elementary: ['Football', 'Futsal'],
    secondary: ['Football', 'Futsal'],
  },
  'Gymnastic': {
    elementary: [
      'Women\'s Artistic Gymnastics',
      'Men\'s Artistic Gymnastics',
      'Rhythmic Gymnastics',
      'Aerobic: Individual Men (IM)',
      'Aerobic: Individual Women (IW)',
      'Aerobic: Mixed Pair (MP)',
      'Aerobic: Trio (TR)',
      'Aerobic: Aerobic Dance (AD)',
    ],
    secondary: [
      'Women\'s Artistic Gymnastics',
      'Men\'s Artistic Gymnastics',
      'Rhythmic Gymnastics',
      'Aerobic: Individual Men (IM)',
      'Aerobic: Individual Women (IW)',
      'Aerobic: Mixed Pair (MP)',
      'Aerobic: Trio (TR)',
      'Aerobic: Aerobic Dance (AD)',
    ],
  },
  'Swimming': {
    elementary: [
      '400m Freestyle',
      '200m Freestyle',
      '200m Ind. Medley',
      '100m Freestyle',
      '100m Breaststroke',
      '100m Backstroke',
      '100m Butterfly stroke',
      '50m Freestyle',
      '50m Breaststroke',
      '50m Backstroke',
      '50m Butterfly stroke',
      '4 x 100m Free Relay',
      '4 x 50m Free Relay',
      '4 x 100m Med. Relay',
      '4 x 50m Med. Relay',
    ],
    secondary: [
      '800m Freestyle',
      '1500m Freestyle',
      '400m Freestyle',
      '400m Ind. Medley',
      '200m Ind. Medley',
      '200m Freestyle',
      '200m Breaststroke',
      '200m Backstroke',
      '200m Butterfly stroke',
      '100m Freestyle',
      '100m Breaststroke',
      '100m Backstroke',
      '100m Butterfly stroke',
      '50m Freestyle',
      '50m Breaststroke',
      '50m Backstroke',
      '50m Butterfly stroke',
      '4 x 100m Free Relay',
      '4 x 50m Free Relay',
      '4 x 100m Med. Relay',
      '4 x 50m Med. Relay',
      '4 x 100m/Mixed Relay',
    ],
  },
  'Sepak Takraw': {
    elementary: ['REGU', 'DOUBLE'],
    secondary: ['REGU', 'DOUBLE'],
  },
  'Softball': {
    elementary: ['Softball'],
    secondary: ['Softball'],
  },
  'Tennis': {
    elementary: [
      'Singles',
      'Doubles',
      'Mixed Doubles',
    ],
    secondary: [
      'Singles',
      'Doubles',
      'Mixed Doubles',
    ],
  },
  'Table Tennis': {
    elementary: [
      'Singles',
      'Doubles',
      'Mixed Doubles',
    ],
    secondary: [
      'Singles',
      'Doubles',
      'Mixed Doubles',
    ],
  },
  'Taekwondo': {
    elementary: [
      'Elementary Poomsae: Individual Recognized',
      'Elementary Poomsae: Free Style',
      'Elementary Poomsae: Team',
      'Elementary Poomsae: Mixed Style',
      'Elementary Kyorugi: Under 152 cm (144-152 cm)',
      'Elementary Kyorugi: Under 160 cm (152-160 cm)',
      'Elementary Kyorugi: Under 168 cm (160-168 cm)',
    ],
    secondary: [
      'Secondary Poomsae: Individual Standard',
      'Secondary Poomsae: Free Style',
      'Secondary Poomsae: Team Standard',
      'Secondary Poomsae: Freestyle Mixed Pair',
      'Secondary Poomsae: Mixed Pair',
      'Secondary Kyorugi: Under 45 kg (Boys) / Under 42 kg (Girls)',
      'Secondary Kyorugi: Under 48 kg (Boys) / Under 44 kg (Girls)',
      'Secondary Kyorugi: Under 51 kg (Boys) / Under 46 kg (Girls)',
      'Secondary Kyorugi: Under 55 kg (Boys) / Under 49 kg (Girls)',
      'Secondary Kyorugi: Under 59 kg (Boys) / Under 52 kg (Girls)',
      'Secondary Kyorugi: Under 63 kg (Boys) / Under 55 kg (Girls)',
      'Secondary Kyorugi: Under 68 kg (Boys) / Under 59 kg (Girls)',
    ],
  },
  'Volleyball': {
    elementary: ['Volleyball'],
    secondary: ['Volleyball'],
  },
  'Billiard': {
    elementary: [],
    secondary: ['8-Ball', '9-Ball'],
  },
  'Boxing': {
    elementary: [],
    secondary: [
      'Pin weight',
      'Light Fly weight',
      'Fly weight',
      'Light Bantam weight',
      'Bantamweight',
      'Minimum',
      'Flyweight',
    ],
  },
  'Special Games': {
    special: [
      'Visual Impairment: Athletics 100M',
      'Visual Impairment: Running Long Jump',
      'Visual Impairment: Shot Put',
      'Visual Impairment: Goalball',
      'Intellectual Impairment: Athletics 100M - Youth Category',
      'Intellectual Impairment: Athletics 200M - Junior Category',
      'Intellectual Impairment: Athletics 400M - Youth Category',
      'Intellectual Impairment: Athletics 4 x 100M - Youth Category',
      'Intellectual Impairment: Running Long Jump - Youth Category',
      'Intellectual Impairment: Running Long Jump - Juniors Category',
      'Intellectual Impairment: Shot Put - Juniors Category',
      'Intellectual Impairment: Shot Put - Youth Category',
      'Intellectual Impairment: BOCEE - Single',
      'Intellectual Impairment: BOCEE - Doubles',
      'Intellectual Impairment: BOCEE - Team Event',
      'Intellectual Impairment: Swimming - 50-Back Stroke (Youth/Juniors)',
      'Intellectual Impairment: Swimming - 50-Breast Stroke (Youth/Juniors)',
      'Intellectual Impairment: Swimming - 50-Freestyle (Youth/Juniors)',
      'Intellectual Impairment: Swimming - 50-Butterfly (Youth/Juniors)',
      'Physical Impairment: Athletics - Seated Shot Put',
      'Physical Impairment: Athletics - Long Jump',
      'Physical Impairment: Athletics - High Jump',
      'Physical Impairment: Swimming - 50-Back Stroke (Youth/Juniors)',
      'Physical Impairment: Swimming - 50-Breast Stroke (Youth/Juniors)',
      'Physical Impairment: Swimming - 50-Freestyle (Youth/Juniors)',
      'Physical Impairment: Swimming - 50-Butterfly (Youth/Juniors)',
    ],
  },
}

const handleSportClick = (sport) => {
  selectedSport.value = sport
  resultHome.value = ''
  resultAway.value = ''
  selectedAwayDivision.value = ''
  selectedCategory.value = ''
  selectedGender.value = ''
}

const closePopup = () => {
  selectedSport.value = null
  resultHome.value = ''
  resultAway.value = ''
  selectedAwayDivision.value = ''
  selectedCategory.value = ''
  selectedGender.value = ''
}

const closeMessage = () => {
  successMessage.value = ''
  errorMessage.value = ''
}

const setMatchResult = (side, value) => {
  if (!value) {
    resultHome.value = ''
    resultAway.value = ''
    return
  }

  const opposite = value === 'win' ? 'lose' : 'win'

  if (side === 'home') {
    resultHome.value = value
    resultAway.value = opposite
    return
  }

  resultAway.value = value
  resultHome.value = opposite
}

const getDivisionLogo = (divisionName) =>
  divisions.find((division) => division.name === divisionName)?.logo || '/images/deped-logo.png'

const categoryOptions = computed(() => {
  if (!selectedSport.value) {
    return []
  }

  const sportCategories = categoryMap[selectedSport.value.name]
  if (!sportCategories) {
    return []
  }

  if (selectedSport.value.name === 'Special Games') {
    return sportCategories.special || []
  }

  return sportCategories[selectedLevel.value] || []
})

const setLevel = (level) => {
  if (selectedLevel.value === level) {
    return
  }

  selectedLevel.value = level
  selectedCategory.value = ''
}

const handleSubmit = async () => {
  if (!selectedSport.value) {
    alert('Select a sport.')
    return
  }

  if (!selectedCategory.value) {
    alert('Select a category.')
    return
  }

  if (!selectedGender.value) {
    alert('Select a gender.')
    return
  }

  if (!selectedAwayDivision.value) {
    alert('Select an opposing division.')
    return
  }

  if (!resultHome.value || !resultAway.value) {
    alert('Select results for both divisions.')
    return
  }

  const homeResult = resultHome.value === 'win' ? 1 : 0
  const awayResult = resultAway.value === 'win' ? 1 : 0

  const payload = {
    sportName: selectedSport.value.name,
    sportLevel: selectedSport.value.name === 'Special Games' ? 'special' : selectedLevel.value,
    sportCategory: selectedCategory.value,
    sportGender: selectedGender.value,
    homeDivision: 'Lapu-Lapu City Division',
    againstDivision: selectedAwayDivision.value,
    homeResult,
    againstResult: awayResult,
  }

  try {
    isSubmitting.value = true
    const response = await fetch('/api/sports-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText || 'Failed to save result.')
    }

    successMessage.value = 'Game Result saved.'
    closePopup()
  } catch (error) {
    errorMessage.value = error.message || 'Failed to save result.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<!-- Navigation -->
<template>
  <div class="min-h-screen bg-[url('/images/deped.jpg')] bg-cover bg-center bg-fixed custom-scrollbar">
    <div
      v-if="successMessage || errorMessage"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="alertdialog"
      aria-live="assertive"
    >
      <div class="w-full max-w-sm rounded-2xl bg-white px-6 py-5 text-slate-900 shadow-2xl">
        <div class="text-lg font-semibold">
          {{ successMessage ? 'Success' : 'Error' }}
        </div>
        <p class="mt-2 text-sm text-slate-700">
          {{ successMessage || errorMessage }}
        </p>
        <div class="mt-4 flex justify-end">
          <button
            type="button"
            class="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
            @click="closeMessage"
          >
            OK
          </button>
        </div>
      </div>
    </div>
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
                <h1 class="text-4xl mb-5 mt-3 font-semibold text-white">Leagues</h1>
                <TabsNav :active="props.active" @change="emit('change', $event)" />
              </div>
            </div>
          </div>
        </header>

        <section class="relative mx-auto mt-4 w-full px-4">
          <div class="flex items-center justify-center gap-4 mx-auto max-w-6xl">
            <button
              type="button"
              class="rounded-full px-6 py-1 text-xs font-semibold shadow"
              :class="
                selectedLevel === 'elementary'
                  ? 'bg-orange-200 text-orange-900'
                  : 'bg-white/70 text-slate-700'
              "
              @click="setLevel('elementary')"
            >
              Elementary
            </button>
            <button
              type="button"
              class="rounded-full px-6 py-1 text-xs font-semibold shadow"
              :class="
                selectedLevel === 'secondary'
                  ? 'bg-orange-200 text-orange-900'
                  : 'bg-white/70 text-slate-700'
              "
              @click="setLevel('secondary')"
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
              :class="selectedSport?.name === sport.name ? 'ring-2 ring-blue-300' : ''"
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
            class="pointer-events-auto fixed right-0 top-24 h-[560px] w-[360px] overflow-y-auto bg-black/85 px-6 pb-6 pt-5 text-white shadow-[0_20px_46px_rgba(15,23,42,0.5)] ring-1 ring-white/10 sm:w-[380px] md:top-28 z-50"
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
              <div class="mt-2 flex w-full flex-wrap items-center justify-center gap-2">
                <label class="flex items-center gap-2 rounded-full bg-blue-800 px-4 py-1.5 text-xs font-semibold">
                  <select
                    v-model="selectedGender"
                    class="bg-transparent text-xs font-semibold text-white outline-none"
                    aria-label="Select gender"
                  >
                    <option value="" selected disabled>Select Gender</option>
                    <option class="text-slate-900" value="female">Female</option>
                    <option class="text-slate-900" value="male">Male</option>
                    <option class="text-slate-900" value="couple">Couple</option>
                  </select>
                </label>
                <label class="flex  flex-1 items-center gap-2 rounded-full bg-blue-800 px-4 py-1.5 text-xs font-semibold">
                  <select
                    v-model="selectedCategory"
                    class="w-full bg-transparent text-xs font-semibold text-white outline-none"
                    :disabled="categoryOptions.length === 0"
                    aria-label="Select category"
                  >
                    <option value="" selected disabled>Select Category</option>
                    <option
                      v-for="category in categoryOptions"
                      :key="category"
                      class="text-slate-900"
                      :value="category"
                    >
                      {{ category }}
                    </option>
                  </select>
                </label>
              </div>

              <!-- Division Matchup Result -->
              <div class="flex w-full flex-col gap-0">
                <div class="flex items-center gap-0 rounded-2 bg-blue-900/90 px-9 py-2 text-sm font-semibold">
                  <span class="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/10">
                    <img
                      src="/images/deped-logo.png"
                      alt="Lapu-Lapu City Division"
                      class="h-full w-full object-cover"
                    />
                  </span>
                  <span class="flex-1 text-center">Lapu-Lapu City Division</span>
                  <!-- <span class="text-[10px]">▼</span> -->
                </div>
                <div class="rounded-2 bg-orange-700/90 px-4 py-1 text-center text-[11px] font-semibold tracking-[0.2em]">
                  <select
                    class="w-full bg-transparent text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white outline-none"
                    aria-label="Select result for Lapu-Lapu City Division"
                    :value="resultHome"
                    @change="setMatchResult('home', $event.target.value)"
                  >
                    <option value="" selected disabled>Select</option>
                    <option class="text-slate-900" value="win">WIN</option>
                    <option class="text-slate-900" value="lose">LOSE</option>
                  </select>
                </div>
                <div class="my-3 text-center text-2xl font-semibold">VS.</div>
                <div class="flex items-center gap-0 rounded-2 bg-blue-900/90 px-9 py-2 text-sm font-semibold">
                  <span class="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/100">
                    <img
                      :src="getDivisionLogo(selectedAwayDivision)"
                      :alt="selectedAwayDivision"
                      class="h-full w-full object-cover"
                    />
                  </span>
                  <select
                    v-model="selectedAwayDivision"
                    class="flex-1 bg-transparent text-center text-sm font-semibold text-white outline-none"
                    aria-label="Select away division"
                  >
                    <option value="" selected disabled>Select Division</option>
                    <option
                      v-for="division in divisions"
                      :key="division.name"
                      class="text-slate-900"
                      :value="division.name"
                    >
                      {{ division.name }}
                    </option>
                  </select>
                </div>
                <div class="rounded-2 bg-orange-700/90 px-4 py-1 text-center text-[11px] font-semibold tracking-[0.2em]">
                  <select
                    class="w-full bg-transparent text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white outline-none"
                    aria-label="Select result for Bogo City Division"
                    :value="resultAway"
                    @change="setMatchResult('away', $event.target.value)"
                  >
                    <option value="" selected disabled>Select</option>
                    <option class="text-slate-900" value="win">WIN</option>
                    <option class="text-slate-900" value="lose">LOSE</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                class="mt-2 rounded-2 bg-blue-800 px-7 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="isSubmitting"
                @click="handleSubmit"
              >
                {{ isSubmitting ? 'SAVING...' : 'SUBMIT' }}
              </button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  </div>
</template>