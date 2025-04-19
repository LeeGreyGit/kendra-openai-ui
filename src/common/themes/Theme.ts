import {jaJP} from '@material-ui/core/locale';
import {createTheme} from '@material-ui/core/styles';

import {
  primaryColor,
  primaryFonts,
  secondaryColor,
} from '../../common/themes/BaseStyles';

export const baseTheme = createTheme(
  {
    palette: {
      type: 'light',
      primary: primaryColor,
      secondary: secondaryColor,
      error: {
        main: secondaryColor[500],
        light: '#EF487B',
      },
    },
    typography: {
      fontFamily: primaryFonts.family.default.join(','),
      htmlFontSize: 8,
      fontSize: 8,
      h1: {
        fontWeight: primaryFonts.weight.bold,
        fontSize: primaryFonts.size.xHeadline,
        lineHeight: '1.4',
      },
      h2: {
        fontWeight: primaryFonts.weight.bold,
        fontSize: primaryFonts.size.headline,
        lineHeight: '1.4',
      },
      h3: {
        fontWeight: primaryFonts.weight.bold,
        fontSize: primaryFonts.size.xxLarge,
        lineHeight: '1.4',
      },
      h4: {
        fontWeight: primaryFonts.weight.bold,
        fontSize: primaryFonts.size.xLarge,
        lineHeight: '1.3',
      },
      h5: {
        fontWeight: primaryFonts.weight.bold,
        fontSize: primaryFonts.size.large,
      },
      h6: {},
      body1: {
        fontSize: primaryFonts.size.normal,
      },
    },
  },
  jaJP
);
