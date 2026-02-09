<template>
    <div class="leagues-container">
      <!-- Filters Section - Fixed -->
      <div class="filters-card">
        <div class="filters-grid">
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
              <option value="athletics-seated-shot-put">Special Games</option>
              <option value="athletics-long-jump">Archery</option>
              <option value="athletics-high-jump">Arnis</option>
              <option value="swimming-50-back-stroke">Athletics</option>
              <option value="swimming-50-breast-stroke">Badminton</option>
              <option value="swimming-50-freestyle">Baseball</option>
              <option value="swimming-50-butterfly">Basketball</option>
              <option value="swimming-50-butterfly">Billiard</option>
              <option value="swimming-50-butterfly">Chess</option>
              <option value="swimming-50-butterfly">Boxing</option>
              <option value="swimming-50-butterfly">Dance Sport</option>
              <option value="swimming-50-butterfly">Football</option>
              <option value="swimming-50-butterfly">Gymnastic</option>
              <option value="swimming-50-butterfly">Swimming</option>
              <option value="swimming-50-butterfly">Sipak Takraw</option>
              <option value="swimming-50-butterfly">Softball</option>
              <option value="swimming-50-butterfly">Tennis</option>
              <option value="swimming-50-butterfly">Table Tennis</option>
              <option value="swimming-50-butterfly">Taekwondo</option>
              <option value="swimming-50-butterfly">Volleyball</option>
            </select>
          </div>
  
          <div class="filter-group">
            <select v-model="filters.category" class="filter-select">
              <option value="">All Category</option>
              <option value="elementary">Elementary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
            </select>
          </div>
  
          <div class="filter-group">
            <select v-model="filters.level" class="filter-select">
              <option value="">All Levels</option>
              <option value="elementary">Elementary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
            </select>
          </div>
  
          <div class="filter-group">
            <select v-model="filters.sortBy" class="filter-select">
              <option value="date">Sort by Date</option>
              <option value="division-az">Division (A-Z)</option>
              <option value="division-za">Division (Z-A)</option>
              <option value="sport">Sort by Sport</option>
            </select>
          </div>
        </div>
      </div>
  
      <!-- Match Results Section - Scrollable -->
      <div class="results-card">
        <h2 class="results-title">Match Results</h2>
        
        <div class="results-scroll-container">
          <div v-if="filteredMatches.length === 0" class="no-results">
            No matches found
          </div>
  
          <div v-else class="matches-list">
            <div 
              v-for="match in filteredMatches" 
              :key="match.id" 
              class="match-card"
              :class="match.result.toLowerCase()"
            >
              <div class="match-content">
                <div class="left-section">
                  <span class="result-badge" :class="match.result.toLowerCase()">
                    {{ match.result.toUpperCase() }}
                  </span>
                  <span class="match-date">{{ match.date }}</span>
                </div>
  
                <div class="center-section">
                  <div class="team-name left">{{ match.team1 }}</div>
                  <div class="match-info">
                    <div class="sport-name">{{ match.sport }}</div>
                    <div class="sport-detail">{{ match.detail }}</div>
                  </div>
                </div>
  
                <div class="right-section">
                  <span class="vs-text">VS</span>
                  <div class="team-name right">{{ match.team2 }}</div>
                </div>
              </div>
  
              <div class="match-footer">
                <span class="badge badge-category">{{ match.category }}</span>
                <span class="badge badge-sport">{{ match.sportType }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const filters = ref({
    date: '',
    sport: '',
    category: '',
    level: '',
    sortBy: 'date'
  })
  
  // Sample match data
  const matches = ref([
    {
      id: 1,
      result: 'Win',
      date: '2025-02-05',
      team1: 'Archery',
      team2: 'Cebu City Division',
      sport: '15-meter distance',
      detail: '15-meter distance',
      category: 'Elementary',
      sportType: 'MVB'
    },
    {
      id: 2,
      result: 'Loss',
      date: '2025-02-04',
      team1: 'Basketball Team A',
      team2: 'Basketball Team B',
      sport: 'Full Court',
      detail: 'Championship Round',
      category: 'Secondary',
      sportType: 'Basketball'
    },
    {
      id: 3,
      result: 'Win',
      date: '2025-02-03',
      team1: 'Volleyball Squad',
      team2: 'City Champions',
      sport: 'Indoor Volleyball',
      detail: 'Finals Match',
      category: 'Tertiary',
      sportType: 'Volleyball'
    },
    {
      id: 4,
      result: 'Win',
      date: '2025-02-02',
      team1: 'Swimming Team',
      team2: 'Water Dragons',
      sport: '50m Freestyle',
      detail: 'Qualifying Round',
      category: 'Elementary',
      sportType: 'Swimming'
    },
    {
      id: 5,
      result: 'Loss',
      date: '2025-02-01',
      team1: 'Tennis Squad A',
      team2: 'Tennis Squad B',
      sport: 'Singles Match',
      detail: 'Semi-Finals',
      category: 'Tertiary',
      sportType: 'Tennis'
    }
  ])
  
  const filteredMatches = computed(() => {
    let result = [...matches.value]
  
    if (filters.value.date) {
      result = result.filter(m => m.date === filters.value.date)
    }
  
    if (filters.value.sport) {
      result = result.filter(m => 
        m.sport.toLowerCase().includes(filters.value.sport.toLowerCase())
      )
    }
  
    if (filters.value.category) {
      result = result.filter(m => 
        m.category.toLowerCase() === filters.value.category.toLowerCase()
      )
    }
  
    if (filters.value.level) {
      result = result.filter(m => 
        m.category.toLowerCase() === filters.value.level.toLowerCase()
      )
    }
  
    // Sorting
    if (filters.value.sortBy === 'date') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (filters.value.sortBy === 'division-az') {
      result.sort((a, b) => a.team2.localeCompare(b.team2))
    } else if (filters.value.sortBy === 'division-za') {
      result.sort((a, b) => b.team2.localeCompare(a.team2))
    }
  
    return result
  })
  </script>
  
  <style scoped>
  .leagues-container {
    height: calc(100vh - 7rem); /* Subtract header height (28 = 7rem) */
    overflow-y: auto;
    padding: 0 20px 30px;
  }
  
  /* Custom scrollbar for the main container */
  .leagues-container::-webkit-scrollbar {
    width: 8px;
  }
  
  .leagues-container::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  
  .leagues-container::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  .leagues-container::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  
  .filters-card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    max-width: 1400px;
    margin: 25px auto;
  }
  
  .filters-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .filter-group {
    display: flex;
    flex-direction: column;
  }
  
  .filter-input,
  .filter-select {
    padding: 14px 18px;
    border: 2px solid #d1d5db;
    border-radius: 8px;
    font-size: 15px;
    background: white;
    transition: all 0.3s;
    color: #374151;
    height: 50px;
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
    background-size: 20px;
    padding-right: 40px;
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
    max-height: calc(100vh - 350px); /* Adjust based on filter card height */
  }
  
  .results-title {
    font-size: 28px;
    margin-bottom: 25px;
    color: #1f2937;
    font-weight: 700;
    flex-shrink: 0;
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
    grid-template-columns: auto 1fr auto;
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
    gap: 4px;
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
  
  .right-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }
  
  .vs-text {
    font-weight: 800;
    color: #9ca3af;
    font-size: 20px;
    letter-spacing: 1px;
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
  
  .badge-category {
    background: #dbeafe;
    color: #1e40af;
  }
  
  .badge-sport {
    background: #e9d5ff;
    color: #7c3aed;
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
  
    .right-section {
      align-items: flex-start;
    }
  }
  </style>