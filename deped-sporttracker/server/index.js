const express = require('express')
const mysql = require('mysql2/promise')

require('dotenv').config()

const app = express()

app.use(express.json())

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sportstracker',
  connectionLimit: 10,
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

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
      `
      INSERT INTO sports_results
        (sport_name, sport_level, sport_category, sport_gender, home_division, against_division, home_result, against_result)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?)
      `,
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

    return res.status(201).json({ id: result.insertId })
  } catch (error) {
    return res.status(500).send(error.message || 'Database error.')
  }
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
