<template>
  <div class="leagues-container">
    <div class="results-card">
      <div class="title-row">
        <h2 class="results-title">Match Results</h2>
        <button 
          v-if="hasActiveFilters" 
          @click="clearFilters" 
          class="clear-all-text"
        >
          Clear All
        </button>
      </div>
      
      <!-- Filters in one row -->
      <div class="filters-row">
        <div class="filter-group">
          <input 
            v-model="filters.date" 
            type="date" 
            class="filter-input"
            placeholder="mm/dd/yy"
          />
        </div>

        <div class="filter-group">
          <select v-model="filters.sport" class="filter-select">
            <option value="">All Sports</option>
            <option value="Special Games">Special Games</option>
            <option value="Archery">Archery</option>
            <option value="Arnis">Arnis</option>
            <option value="Athletics">Athletics</option>
            <option value="Badminton">Badminton</option>
            <option value="Baseball">Baseball</option>
            <option value="Basketball">Basketball</option>
            <option value="Billiard">Billiard</option>
            <option value="Chess">Chess</option>
            <option value="Boxing">Boxing</option>
            <option value="Dance Sport">Dance Sport</option>
            <option value="Football">Football</option>
            <option value="Gymnastic">Gymnastic</option>
            <option value="Swimming">Swimming</option>
            <option value="Sepak Takraw">Sepak Takraw</option>
            <option value="Softball">Softball</option>
            <option value="Tennis">Tennis</option>
            <option value="Table Tennis">Table Tennis</option>
            <option value="Taekwondo">Taekwondo</option>
            <option value="Volleyball">Volleyball</option>
          </select>
        </div>

        <div class="filter-group">
          <select v-model="filters.level" class="filter-select">
            <option value="">All Level</option>
            <option value="elementary">Elementary</option>
            <option value="secondary">Secondary</option>
          </select>
        </div>

        <div class="filter-group">
          <select v-model="filters.gender" class="filter-select">
            <option value="">All Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="couple">Couple</option>
          </select>
        </div>

        <div class="filter-group">
          <select v-model="filters.sortBy" class="filter-select">
            <option value="sort-by">Sort by</option>
            <option value="division-az">Division (A-Z)</option>
            <option value="division-za">Division (Z-A)</option>
          </select>
        </div>
      </div>
      
      <div class="results-scroll-container">
        <div v-if="loading" class="no-results">
          Loading matches...
        </div>

        <div v-else-if="error" class="no-results error">
          {{ error }}
        </div>

        <div v-else-if="filteredMatches.length === 0" class="no-results">
          No matches found
        </div>

        <div v-else class="matches-list">
          <div 
            v-for="match in filteredMatches" 
            :key="match.sport_id" 
            class="match-card"
            :class="match.result.toLowerCase()"
          >
            <div class="match-content">
              <div class="left-section">
                <span class="result-badge" :class="match.result.toLowerCase()">
                  {{ match.result.toUpperCase() }}
                </span>
                <span class="match-date">{{ formatDate(match.created_at) }}</span>
              </div>

              <div class="center-section">
                <div class="team-container">
                  <img 
                    :src="getDivisionLogo(match.home_division)" 
                    :alt="match.home_division"
                    class="division-logo"
                  />
                  <div class="team-name left">{{ match.home_division }}</div>
                </div>
                
                <div class="match-info">
                  <div class="sport-name">{{ match.sport_name }}</div>
                  <div class="sport-detail">{{ match.sport_category }}</div>
                  <span class="vs-text">VS</span>
                </div>

                <div class="team-container">
                  <div class="team-name right">{{ match.against_division }}</div>
                  <img 
                    :src="getDivisionLogo(match.against_division)" 
                    :alt="match.against_division"
                    class="division-logo"
                  />
                </div>
              </div>
            </div>

            <div class="match-footer">
              <span class="badge badge-level">{{ match.sport_level }}</span>
              <span class="badge badge-sport">{{ match.sport_gender }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const filters = ref({
  date: '',
  sport: '',
  level: '',
  gender: '',
  sortBy: 'sort-by'
})

const matches = ref([])
const loading = ref(false)
const error = ref('')

// Division logo mapping
const divisionLogos = {
  'Lapu-Lapu City Division': '/images/deped-logo.png',
  'Bogo City Division': '/images/bogo_logo.png',
  'Bohol Division': '/images/bohol_logo.png',
  'Carcar City Division': '/images/carcar_logo.png',
  'Cebu City Division': '/images/cebucity_logo.png',
  'Cebu Province Division': '/images/cebuprovince_logo.png',
  'Danao City Division': '/images/danao_logo.png',
  'Mandaue City Division': '/images/mandaue_logo.png',
  'City of Naga Division': '/images/nagacity_logo.png',
  'Tagbilaran City Division':'/images/tagbilaran_logo.png',
  'Talisay City Division': '/images/talisay_logo.png',
  'Toledo City Division': '/images/toledo_logo.png',
  // Add more divisions as needed
}

// Get division logo
const getDivisionLogo = (divisionName) => {
  return divisionLogos[divisionName] || '/images/default.png'
}

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return filters.value.date !== '' || 
         filters.value.sport !== '' || 
         filters.value.level !== '' || 
         filters.value.gender !== ''
})

// Clear all filters
const clearFilters = () => {
  filters.value = {
    date: '',
    sport: '',
    level: '',
    gender: '',
    sortBy: 'sort-by'
  }
}

