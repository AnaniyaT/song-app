import { css, useTheme } from "@emotion/react"
import { Theme } from "../types"
import { FaPlay, FaPause } from 'react-icons/fa'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import { flexColumn, transition } from "../styles/styles"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { AiOutlineDown } from 'react-icons/ai'
import { changePlayerVisibility } from "../features/playerSlice"
import { useEffect, useRef, useState } from "react"
import { playSong, tooglePlay } from "../features/playerSlice"

const progressContainerStyles = (theme: Theme) => css({
    width: 'calc(100% - 8rem)',
    maxWidth: '40rem',
    height: '.45rem',
    position: 'relative',
    background: theme.colors.grayLight,
    margin: '0 2rem',
    cursor: 'pointer',

    '&:hover div' : {
        opacity: '1'
    }
})

const progressStyles = (theme: Theme, progress: number) => css({
    width: `${progress}%`,
    height: '100%',
    background: theme.colors.text,
    position: 'absolute',
    left: 0,
    top: 0,
})

const progressCircleStyles = (theme: Theme) => css({
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    background: theme.colors.text,
    position: 'absolute',
    top: '-.25rem',
    left: 'calc(100% - .5rem)',
    opacity: '0',
    transition: 'opacity .3s',
})

const buttonStyles = (theme: Theme) => css({
    display: 'grid',
    placeItems: 'center',
    background: 'none',
    border: 'none',
    color: theme.colors.text,
    fontSize: '2rem',
    cursor: 'pointer',
    borderRadius: '50%',
    padding: '.5rem .6rem',

    '&:active': {
        transform: 'scale(0.9)',
    }
})

function Player() {
    const theme = useTheme() as Theme;
    const isVisible = useAppSelector(state => state.player.isVisible);
    const dispatch = useAppDispatch();
    const songs = useAppSelector(state => state.song.Songs);
    const currentSong = useAppSelector(state => state.player.currentSong);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const isPlaying = useAppSelector(state => state.player.isPlaying);

    const playerRef = useRef<HTMLAudioElement>(null);
    const progressContainerRef = useRef<HTMLDivElement>(null);
    const progressCircleRef = useRef<HTMLDivElement>(null);

    const playOrPause = () => {
        if (currentSong == null) {
            dispatch(playSong(songs[0]));
            return;
        }
        dispatch(tooglePlay());
    }

    const nextSong = () => {
        if (currentSong == null) {
            dispatch(playSong(songs[0]));
            return;
        }
        const index = songs.findIndex(song => song.id === currentSong.id);
        if (index === -1) {
            return;
        }
        const nextIndex = (index + 1) % songs.length;
        dispatch(playSong(songs[nextIndex]));
    }

    const previousSong = () => {
        if (currentSong == null) {
            
            dispatch(playSong(songs[0]));
            return;
        }
        const index = songs.findIndex(song => song.id === currentSong.id);
        if (index === -1) {
            return;
        }
        let previousIndex = (index - 1) % songs.length;
        if (previousIndex == -1) {
            previousIndex = songs.length - 1;
        }
        dispatch(playSong(songs[previousIndex]));
    }

    function handleEnd () {
        nextSong();
    }

    const handleTimeUpdate = () => {
        if (playerRef.current) {
          const progress = (playerRef.current.currentTime / playerRef.current.duration) * 100;

          setProgress(progress);
          setCurrentTime(playerRef.current.currentTime);
        }
      };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    useEffect(() => {
        if (playerRef.current) {
          playerRef.current.addEventListener('timeupdate', handleTimeUpdate);
          playerRef.current.addEventListener('ended', handleEnd);
        }
        return () => {
          if (playerRef.current) {
            playerRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            playerRef.current.removeEventListener('ended', handleEnd);
          }
        };
      }, [playerRef, currentSong]);

    useEffect(() => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.play();
            } else {
                playerRef.current.pause();
            }
        }
    }, [isPlaying, currentSong])

    useEffect(() => {
        if (progressContainerRef.current) {
            progressContainerRef.current.addEventListener('click', (e) => {
                if (playerRef.current) {
                    const progress = (e.offsetX / progressContainerRef.current!.clientWidth) * 100;
                    setProgress(progress);
                    playerRef.current.currentTime = (playerRef.current.duration / 100) * progress;
                }
            })
        }
    }, [progressContainerRef])
      
    return (
        <div>
            <div
            css={[
                transition,
                {
                userSelect: 'none',
                position: 'fixed',
                padding: '1rem 0',
                bottom: isVisible ? 0 : '-11rem',
                left: 0,
                width: '100%',
                background: theme.colors.navBackground,
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                zIndex: 100,
                display: 'flex',
                gap: '1rem',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderTop: `1px solid ${theme.colors.grayLight}`,
                transition: 'bottom .5s, background .3s',
            }]}
            >
            <div
                css={{
                    position: 'absolute',
                    top: '-4rem',
                    background: theme.colors.background,
                    border: `1px solid ${theme.colors.grayLight}`,
                    right: '2rem',
                    display: 'grid',
                    placeItems: 'center',
                    scale: '.9',
                    transition: 'bottom .5s, background .3s',
                    
                    '&:hover' : {
                        background: theme.colors.primaryHover
                    }
                }}
            >
                <audio ref={playerRef} src={currentSong?.audioUrl}></audio>
                <button 
                    onClick={() => {dispatch(changePlayerVisibility())}}
                    css={buttonStyles(theme)}
                >
                    {
                        <AiOutlineDown css={{transform: !isVisible ? 'rotate(180deg)' : '', transition: 'transform .5s'}}/>
                    }
                </button>
            </div>
            <div css={[flexColumn, { gap: '.3rem', textAlign: 'center'}]}>
                <span css={{fontSize: '1.2rem', fontWeight: '600', color: theme.colors.text}}>{currentSong?.name ?? "------"}</span>
                <span css={{fontSize: '1rem', color: theme.colors.text}}>{currentSong?.artist ?? "------"}</span>
            </div>
            <div ref={progressContainerRef} css={[progressContainerStyles(theme)]}>
                <div  css={[progressStyles(theme, progress)]}>
                    <div ref={progressCircleRef} className="progress-circle" css={progressCircleStyles(theme)}></div>
                </div>
                <span css={{color: theme.colors.text, position: 'absolute', top: '.5rem', left: '0'}}>
                    { formatTime(currentTime) ?? '0:00' }
                </span>
                <span css={{position: 'absolute', right: '0rem', top: '.5rem', color: theme.colors.text}}>
                    {currentSong?.duration ?? '0:00'}
                </span>
            </div>
            <div css={{display: 'flex'}}>
                <button onClick={previousSong} css={buttonStyles(theme)}>
                    <BiSkipPrevious css={{fontSize: '2.5rem'}}/>
                </button>
                <button
                    onClick={playOrPause}
                    css={buttonStyles(theme)}>
                    {isPlaying? <FaPause/> : <FaPlay/>}
                </button>
                <button onClick={nextSong} css={buttonStyles(theme)}>
                    <BiSkipNext css={{fontSize: '2.5rem'}}/>
                </button>
            </div>
            
        </div>
        </div>
        
    )
}

export default Player