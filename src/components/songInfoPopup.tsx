import { css, useTheme } from "@emotion/react";
import { Song, Theme } from "../types";
import { mq } from "../styles/styles"; 
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { useAppDispatch } from "../store/hooks";
import { openModal } from "../features/modalSlice";
import CreateSongForm from "./createSongForm";
import DeleteSongPopUp from "./deleteSongPopUp";

interface SongInfoPopupProps {
    song?: Song;
}

function SongInfoPopup(props: SongInfoPopupProps) {
    const theme = useTheme() as Theme;
    const dispatch = useAppDispatch();
    const buttonStyles = css({
        flex: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'none',
        border: 'none',
        color: theme.colors.text,
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '50%',
        padding: '.5rem .6rem',
        '&:hover': {
            background: theme.colors.primaryHover,
        }
    })

    return(
        <div 
            onClick={(e) => e.stopPropagation()}
            key={props.song?.id}
            css={{
                opacity: 0,
                pointerEvents: 'none',
                padding: '2rem',
                position: 'absolute',
                top: 'calc(100% + -.5rem)',
                left: '0',
                background: theme.colors.background,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                zIndex: 10,
                transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
                outline: `1px solid ${theme.colors.grayLight}`,
                width: '12rem',
                transform: 'translateY(-1rem)',
                [mq[2]]: {
                    width: '18rem',
                },
               

                ":before": {
                    content: '""',
                    position: 'absolute',
                    top: '-.55rem',
                    left: '1.5rem',
                    width: '1rem',
                    height: '1rem',
                    background: theme.colors.background,
                    borderTop: `1px solid ${theme.colors.grayLight}`,
                    borderRight: `1px solid ${theme.colors.grayLight}`,
                    transform: 'rotate(-45deg)',
                    zIndex: 1,
                }
            }}
        >
            <div css={{display: 'flex', flexDirection: 'column', marginTop: '1.5rem'}}>
                <span
                    css={{
                        fontWeight: 700,
                        fontSize: '2rem',
                    }}
                >
                    {props.song?.name}
                </span>
                <span
                    css={{
                        fontSize: '1.2rem',
                        marginBottom: '1rem',
                    }}
                >
                    {props.song?.artist}
                </span>
            </div>
            
            <p
                css={{
                    fontSize: '1rem',
                    marginBottom: '1rem',
                }}
            >
                {props.song?.album}
            </p>
            <div
                css={{
                    display: 'flex',
                    position: 'absolute',
                    top: '1.2rem',
                    right: '1rem',
                }}
            >
                <button
                    onClick={() => {dispatch(openModal(<CreateSongForm song={props.song} key={props.song?.id}/>))}}
                    css={buttonStyles}
                >
                    <MdModeEdit/>
                </button>
                <button
                    onClick={() => {dispatch(openModal(<DeleteSongPopUp song={props.song} key={props.song?.id}/>))}}
                    css={buttonStyles}
                >
                    <MdDelete/>
                </button>
            </div>
            
        </div>
    );
}


export default SongInfoPopup;