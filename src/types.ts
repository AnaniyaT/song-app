type Song = {
    name: string;
    artist: string;
    album?: string;
    genre?: string;
    year?: number;
    id: number;
    duration: number | string;
    albumArt?: string;
    audioUrl?: string;
}

type Theme = {
    colors: {
      background: string;
      navBackground: string;
      text: string;
      primary: string;
      primaryHover: string;
      secondary: string;
      secondaryHover: string;
      black: string;
      white: string;
      gray: string;
      grayLight: string;
      grayDark: string;
    };
  }

export type { Song, Theme };