import { css, useTheme } from "@emotion/react";
import { Song, Theme } from "../types"; 
import { BsMusicNote, BsPersonFill } from "react-icons/bs";
import { flexCenter } from "../styles/styles";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeModal } from "../features/modalSlice";
import { deleteSongRequest } from "../features/songSlice";
import Loading from "./loading";

interface DeleteSongPopUpProps {
    song?: Song
}

const buttonStyles =(theme: Theme) => css({
    flex: '1',
    fontSize: '1rem',
    background: theme.colors.background,
    padding: '1rem',
    color: theme.colors.text,
    fontFamily: 'inherit',
    border: `1px solid ${theme.colors.grayLight}`,
    '&:hover': {
        background: theme.colors.primaryHover,
    }
})

function DeleteSongPopUp(props: DeleteSongPopUpProps) {
    const theme = useTheme() as Theme;
    const loadingDelete = useAppSelector((state) => state.song.isLoadingDelete);
    const dispatch = useAppDispatch();

    return <div
        css={{
            background: theme.colors.background,
            color: theme.colors.text,
            padding: '4rem',
            border: `1px solid ${theme.colors.grayLight}`,
        }}
    >
        <p css={{fontSize: '1.5rem'}}>Are you sure you want to delete this song?</p>
        <div 
            css={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: `1px solid ${theme.colors.grayLight}`,
                padding: '0rem 1rem',
            }}
        >
            <p css={flexCenter}><BsMusicNote css={{marginRight: '.5rem'}}/>{props.song?.name}</p>
            <p css={flexCenter}><BsPersonFill css={{marginRight: '.5rem'}}/>{props.song?.artist}</p>
        </div>
        {
            loadingDelete ? <div css={{
                border: `1px solid ${theme.colors.grayLight}`,
                padding: '1.4rem 1rem' ,
                marginTop: '1rem',
                display: 'flex',
                justifyContent: 'center'

            }}>
                    <Loading/>
            </div> :

            <div css={{display: 'flex', gap:'1rem', marginTop:'1rem'}}>
            <button 
                css={buttonStyles(theme)}
                onClick={() => dispatch(deleteSongRequest(props.song?.id ?? 0))}
            >
                Yes
            </button>
            <button 
                onClick={() => dispatch(closeModal())}
                css={buttonStyles(theme)}
            >
                No
            </button>
            </div>
        }
        
        
    </div>
}

export default DeleteSongPopUp;