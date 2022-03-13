import { Box } from '@mui/material';

import { IngredientList } from './ingredients';

interface ISidebarProps {
    onIngredientsChange: (igredients: Array<any>) => void;
}

export const Sidebar: React.FC<ISidebarProps> = ({ onIngredientsChange }) => {

    return (
        <Box sx={{ height: '100%', width: '10%' }}>
            <IngredientList onChange={onIngredientsChange} />
        </Box>
    );
};
