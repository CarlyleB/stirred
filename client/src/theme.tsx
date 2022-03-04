import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({

    components: {
        MuiAutocomplete: {
            styleOverrides: {

                inputRoot: {
                    ':before': {
                        borderColor: 'rgba(255, 255, 255, 0.15)',
                    },
                    ':hover:before': {
                        borderColor: 'rgba(255, 255, 255, 0.3)!important'
                    },
                    color: '#fff'
                },
                popupIndicator: {
                    color: '#fff'
                },
                clearIndicator: {
                    color: '#fff'
                }
            }
        }
    }
});

export { baseTheme };
