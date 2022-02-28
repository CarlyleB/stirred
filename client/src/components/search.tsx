import { useState } from 'react';

import { DrinkList } from './drinks';
import { IngredientList } from './ingredients';

interface ISearchState {
    selectedIngredients: Array<string>;
}

export const Search: React.FC = () => {

    const [state, setState] = useState<ISearchState>({
        selectedIngredients: []
    });

    return (
        <div>
            <IngredientList
                onChange={(vals: Array<string>) => setState({
                    ...state,
                    selectedIngredients: vals.map((a: any) => a.name)
                })}
            />
            <DrinkList ingredients={state.selectedIngredients}></DrinkList>
        </div>
    );
};
