require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const apiKey = process.env.API_KEY;

app.use(cors({
    origin: 'http://localhost:8080'
}));

const baseUrl = `https://www.thecocktaildb.com/api/json/v2/${apiKey}`;

const submitRequest = (res, url) => {
    axios.get(url)
        .then(response => res.send(response.data))
        .catch(err => console.log(err));
};

const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
};
  
app.get('/cocktails', (req, res) => {
    if (req.query.ingredients) {
        const url = `${baseUrl}/filter.php?i=${req.query.ingredients}`;
        axios.get(url)
        .then((response) => {
            const cocktails = response.data.drinks.map((a) => {
                return {
                    id: a.idDrink,
                    name: capitalizeFirstLetter(a.strDrink),
                    thumbnailUrl: a.strDrinkThumb
                };
            });
            res.send(cocktails);
        })
        .catch(err => console.log(err));
    } else {
        res.send([]); // thecocktaildb doesn't have an endpoint for listing all cocktails
    }
});

app.get('/cocktails/:cocktail', (req, res) => {
    const url = `${baseUrl}/search.php?s=${req.params.cocktail}`;
    axios.get(url)
        .then((response) => {
            const ingredientKeyPrefix = 'strIngredient';
            const measurementKeyPrefix = 'strMeasure';
            const maxIngredients = 15;
            const getIngredients = (a) => {
                const ingredients = [];
                for (let i = 0; i < maxIngredients; i++) {
                    ingredients.push({
                        name: a[ingredientKeyPrefix + i],
                        meaurement: a[measurementKeyPrefix + i]
                    });
                }
            };
            const cocktails = response.data.drinks.map((a) => {
                return {
                    id: a.idDrink,
                    name: a.strDrink,
                    tags: a.strTags ? a.strTags.split() : [],
                    videoUrl: a.strVideo,
                    category: a.strCategory,
                    alcoholic: a.strAlcoholic,
                    glass: a.strGlass,
                    instructions: a.strInstructions,
                    thumbnailUrl: a.strDrinkThumb,
                    ingredients: getIngredients(a),
                    imageSrc: a.strImageSource,
                    imgAttribution: a.strImageAttribution,
                    ccConfirmed: a.strCreativeCommonsConfirmed === 'Yes' ? true : false,
                    dateModified: a.dateModified
                }
            });
            res.send(cocktails);
        })
        .catch(err => console.log(err));
});

// List ingredients:                    /list.php?i=list
app.get('/ingredients', (req, res) => {
    const url = `${baseUrl}/list.php?i=list`;
    axios.get(url)
        .then((response) => {
            const ingredients = response.data.drinks.map((a) => (capitalizeFirstLetter(a.strIngredient1)));
            res.send(ingredients);
        })
        .catch(err => console.log(err));
});

app.get('/ingredients/:ingredient', (req, res) => {
    const url = `${baseUrl}/search.php?s=${req.params.ingredient}`;
    submitRequest(res, url);
});

// List categories:                     /list.php?c=list
app.get('/categories', (req, res) => {
    const url = `${baseUrl}/list.php?c=list`;
    axios.get(url)
        .then(response => res.send(response.data))
        .catch(err => console.log(err));
});

// List glasses:                        /list.php?g=list
app.get('/glasses', (req, res) => {
    const url = `${baseUrl}/list.php?g=list`;
    submitRequest(res, url);
});

// List alcoholic filters:              /list.php?a=list
app.get('/types', (req, res) => {
    const url = `${baseUrl}/list.php?a=list`;
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

app.listen(3001);
console.log('Listening on 3001');
