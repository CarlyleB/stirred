import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { loadCocktails } from '../store';

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
            {!!drinks.length && !loadingDrinks && <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {drinks.map((drink: any) => (
                        <Grid item xs={2} sm={4} md={2} key={drink.id}>
                            <Card>
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
                </Grid>
            </Box>}
        </div>
    );
};
