require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

const Pool = require('pg').Pool
const pool = new Pool()

const getDrinks = (request, response) => {
    pool.query('SELECT * FROM drinks ORDER BY name DESC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

app.get('/drinks', getDrinks);
