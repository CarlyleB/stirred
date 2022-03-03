require('dotenv').config();
const cors = require('cors');

import express from 'express';
import { Request, Response } from 'express';
import { Pool, QueryResult } from 'pg';

const app = express();

const { PORT = 3000 } = process.env;
const allowedOrigins: Array<string> = ['http://localhost:8080'];

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

app.use(cors({ origin: allowedOrigins }));
app.use((req, res, next) => { next(); }, cors({maxAge: 84600}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pool: Pool = new Pool();

const getDrinks = (req: Request, res: Response) => {
    const sql = req.query.ingredients
        ? `SELECT d.*,r FROM drinks d CROSS JOIN LATERAL json_array_elements (recipe::json) AS r where r->>\'ingredient\' =\'${req.query.ingredients}\';`
        : 'SELECT * FROM drinks ORDER BY name ASC';
    pool.query(sql, (error: Error, results: QueryResult) => {
        if (error) throw error
        res.status(200).json(results.rows.map((drink) => {
            drink.recipe = JSON.parse(drink.recipe)
            return drink
        }))
    })
}

const getIngredients = (_req: Request, res: Response) => {
    pool.query('SELECT * FROM ingredients ORDER BY name ASC', (error: Error, results: QueryResult) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getGlasses = (_req: Request, res: Response) => {
    pool.query('SELECT * FROM glasses ORDER BY name ASC', (error: Error, results: QueryResult) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getCategories = (_req: Request, res: Response) => {
    pool.query('SELECT * FROM categories ORDER BY name ASC', (error: Error, results: QueryResult) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

app.get('/drinks', getDrinks);

app.get('/ingredients', getIngredients);

app.get('/glasses', getGlasses);

app.get('/categories', getCategories);
