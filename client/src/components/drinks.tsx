import { CircularProgress } from '@mui/material';
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@mui/material';
import { Fragment, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { loadCocktails } from '../store';

const avatarWidth: number = 120;

interface IDrinkListProps {
    ingredients: Array<string>;
}

export const DrinkList: React.FC<IDrinkListProps> = ({ingredients}) => {
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
            {!!drinks.length && <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                {drinks.map((drink: any) => (
                    <div key={drink.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar sx={{ width: avatarWidth + 20, height: avatarWidth }}>
                                <Avatar src={drink.thumbnailurl} sx={{ width: avatarWidth, height: avatarWidth }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={drink.name}
                                secondary={
                                    <Fragment>
                                        {drink.recipe.map((item: any) => <div>{item.ingredient}</div>)}
                                    </Fragment>
                                }
                            />
                        </ListItem>
                    </div>
                ))}
            </List>}
        </div>
    );
};
