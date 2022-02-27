import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { loadIngredients } from '../store/slices/ingredients';

interface IIngredientListProps {
    onChange: (vals: Array<string>) => void;
}

export const IngredientList: React.FC<IIngredientListProps> = ({onChange}) => {
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector((state: any) => [...state.ingredients.list]);

    useEffect(() => {
        dispatch(loadIngredients());
    }, [dispatch]);

    return (
        <div>
            <Autocomplete
                multiple
                id="tags-standard"
                options={ingredients.sort()}
                getOptionLabel={(option) => option}
                groupBy={(option) => option.charAt(0)}
                onChange={(_event, vals: Array<string>) => onChange(vals)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Your ingredients"
                    />
                )}
            />
        </div>
    );
};
