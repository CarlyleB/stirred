import { CircularProgress, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { loadCocktails } from '../store';

const thumbnailHeight: number = 128;

const boxSx = {
    display: 'flex',
    '&:firstChild > :not(style)': {
        m: 1,
        width: thumbnailHeight,
        height: thumbnailHeight,
    },
};

interface IDrinkListProps {
    ingredients: Array<string>;
}

export const DrinkList: React.FC<IDrinkListProps> = ({ingredients}) => {
    const dispatch = useAppDispatch();
    const loadingDrinks = useAppSelector((state: any) => state.cocktails.loading);
    const drinks = useAppSelector((state: any) => state.cocktails.list);

    useEffect(() => {
        dispatch(loadCocktails(ingredients));
    }, [ingredients]);

    return (
        <div>
            {loadingDrinks && <CircularProgress />}
            {!loadingDrinks && !!ingredients.length && !drinks.length && <div>'No results'</div>}
            {!!drinks.length && drinks.map((drink: any) => (
                <div key={drink.id}>
                    <Box sx={boxSx}>
                        <Paper variant="outlined">
                            <img src={drink.thumbnailUrl} height={thumbnailHeight}/>
                        </Paper>
                        <span>{drink.name}</span>
                    </Box>
                </div>
            ))}
        </div>
    );
};
