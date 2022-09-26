import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        framed: true;
        confirm: true;
    }
}

declare module '@mui/material/Typography' {}

declare module '@mui/material/styles' {
    interface Theme {}

    interface TypographyVariants {}
}

const theme = createTheme({
    typography: {
        fontFamily: "'Inter',  'Apple SD Gothic Neo', Helvetica, arial, sans-serif",
        h1: {
            fontFamily: 'Quicksand',
            fontWeight: 700,
        },
        h2: {
            fontFamily: 'Quicksand',
            fontWeight: 700,
        },
        h3: {
            fontFamily: 'Quicksand',
            fontWeight: 700,
        },
        h4: {
            fontFamily: 'Quicksand',
            fontWeight: 700,
        },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#E46FA4',
        },
        secondary: {
            main: '#84A79D',
        },
        background: {
            default: '#FFF',
        },
    },
    shape: {
        borderRadius: 40,
    },
});

theme.components = {
    ...theme.components,
    MuiButton: {
        styleOverrides: {
            containedPrimary: {
                color: theme.palette.common.white,
            },
            containedSecondary: {
                color: theme.palette.common.white,
            },
        },
    },
};

export default theme;
