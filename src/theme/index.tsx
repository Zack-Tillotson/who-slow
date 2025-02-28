import { 
  createTheme, 
  MantineColorsTuple 
} from '@mantine/core'

const primaryTheme: MantineColorsTuple = [
  "#ecf4ff",
  "#dce4f5",
  "#b9c7e2",
  "#94a8d0",
  "#748dc0",
  "#5f7cb7",
  "#5474b4",
  "#44639f",
  "#3a5890",
  "#2c4b80"
]

const secondaryTheme: MantineColorsTuple = [
  "#e4fdf6",
  "#d6f4ec",
  "#b3e5d6",
  "#8cd6c0",
  "#6cc9ad",
  "#56c1a1",
  "#48bd9b",
  "#37a785",
  "#2a9476",
  "#128165"
]

export const theme = createTheme({
  colors: {
    primary: primaryTheme,
    secondary: secondaryTheme,
  },
  primaryColor: 'primary',
});
