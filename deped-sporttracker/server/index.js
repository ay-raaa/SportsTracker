const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')

require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sportstracker',
  connectionLimit: 10,
})

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Database connected successfully')
    connection.release()
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message)
  })

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// GET endpoint to fetch all sports results
app.get('/api/sports-results', async (req, res) => {
  try {
    console.log('📥 Fetching sports results from database...')
    const [rows] = await pool.query(
      'SELECT * FROM sports_results ORDER BY created_at DESC'
    )
    console.log(`✅ Found ${rows.length} matches`)
    res.json(rows)
  } catch (error) {
    console.error('❌ Database error:', error)
    res.status(500).json({ error: 'Failed to fetch sports results' })
  }
})

// POST endpoint to save sports results
app.post('/api/sports-results', async (req, res) => {
  const {
    sportName,
    sportLevel,
    sportCategory,
    sportGender,
    homeDivision,
    againstDivision,
    homeResult,
    againstResult,
  } = req.body || {}

  if (
    !sportName ||
    !sportLevel ||
    !sportCategory ||
    !sportGender ||
    !homeDivision ||
    !againstDivision ||
    homeResult === undefined ||
    againstResult === undefined
  ) {
    return res.status(400).send('Missing required fields.')
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO sports_results
        (sport_name, sport_level, sport_category, sport_gender, home_division, against_division, home_result, against_result)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sportName,
        sportLevel,
        sportCategory,
        sportGender,
        homeDivision,
        againstDivision,
        Number(homeResult),
        Number(againstResult),
      ]
    )

    console.log('✅ Sports result saved with ID:', result.insertId)
    return res.status(201).json({ id: result.insertId })
  } catch (error) {
    console.error('❌ Database error:', error)
    return res.status(500).send(error.message || 'Database error.')
  }
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})