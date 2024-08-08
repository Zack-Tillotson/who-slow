import { 
  createTheme, 
  MantineColorsTuple 
} from '@mantine/core'

const primaryTheme: MantineColorsTuple = [
  "#eef4fc",
  "#dbe5f3",
  "#b1c8e7",
  "#86abde",
  "#6292d5",
  "#4c81d1",
  "#4079cf",
  "#3368b8",
  "#2a5ca5",
  "#1b4f92"
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
