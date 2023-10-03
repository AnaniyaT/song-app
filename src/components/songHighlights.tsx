import { useTheme } from "@emotion/react";
import { Song, Theme } from "../types";
import SongHighlightsItem from "./songHighlightsItem";
import { flexColumn, mq, scrollbar } from "../styles/styles";

interface SongHighlightsProps {
    songs?: Song[];
}

function SongHighlights(props: SongHighlightsProps) {
    const songs: Song[] = props.songs ?? [];

    const theme = useTheme() as Theme;
    return (
        <div css={{
            position: 'sticky',
            top: '6rem',
            border: `1px solid ${theme.colors.grayLight}`, 
            padding: '2rem',
            [mq[3]]: {
                padding: '2rem 1.5rem',
            },
        }}>
            <h2
                css={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    marginBottom: '2rem',
                }}
            >
                Top Songs
            </h2>   
            <div css={
                    [
                        scrollbar, 
                        flexColumn,
                        {
                            gap:'2rem', 
                            overflowX: 'auto',
                            
                            [mq[1]]: {
                                flexDirection: 'row',
                            },
                            [mq[3]]: {
                                flexDirection: 'column',
                            },

                        },
                    ]
            }>
                {
                    songs.slice(0, 3).map((song) => (
                        <SongHighlightsItem key={song.id} song={song}/>
                    ))
                }
            </div>
        </div>
    )
}


export default SongHighlights