import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#e6f2ff',
    100: '#b3d9ff',
    200: '#80bfff',
    300: '#4da6ff',
    400: '#1a8cff',
    500: '#0073e6',
    600: '#005bb4',
    700: '#004282',
    800: '#002a50',
    900: '#00121f',
  },
  schematic: {
    background: '#fafbfc',
    component: '#ffffff',
    componentStroke: '#4a5568',
    connector: '#f7fafc',
    wire: '#2d3748',
    wireShadow: '#1a202c',
    pin: '#ffffff',
    pinStroke: '#718096',
    pinDot: '#2d3748',
    label: '#1a202c',
  },
};

const fonts = {
  heading: "'Inter', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

const components = {
  Button: {
    defaultProps: {
      colorScheme: 'brand',
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'lg',
        boxShadow: 'sm',
      },
    },
  },
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
});
