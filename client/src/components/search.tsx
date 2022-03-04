import { Box } from '@mui/material';
import { useState } from 'react';

import { DrinkList } from './drinks';
import { PrimarySearchAppBar } from './topBar';

interface ISearchState {
    selectedIngredients: Array<string>;
}

export const Search: React.FC = () => {

    const [state, setState] = useState<ISearchState>({
        selectedIngredients: []
    });

    const setSelectedIngredients = (ingredients: Array<any>) => {
        setState({
            ...state,
            selectedIngredients: ingredients.map((a: any) => a.name)
        });
    }

    return (
        <div>
            <PrimarySearchAppBar filterByIngredients={setSelectedIngredients}></PrimarySearchAppBar>
            <Box sx={{height: 20}} />
            <DrinkList ingredients={state.selectedIngredients}></DrinkList>
        </div>
    );
};
