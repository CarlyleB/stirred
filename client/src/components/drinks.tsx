import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Grid,
    Stack,
    Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { loadCocktails } from '../store';

const StyledCard = styled(Card)({
    borderRadius: '15px'
});

const StyledCardHeader = styled(CardHeader)({
    padding: '0px',
    paddingTop: '10px',
    textAlign: 'center',
    fontSize: '1.1rem'
});

const StyledCardMedia = styled(CardMedia)({
    border: '0.25px #d1c9ca solid',
    borderTopRightRadius: '15px',
    borderTopLeftRadius: '15px',
    boxSizing: 'border-box',
    objectFit: 'cover'
}) as typeof CardMedia;

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
        <Box sx={{ height: '100%' }}>
            {loadingDrinks && <Stack sx={{ height: '100%', alignItems: 'center', marginTop: '20%' }}>
                <CircularProgress disableShrink />
            </Stack>}
            {!loadingDrinks && !!ingredients.length && !drinks.length && <div>'No results'</div>}
            {!!drinks.length && !loadingDrinks && <Box sx={{ flexGrow: 1, marginLeft: '20px', marginRight: '20px' }}>
                <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                    spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {drinks.map((drink: any) => (
                        <Grid item xs={2} sm={4} md={2} key={drink.id}>
                            <StyledCard>
                                <StyledCardMedia
                                    component="img"
                                    image={drink.thumbnailurl}
                                    alt={drink.name}
                                />
                                <StyledCardHeader
                                    title={drink.name}
                                    subheader=""
                                    sx={{ fontSize: '1.2rem' }}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {drink.recipe.map((item: any, idx: number) => <div key={idx}>{item.ingredient}</div>)}
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>}
        </Box>
    );
};
