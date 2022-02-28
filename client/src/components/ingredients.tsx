import { Autocomplete, Avatar, Box, TextField } from '@mui/material';
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
                options={ingredients.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)}
                getOptionLabel={(option) => option.name}
                groupBy={(option) => option.name.charAt(0)}
                onChange={(_event, vals: Array<string>) => onChange(vals)}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <Avatar
                        src={option.thumbnailUrl}
                      />
                      {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Ingredients"
                    />
                )}
            />
        </div>
    );
};
