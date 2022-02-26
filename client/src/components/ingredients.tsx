import { useAppDispatch, useAppSelector } from '../hooks';
import { loadIngredients } from '../store/slices/ingredients';
import { useEffect } from 'react';

export const IngredientList: React.FC = () => {
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector((state: any) => state.ingredients.list);

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch]);

    return (
        <div>
            <h1>Ingredients</h1>
            <ul>
                {ingredients.map((ingredient: string, idx: number) => (
                    <li key={idx}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
};
