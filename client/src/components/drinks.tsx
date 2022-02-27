import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { loadCocktails } from '../store';

interface IDrinkListProps {
    ingredients: Array<string>;
}

export const DrinkList: React.FC<IDrinkListProps> = ({ingredients}) => {
    const dispatch = useAppDispatch();
    const drinks = useAppSelector((state: any) => state.cocktails.list);

    useEffect(() => {
        dispatch(loadCocktails(ingredients));
    }, [ingredients]);

    return (
        <div>
            {!!drinks.length && drinks.map((drink: any) => (
                <div key={drink.id}>{drink.name}</div>
            ))}
            {!ingredients.length && !!drinks.length && <div>'No results'</div>}
        </div>
    );
};
