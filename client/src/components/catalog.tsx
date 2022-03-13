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
import { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchDrinks } from '../store';
import { DrinkList } from './drinks';
import { Sidebar } from './sidebar';

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

interface ICatalogProps {}

interface ICatalogState {
    selectedIngredients: Array<any>;
}

export const Catalog: FC<ICatalogProps> = () => {
    const ingredients = useAppSelector((state: any) => [...state.ingredients.list]);

    const [state, setState] = useState<ICatalogState>({
        selectedIngredients: []
    });

    const setSelectedIngredients = (ingredients: Array<any>) => {
        setState({
            ...state,
            selectedIngredients: ingredients.map((a: any) => a.name)
        });
    }

    return (
        <Grid
            container
            direction="row"
            spacing={{ xs: 2, md: 3 }} columns={{ xs: 6, sm: 8, md: 12 }}
        >
            <Grid item xs={1} sm={2} md={3}>
                <Box sx={{ height: 20 }}></Box>
                <Sidebar onIngredientsChange={setSelectedIngredients} />
            </Grid>
            <Grid item xs={5} sm={6} md={9}>
                <Box sx={{ height: 20 }}></Box>
                <Box sx={{ height: '100%' }}>
                    <DrinkList ingredients={ingredients}></DrinkList>
                </Box>
            </Grid>
        </Grid>
    );
};
