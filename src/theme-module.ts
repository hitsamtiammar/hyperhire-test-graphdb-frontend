import { PaletteColorOptions } from "@mui/material"

declare module '@mui/material/styles' {
    interface Palette {
        gray: PaletteColorOptions;
        description: PaletteColorOptions;
        blue: PaletteColorOptions
      }
      interface PaletteOptions {
        gray: PaletteColorOptions;
        description: PaletteColorOptions
        blue: PaletteColorOptions
      }
}
declare module "@mui/material" {
    interface ButtonPropsColorOverrides {
        gray: true;
        blue: true;
    }
  }