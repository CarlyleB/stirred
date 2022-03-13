import {
    Autocomplete,
    Avatar,
    Box,
    TextField,
} from '@mui/material';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchIngredients } from '../store/slices/ingredients';

interface IIngredientListProps {
    onChange: (vals: Array<string>) => void;
}

export const IngredientList: React.FC<IIngredientListProps> = ({onChange}) => {
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector((state: any) => [...state.ingredients.list]);

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <div>
            <Autocomplete
                id="tags-outlined"
                multiple
                options={ingredients.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1)}
                getOptionLabel={(option) => option.name}
                groupBy={(option) => option.name.charAt(0)}
                autoHighlight={true}
                onChange={(_event, vals: Array<string>) => {
                    console.log(vals)
                    onChange(vals)
                }}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <Avatar src={option.thumbnailurl} />
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        variant='standard'
                        placeholder="Filter by ingredients"
                    />
                )}
            />
        </div>
    );
};
