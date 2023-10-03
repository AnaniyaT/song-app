import { useTheme } from "@emotion/react";
import { Song, Theme } from "../types";
import styled from "@emotion/styled";
import { flexBetween, mq, transition } from "../styles/styles";
import SearchInput from "./searchInput";
import SongInfoPopup from "./songInfoPopup";

interface SongsListProps {
    songs?: Song[];
}

const Table = styled.table({
    borderCollapse: 'collapse', 
    width: '100%',
  });


const Tr = styled.tr(
    transition,
    {
        '&:hover div': {
            opacity: 1,
            pointerEvents: 'auto',
            
        }
    }
)


const Td = styled.td({
    padding: '1rem',
    '&:first-of-type': {
        paddingLeft: '2rem',
    },
    '&:last-of-type': {
        paddingRight: '2rem',
    },

    '&:nth-of-type(4)': {
        display: 'none',
        [mq[1]]: { 
            display: 'table-cell',
        },
    },
    '&:nth-of-type(5)': {
        display: 'none',
        [mq[2]]: { 
            display: 'table-cell',
        },
    }
})



function SongsList(props: SongsListProps) {
    const theme = useTheme() as Theme;
    const songs = props.songs ?? [];
    return (
        <section
            css={{
                paddingTop: '1rem',
                border: `1px solid ${theme.colors.grayLight}`,
                borderBottom: 'none',
            }}
        >
            <div css={[flexBetween, {padding: '0 2rem', paddingBottom: '1rem'}]}>
                <h2
                    css={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                    }}
                >
                    Songs
                </h2>
                <SearchInput/>
            </div>
            
            <Table>
                <tbody>
                    {songs.map((song, index) => (
                        <Tr 
                            css={{
                                '&:hover': {
                                    background: theme.colors.primaryHover,
                                },
                                borderBottom: `1px solid ${theme.colors.grayLight}`,
                                borderTop: `1px solid ${theme.colors.grayLight}`,
                            }}
                            key={song.id}>
                            <Td>{index + 1}.</Td>
                            <Td
                                css={{position: 'relative'}}
                            >
                                {song.name}
                                <SongInfoPopup song={song}/>
                            </Td>
                            <Td>{song.artist}</Td>
                            <Td>{song.album}</Td>
                            <Td>{song.duration}</Td>
                            
                        </Tr>
                    ))}

                    {
                        songs.length < 12 && Array(12 - songs.length).fill(0).map((_, index) => (
                            <Tr
                                css={{
                                    borderBottom: `1px solid ${theme.colors.grayLight}`,
                                    borderTop: `1px solid ${theme.colors.grayLight}`,
                                }}
                                key={index}>
                                <Td>{songs.length + index + 1}.</Td>
                                <Td>------</Td>
                                <Td>------</Td>
                                <Td>------</Td>
                                <Td>--:--</Td>
                            </Tr>
                        ))
                    }
                </tbody>
            </Table>
        </section>
    )
}

export default SongsList;