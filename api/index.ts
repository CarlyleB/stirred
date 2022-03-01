require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors({
    origin: '*'
}))

app.use(express.json())
app.use(express.urlencoded())

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

const Pool = require('pg').Pool
const pool = new Pool()

const getDrinks = (req, res) => {
    const sql = req.query.ingredients
        ? `SELECT d.*,r FROM drinks d CROSS JOIN LATERAL json_array_elements (recipe::json) AS r where r->>\'ingredient\' =\'${req.query.ingredients}\';`
        : 'SELECT * FROM drinks ORDER BY name ASC';
    pool.query(sql, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows.map((drink) => {
            drink.recipe = JSON.parse(drink.recipe)
            return drink
        }))
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

const getDrinksByIngredient = (req, res) => {
    pool.query(`SELECT d.*,r FROM drinks d CROSS JOIN LATERAL json_array_elements (recipe::json) AS r where r->>\'ingredient\' =\'${req.query.ingredient}\';`, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

app.get('/drinks', getDrinks);

app.get('/ingredients', getIngredients);

app.get('/glasses', getGlasses);

app.get('/categories', getCategories);
