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
        fontWeightRegular: 300,
        fontFamily: "'Poppins', 'Space Mono',  'Apple SD Gothic Neo', Helvetica, arial, sans-serif",
        h1: {
            fontFamily: "'Space Mono'",
            fontSize: '3.4375rem',
            fontWeight: 700,
            lineHeight: 1.21,
        },
        h2: {
            fontFamily: "'Space Mono'",
            fontSize: '3rem',
            fontWeight: 700,
            lineHeight: 1.21,
        },
        h3: {
            fontFamily: "'Space Mono'",
            fontSize: '2.125rem',
            fontWeight: 700,
            lineHeight: '3.5rem',
        },
        h4: {
            fontFamily: "'Space Mono'",
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: '3.5rem',
        },
        button: {
            fontFamily: "'Space Mono'",
            fontSize: '1rem',
            lineHeight: 1.45,
            fontWeight: 700,
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#fff',
            dark: '#DDDEDE',
            light: '#fff',
            contrastText: '#fff',
        },
        secondary: {
            main: '#181718',
            light: '#292929',
            contrastText: '#181718',
        },
        background: {
            default: '#0B0B0B',
        },
    },
    shape: {
        borderRadius: 10,
    },
});

theme.components = {
    ...theme.components,
    MuiButton: {
        styleOverrides: {
            containedPrimary: {
                color: theme.palette.common.black,
            },
            containedSecondary: {
                color: theme.palette.common.white,
            },
            sizeLarge: {
                padding: theme.spacing(3, 7.25),
            },
            sizeMedium: {
                padding: theme.spacing(14 / 8, 28 / 8),
            },
        },
    },
};

export default theme;
