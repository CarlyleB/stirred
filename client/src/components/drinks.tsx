import { FC, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CircularProgress, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../hooks';
import { loadCocktails } from '../store';

import './drinks.css';

interface IDrinkListProps {
    ingredients: Array<string>;
}

export const DrinkList: FC<IDrinkListProps> = ({ingredients}) => {
    const dispatch = useAppDispatch();
    const loadingDrinks = useAppSelector((state: any) => state.cocktails.loading);
    const drinks = useAppSelector((state: any) => [...state.cocktails.list]);

    useEffect(() => {
        dispatch(loadCocktails(ingredients));
    }, [ingredients]);

    return (
        <div className='drinkListContainer'>
            {loadingDrinks && <CircularProgress />}
            {!loadingDrinks && !!ingredients.length && !drinks.length && <div>'No results'</div>}
            {!!drinks.length && <Grid container spacing={5}>
                {drinks.map((drink: any) => (
                    <Grid item xs={3} key={drink.id}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader
                                title={drink.name}
                                subheader=""
                            />
                            <CardMedia
                                component="img"
                                image={drink.thumbnailurl}
                                alt={drink.name}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {drink.recipe.map((item: any, idx: number) => <div key={idx}>{item.ingredient}</div>)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>}
        </div>
    );
};
