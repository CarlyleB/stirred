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

const getDrinks = (_req, res) => {
    pool.query('SELECT * FROM drinks ORDER BY name ASC', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getIngredients = (_req, res) => {
    pool.query('SELECT * FROM ingredients ORDER BY name ASC', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getGlasses = (_req, res) => {
    pool.query('SELECT * FROM glasses ORDER BY name ASC', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getCategories = (_req, res) => {
    pool.query('SELECT * FROM categories ORDER BY name ASC', (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

app.get('/drinks', getDrinks);

app.get('/ingredients', getIngredients);

app.get('/glasses', getGlasses);

app.get('/categories', getCategories);
