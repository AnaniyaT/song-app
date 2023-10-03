import { Theme } from "../types";

const lightTheme : Theme = {
    colors: {
        background: 'white',
        navBackground: 'rgba(255, 255, 255, 0.5)',
        text: '#777',
        primary: '#2f60a3',
        primaryHover: '#f5f5f5',
        secondary: '#ff0000',
        secondaryHover: '#cc0000',
        black: '#000',
        white: '#fff',
        grayLight: '#d0d0d0',
        gray: '#ccc',
        grayDark: '#999',
    },
}

const darkTheme : Theme = {
    colors: {
        background: '#000',
        navBackground: 'rgba(0, 0, 0, 0.5)',
        text: '#f5f5f5',
        primary: '#2f60a3',
        primaryHover: '#333',
        secondary: '#ff0000',
        secondaryHover: '#cc0000',
        black: '#000',
        white: '#fff',
        grayLight: '#555',
        gray: '#ccc',
        grayDark: '#999',
    },
}

export { lightTheme, darkTheme };
