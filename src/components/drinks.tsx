import { useAppDispatch, useAppSelector } from '../hooks';
import { loadDrinks } from '../store/drinks';
import { useEffect } from 'react';

export const DrinkList: React.FC = () => {
    const dispatch = useAppDispatch();
    const drinks = useAppSelector((state: any) => state.list);

    useEffect(() => {
        dispatch(loadDrinks());
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
