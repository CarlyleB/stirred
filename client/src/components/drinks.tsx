import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect } from 'react';
import { loadCocktails } from '../store';

export const DrinkList: React.FC = () => {
    const dispatch = useAppDispatch();
    const drinks = useAppSelector((state: any) => state.cocktails.list);

    useEffect(() => {
        dispatch(loadCocktails([]));
    }, [dispatch]);

    return (
        <div>
            <h1>Drinks</h1>
            <ul>
                {drinks.map((drink: any) => (
                    <li key={drink.id}>{drink.name}</li>
                ))}
            </ul>
        </div>
    );
};
