import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { Theme } from '@mui/material';

interface CompinedTheme extends DefaultTheme, Theme {}

interface GlobalStyleProps {
    theme: CompinedTheme;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  @import url('https://rsms.me/inter/inter.css');

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


`;

export default GlobalStyle;