// Fetch matches from API
const fetchMatches = async () => {
  loading.value = true
  error.value = ''
  
  try {
    console.log('Fetching matches from API...')
    const response = await fetch('/api/sports-results')
    
    if (!response.ok) {
      throw new Error('Failed to fetch matches')
    }
    
    const data = await response.json()
    console.log('Fetched data:', data)
    
    // Transform data to include result field
    matches.value = data.map(match => ({
      ...match,
      result: match.home_result === 1 ? 'Win' : 'Loss'
    }))
  } catch (err) {
    error.value = err.message || 'Failed to load matches'
    console.error('Error fetching matches:', err)
  } finally {
    loading.value = false
  }
}

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  })
}

const filteredMatches = computed(() => {
  let result = [...matches.value]

  if (filters.value.date) {
    result = result.filter(m => {
      if (!m.created_at) return false
      
      // Convert database timestamp to local date string (YYYY-MM-DD)
      const matchDate = new Date(m.created_at)
      const year = matchDate.getFullYear()
      const month = String(matchDate.getMonth() + 1).padStart(2, '0')
      const day = String(matchDate.getDate()).padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`
      
      console.log('Comparing:', formattedDate, 'with', filters.value.date)
      return formattedDate === filters.value.date
    })
  }

  if (filters.value.sport) {
    result = result.filter(m => 
      m.sport_name === filters.value.sport
    )
  }

  if (filters.value.level) {
    result = result.filter(m => 
      m.sport_level && m.sport_level.toLowerCase() === filters.value.level.toLowerCase()
    )
  }

  if (filters.value.gender) {
    result = result.filter(m => 
      m.sport_gender && m.sport_gender.toLowerCase() === filters.value.gender.toLowerCase()
    )
  }

  // Sorting
  if (filters.value.sortBy === 'newest-first') {
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } else if (filters.value.sortBy === 'division-az') {
    result.sort((a, b) => (a.against_division || '').localeCompare(b.against_division || ''))
  } else if (filters.value.sortBy === 'division-za') {
    result.sort((a, b) => (b.against_division || '').localeCompare(a.against_division || ''))
  }

  console.log('Filtered matches count:', result.length)
  return result
})

// Fetch matches on component mount
onMounted(() => {
  fetchMatches()
})
</script>

<style scoped>
.leagues-container {
  height: calc(100vh - 7rem);
  overflow: hidden;
  padding: 0 20px 30px;
}

.results-card {
  background: white;
  padding: 35px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  max-width: 1400px;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 9rem);
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  flex-shrink: 0;
}

.results-title {
  font-size: 25px;
  color: #1f2937;
  font-weight: 700;
  margin: 0;
}

.clear-all-text {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  transition: color 0.2s;
}

.clear-all-text:hover {
  color: #dc2626;
}

.filters-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-bottom: 25px;
  flex-shrink: 0;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-input,
.filter-select {
  padding: 12px 16px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.3s;
  color: #374151;
  height: 46px;
}

.filter-input::placeholder {
  color: #9ca3af;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 12px center;
  background-repeat: no-repeat;
  background-size: 18px;
  padding-right: 40px;
}

.results-scroll-container {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  padding-right: 10px;
}

/* Custom scrollbar for results */
.results-scroll-container::-webkit-scrollbar {
  width: 8px;
}

.results-scroll-container::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 4px;
}

.results-scroll-container::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 4px;
}

.results-scroll-container::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.no-results {
  text-align: center;
  padding: 60px;
  color: #9ca3af;
  font-size: 16px;
}

.error {
  color: #ef4444;
}

.matches-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.match-card {
  padding: 0;
  border-radius: 10px;
  border-left: 6px solid;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  flex-shrink: 0;
}

.match-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateX(3px);
}

.match-card.win {
  background: linear-gradient(to right, #d1f4e0 0%, #ecfdf5 100%);
  border-left-color: #10b981;
}

.match-card.loss {
  background: linear-gradient(to right, #fecdd3 0%, #fef2f2 100%);
  border-left-color: #ef4444;
}

.match-content {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 25px;
  align-items: center;
  padding: 22px 28px;
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.result-badge {
  padding: 6px 18px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.5px;
}

.result-badge.win {
  background: #10b981;
  color: white;
}

.result-badge.loss {
  background: #ef4444;
  color: white;
}

.match-date {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
}

.center-section {
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: space-between;
}

.team-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.division-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.team-name {
  font-weight: 600;
  font-size: 17px;
  color: #1f2937;
  min-width: 150px;
}

.team-name.right {
  text-align: right;
}

.match-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.sport-name {
  font-weight: 600;
  font-size: 16px;
  color: #374151;
}

.sport-detail {
  font-size: 13px;
  color: #6b7280;
}

.vs-text {
  font-weight: 800;
  color: #9ca3af;
  font-size: 18px;
  letter-spacing: 1px;
  margin-top: 4px;
}

.match-footer {
  display: flex;
  gap: 12px;
  padding: 15px 28px;
  background: rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.badge {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.badge-level {
  background: #dbeafe;
  color: #1e40af;
}

.badge-sport {
  background: #e9d5ff;
  color: #7c3aed;
}

@media (max-width: 1400px) {
  .filters-row {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
}

@media (max-width: 1200px) {
  .match-content {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .center-section {
    flex-direction: column;
    gap: 15px;
  }

  .team-name.right {
    text-align: left;
  }
}

@media (max-width: 900px) {
  .filters-row {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .division-logo {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 600px) {
  .filters-row {
    grid-template-columns: 1fr;
  }
  
  .team-name {
    font-size: 15px;
    min-width: 100px;
  }
}
</style>