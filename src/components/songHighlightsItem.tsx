import { css, useTheme } from "@emotion/react";
import { Song, Theme } from "../types";
import { LuMusic2 } from "react-icons/lu";
import { flexCenter, mq } from "../styles/styles";

interface SongHighlightsItemProps {
    song?: Song;
}

const containerHorizontal = {
    
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    transition: "all 0.2s ease-in-out",

    "&:hover div:first-of-type": {
        width: '10rem',
        height: 'calc(100%-4rem)',
        opacity: 1,
    },
}

const containerVertical = css(
    {
    height: "fit-content",
    paddingRight: "0",
    gap: "1rem",
    flexDirection: 'column',

    "&:hover div:first-of-type": {
        width: "100%",
        height: "10rem",
        opacity: 1,
    },
    }
)

const imgContainerHorizontal = css({
    opacity: 0,
    position: "relative",
    fontSize: "5rem",
    height: "100%",
    width: "0",
    overflow: "hidden",
    transition: "width 0.5s ease-in-out, opacity 0.5s ease-in-out",
})

const imgContainerVertical = css({
    transition: "height 0.5s ease-in-out, opacity 0.5s ease-in-out",
    maxHeight: "none",
    height: 0,
    width: "100%",
    overflow: "hidden",
})

function SongHighlightsItem(props: SongHighlightsItemProps) {
    const theme = useTheme() as Theme;

    return (
        <div
            css={[
                containerHorizontal,
                {
                    border: `1px solid ${theme.colors.grayLight}`,
                    "&:hover": {
                        background: theme.colors.primaryHover,
                    },

                    [mq[0]]: { paddingRight: "0rem" },

                    [mq[1]]: {
                        paddingRight: '4rem'
                    },
                    
                    [mq[3]] : containerVertical
                }
            ]}
        >
            <div
                css={[
                    flexCenter,
                    imgContainerHorizontal,
                    {
                        backgroundImage: `url(${props.song?.albumArt})`,
                        backgroundSize: "cover",
                        color: theme.colors.text,
                        [mq[3]]: imgContainerVertical,
                    },
                ]}
            >
                {props.song?.albumArt ? <div css={{height: '7rem'}}>

                </div> : (
                    <LuMusic2 />
                )}
            </div>
            <div
                css={{
                    minWidth: "12rem",
                    [mq[3]]: {
                        padding: "0 1.5rem",
                    },
                }}
            >
                <h3
                    css={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                    }}
                >
                    {props.song?.name}
                </h3>
                <p>{props.song?.album}</p>
            </div>
        </div>
    );
}

export default SongHighlightsItem;
