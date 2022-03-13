import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
    palette: {
        primary: {
            main: '#E57538',
            contrastText: '#fff'
        },
        text: {
            primary: '#6C6465'
        },
    },
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
