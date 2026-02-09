<script setup>
import TabsNav from './TabsNav.vue'

const props = defineProps({
  active: {
    type: String,
    default: 'About Us',
  },
})

const emit = defineEmits(['change'])
</script>

<template>
  <div class="min-h-screen bg-[url('/images/deped.jpg')] bg-cover bg-center bg-fixed custom-scrollbar">
    <div class="min-h-screen bg-white/60">
      <div class="mx-auto w-full max-w-none px-0 pb-12 pt-0">
        <header
          class="h-24 w-full overflow-hidden bg-[url('/images/img.jpg')] bg-cover bg-center shadow-[0_18px_40px_rgba(16,16,24,0.18)] md:h-28"
        >
          <div class="flex h-full items-center bg-blue-900/70 px-6">
            <div class="flex items-center gap-4">
              <img
                src="/images/deped-logo.png"
                alt="Department of Education Lapu-Lapu Division"
                class="h-12 w-12 rounded-full border-2 border-white/80 object-cover shadow"
              />
              <div>
                <h1 class="text-2xl font-semibold text-white">Leagues</h1>
                <TabsNav :active="props.active" @change="emit('change', $event)" />
              </div>
            </div>
          </div>
        </header>

        <!-- About Us Section -->
        <div class="mx-auto max-w-7xl px-8 py-12">
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-[45%_55%] lg:gap-12">
            <!-- Left Column - Text Content -->
            <div class="space-y-8">
              <h2 class="mb-8 text-5xl font-bold text-gray-900 drop-shadow-sm tracking-tight">ABOUT US</h2>

              <!-- Vision -->
              <div class="content-card">
                <h3 class="section-title">
                  SENSE OF PURPOSE – VISION
                </h3>
                <p class="section-text">
                  DepEd Division of Lapu-Lapu City envisions to become a model entity
                  continuously manned by dynamic, innovative and value-laden educators in
                  partnership with supportive stakeholders in developing the learners' full
                  potentials, values and competencies who can excel locally, nationally, and
                  internationally.
                </p>
              </div>

              <!-- Mission -->
              <div class="content-card">
                <h3 class="section-title">
                  SENSE OF IDENTITY – MISSION
                </h3>
                <p class="section-text">
                  In realization of the vision, we commit the promotion of high standard of
                  learning through equitable, holistic, industry-based and quality education and
                  training for the learners and members of the organization. We also promote the
                  City of Lapu-Lapu as a haven for tourism and investment through culture-based
                  curriculum.
                </p>
              </div>

              <!-- Strategy -->
              <div class="content-card">
                <h3 class="section-title">
                  SENSE OF UNITY – STRATEGY
                </h3>
                <p class="section-text">
                  <span class="strategy-item">Learning Strategy • Interactive Approach</span><br />
                  <span class="strategy-item">Management Strategy • Collaborative Approach</span>
                </p>
              </div>

              <!-- Infrastructures -->
              <div class="content-card">
                <h3 class="section-title">
                  SENSE OF EMPOWERMENT – INFRASTRUCTURES
                </h3>
                <p class="section-text infrastructure-text">
                  <span class="infra-category">Behavioral Infrastructure</span> • Pupils and Students • Teachers • Officials<br />
                  <span class="infra-category">Physical Infrastructures</span> • Classrooms • Schoolgrounds • Auxiliary Amenities •
                  Libraries • Laboratories • Guidance and NDEP Centers
                </p>
              </div>
            </div>

            <!-- Right Column - Google Map -->
            <div class="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15700.302608578971!2d123.9328826!3d10.3045205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a999c55b840945%3A0xd83e861cf9caac05!2sDepEd%20SDO%20Lapu-Lapu%20City!5e0!3m2!1sen-US!2sph!4v1707525900000!5m2!1sen-US!2sph"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar Styling to match reference */
.custom-scrollbar ::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.custom-scrollbar ::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.3);
  border-radius: 3px;
}

.custom-scrollbar ::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 100, 100, 0.5);
}

/* Firefox Scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 100, 0.3) rgba(255, 255, 255, 0.05);
}

/* Section Title - Bold */
.section-title {
  font-weight: 700;
}

/* Section Text - Italic */
.section-text {
  font-style: italic;
}
</style>
