import { css, useTheme } from "@emotion/react";
import { Song, Theme } from "../types";
import styled from "@emotion/styled";
import { flexBetween, flexColumn, mq } from "../styles/styles";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeModal } from "../features/modalSlice";
import { getSongDuration } from "../util/util";
import { useState } from "react";
import { addSongRequest, editSongRequest } from "../features/songSlice";
import Loading from "./loading";

interface InputProps {
    theme: Theme
    placeHolder? : string
}

const Input = styled.input<InputProps>(({ theme }) => ({
    padding: '0.5rem 1rem',
    margin: '.2rem 0 1rem 0',
    border: `1px solid ${theme.colors.grayLight}`,
    background: theme.colors.background,
    color: theme.colors.text,
    fontSize: '1rem',
    outline: 'none',
    appearance: 'none',
    fontFamily: 'inherit',
    width: '18rem',

    '&::file-selector-button': {
        padding: '0.5rem 1rem',
        border: `1px solid ${theme.colors.grayLight}`,
        background: theme.colors.background,
        color: theme.colors.text,
        fontSize: '1rem',
        outline: 'none',
        appearance: 'none',
        fontFamily: 'inherit',
        cursor: 'pointer',
        marginRight: '1rem',
    },

    [mq[2]] : {
        width: 'auto'
    }
    
}));

  
async function handleSubmit(e: React.FormEvent<HTMLFormElement>, duration: string, dispatch: any) {
    e.preventDefault();
    dispatch(addSongRequest({e, duration}));
}

interface CreateSongFormProps {
    song?: Song
}

function CreateSongForm(props: CreateSongFormProps) {
    const isEdit = props.song ? true : false;
    const theme = useTheme() as Theme;
    const dispatch = useAppDispatch();
    const [songDuration, setSongDuration] = useState<string>(props.song?.duration.toString() || "--:--");
    const isLoading = useAppSelector((state) => state.song.isLoadingCreate);
    const isLoadingEdit = useAppSelector((state) => state.song.isLoadingEdit);

    const onSongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        getSongDuration(e, (duration) => {setSongDuration(duration)})
        };

    const handleEdit = (e: React.FormEvent<HTMLFormElement>, song?: Song) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('duration', songDuration);
        formData.append('id', song?.id.toString() || '');
        formData.append('audioUrl', song?.audioUrl || '');
        dispatch(editSongRequest(formData));
    }

    const buttonStyles = css({
        flex: 1,
        padding: '1rem',
        border: `1px solid ${theme.colors.grayLight}`,
        background: theme.colors.background,
        color: theme.colors.text,
        fontFamily: 'inherit',
        fontSize: '1rem',

        ':hover': {
            background: theme.colors.primaryHover,
        },
    });

    return (
        <div
            css={{
                padding: '2rem',
                border: `1px solid ${theme.colors.grayLight}`,
                background: theme.colors.background,
                color: theme.colors.text,

                [mq[2]] : {
                    padding: '4rem'
                }
            }}
        >
            <h1>{isEdit ? "Edit" : "Add"} Song</h1>
            <form onSubmit={(e) => {isEdit ? handleEdit(e, props.song) : handleSubmit(e, songDuration, dispatch)}}>
                <div css={[
                    {
                        [mq[2]]: {
                            display: 'flex',
                            gap: '1rem',
                        }
                    }
                ]}>
                    <div css={flexColumn}>
                        <label htmlFor="name">Title</label>
                        <Input theme={theme} defaultValue={props.song?.name} type="text" name="name" id="name" />
                    </div>
                    <div css={flexColumn}>
                        <label htmlFor="album">Album</label>
                        <Input theme={theme} defaultValue={props.song?.album} type="text" name="album" id="album" />
                    </div>
                </div>

                <div css={flexColumn}>
                    <label htmlFor="Artist">Artist</label>
                    <Input theme={theme} defaultValue={props.song?.artist} type="text" name="artist" id="artist" />
                </div>

                <div css={[flexColumn]}>
                    <label htmlFor="url">Album Art Url</label>
                    <Input theme={theme} defaultValue={props.song?.albumArt}  type="text" name="url" id="url" />
                </div>
                {
                    isEdit ? null :
                    <div css={[flexColumn]}>
                        <label htmlFor="file">Song File</label>
                        <Input theme={theme} type="file" name="file" id="file" onChange={onSongChange}/>
                    </div>
                }
                
                {
                    (isLoading || isLoadingEdit) ? <div css={{
                        border: `1px solid ${theme.colors.grayLight}`,
                        padding: '1.4rem 1rem' ,
                        marginTop: '1rem',
                        display: 'flex',
                        justifyContent: 'center'

                    }}>
                            <Loading></Loading>
                    </div> :
                    <div css={[flexBetween, { marginTop: '1rem', gap: '1rem'}]}>
                        <button onClick={(e) => {e.preventDefault(); dispatch(closeModal())}} css={[buttonStyles]}>
                            Cancel
                        </button>
                        <button type="submit"  css={[buttonStyles]}>
                            Save
                        </button>
                    </div>
                }
                
            </form>
        </div>
    )
}

export default CreateSongForm;