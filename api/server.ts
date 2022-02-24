require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const apiKey = process.env.API_KEY;

app.use(cors());

const baseUrl = `https://www.thecocktaildb.com/api/json/v2/${apiKey}`;

const submitRequest = (res, url) => {
    axios.get(url)
        .then(response => res.send(response.data))
        .catch(err => console.log(err));
};

// Search cocktail by name:             /search.php?s=margarita
// List all cocktails by first letter:  /search.php?f=a
// Search ingredient by name:           /search.php?i=vodka
app.get('/search', (req, res) => {
    let queryKey, queryVal;
    if (req.query.cocktail) {
        queryKey = 's';
        queryVal = req.query.cocktail;
    } else if (req.query.ingredient) {
        queryKey = 'i';
        queryVal = req.query.ingredient;
    } else if (req.query.letter) {
        queryKey = 'f';
        queryVal = req.query.letter;
    }
    const url = `${baseUrl}/search.php?${queryKey}=${queryVal}`; 
    submitRequest(res, url);
});

// Lookup full cocktail details by id:  /lookup.php?i=11007
// Lookup ingredient by ID:             /lookup.php?iid=552
app.get('/lookup', (req, res) => {
    let queryKey, queryVal;
    if (req.query.cocktailId) {
        queryKey = 'i';
        queryVal = req.query.cocktailId;
    } else if (req.query.ingredientId) {
        queryKey = 'iid';
        queryVal = req.query.ingredientId;
    }
    const url = `${baseUrl}/lookup.php?${queryKey}=${queryVal}`
    submitRequest(res, url);
});

// Lookup a random cocktail:            /random.php
app.get('/random', (req, res) => {
    const url = `${baseUrl}/random.php`;
    submitRequest(res, url);
});

// Lookup 10 random cocktails:          /randomselection.php
app.get('/randomselection', (req, res) => {
    const url = `${baseUrl}/randomselection.php`;
    submitRequest(res, url);
});

// List Popular cocktails:              /popular.php
app.get('/popular', (req, res) => {
    const url = `${baseUrl}/popular.php`;
    submitRequest(res, url);
});

// List latest cocktails:               /latest.php
app.get('/latest', (req, res) => {
    const url = `${baseUrl}/latest.php`;
    submitRequest(res, url);
});

// Search by ingredient:                /filter.php?i=Gin
// Filter by multi-ingredient:          /filter.php?i=Dry_Vermouth,Gin,Anis
// Filter by alcoholic:                 /filter.php?a=Alcoholic
// Filter by Category:                  /filter.php?c=Ordinary_Drink
// Filter by Glass                      /filter.php?g=Cocktail_glass
app.get('/filter', (req, res) => {
    let queryKey, queryVal;
    if (req.query.ingredient) {
        queryKey = 'i';
        queryVal = req.query.ingredient;
    } else if (req.query.alcoholic) {
        queryKey = 'a';
        queryVal = req.query.alcoholic;
    } else if (req.query.category) {
        queryKey = 'c';
        queryVal = req.query.category;
    } else if (req.query.glass) {
        queryKey = 'g';
        queryVal = req.query.glass;
    }
    const url = `${baseUrl}/filter.php?${queryKey}=${queryVal}`;
    submitRequest(res, url);
});

// List categories:                     /list.php?c=list
app.get('/list/categories', (req, res) => {
    const url = `${baseUrl}/list.php?c=list`;
    axios.get(url)
        .then(response => res.send(response.data))
        .catch(err => console.log(err));
});

// List glasses:                        /list.php?g=list
app.get('/list/glasses', (req, res) => {
    const url = `${baseUrl}/list.php?g=list`;
    submitRequest(res, url);
});

// List alcoholic filters:              /list.php?a=list
app.get('/list/alcoholic', (req, res) => {
    const url = `${baseUrl}/list.php?a=list`;
    submitRequest(res, url);
});

// List ingredients:                    /list.php?i=list
app.get('/list/ingredients', (req, res) => {
    const url = `${baseUrl}/list.php?i=list`;
    submitRequest(res, url);
});

app.listen(3001);
console.log('Listening on 3001');
