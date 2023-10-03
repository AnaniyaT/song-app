import { useTheme } from "@emotion/react";
import { Theme } from "../types";
import SongsList from "../components/songsList";
import SongHighlights from "../components/songHighlights";
import { mq } from "../styles/styles";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openModal } from "../features/modalSlice";
import CreateSongForm from "../components/createSongForm";


function HomePage() {
    const theme = useTheme() as Theme;
    const dispatch = useAppDispatch();

    const songs = useAppSelector((state) => state.song.Songs);
    return (
        <main 
            css={{
                color: theme.colors.text,
                minHeight: '100vh',
                padding: '1rem',
                transitionProperty: 'all',
                transitionDuration: '500ms',
                maxWidth: '90rem',
                margin: '0 auto',
            }}
        >
            <div css={{
                padding: '0rem 2rem',
                paddingBottom: '.5rem',
                borderBottom: `1px solid ${theme.colors.grayLight}`,
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <h1>Your Tunes</h1>
                <button
                    css={{
                        background: theme.colors.background,
                        border: `1px solid ${theme.colors.grayLight}`,
                        color: theme.colors.text,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        padding: '.5rem 1rem',
                        fontFamily: 'inherit',
                
                        '&:hover': {
                            background: theme.colors.primaryHover,
                        }
                    }}
                    onClick={() => dispatch(openModal(<CreateSongForm/>))}
                >
                    Add Song
                </button>
            </div>
            
            <div css={[
                { 
                    display: 'flex',
                    gap: '2rem',
                    flexFlow: 'row-reverse',
                    flexDirection: 'column',
                    [mq[3]]: {
                        flexFlow: 'row-reverse',
                    },
                }
            ]}>
                <div css={
                    {
                        position: 'sticky',
                    }
                }>
                    <SongHighlights songs={songs}/>
                </div>
                <div css={{width: '100%'}}>
                    <SongsList songs={songs}/>
                </div>
            </div>
            
        </main>
    )
}

export default HomePage;