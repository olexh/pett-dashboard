import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { Theme } from '@mui/material';

interface CompinedTheme extends DefaultTheme, Theme {}

interface GlobalStyleProps {
    theme: CompinedTheme;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`

  ${({ theme }) => theme.breakpoints.down('md')} {
    html {
      font-size: 14px;
    }
  }

  body {
    min-height: 100vh;
  }

  #root {
    min-height: inherit;
  }

  .link {
    position: relative;
    text-decoration: none;
    transition: 0.2s all;
    color: ${({ theme }) => theme.palette.text.primary};

    &:hover {
      &:before {
        transform: scaleX(1);
      }
    }

    &:before {
      content: '';
      position: absolute;
      display: block;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #fff;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
  }

`;

export default GlobalStyle;
