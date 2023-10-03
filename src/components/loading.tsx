import { css, useTheme } from "@emotion/react";
import { Theme } from "../types";

interface LoadingProps {
    size?: string;
    color?: string;    
}

const loadingCircleStyle = (props: LoadingProps) => css({
    width: props.size || '1rem',
    height: props.size || '1rem',
    borderRadius: '50%',
    backgroundColor: props.color || 'black',
    animation: 'loading 0.6s infinite alternate',
    '&:nth-of-type(2)': {
        animationDelay: '0.2s'
    },
    '&:nth-of-type(3)': {
        animationDelay: '0.4s'
    }
})

const loadingAnimation = css`
    @keyframes loading {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.5);
        }
    }
`;

function Loading() {
    const theme = useTheme() as Theme;
    const props = {color: theme.colors.text, size: '1rem'};
  return (
    <div css={{display: 'flex'}}>
      <div css={[loadingCircleStyle(props), loadingAnimation]}></div>
      <div css={[loadingCircleStyle(props), loadingAnimation]}></div>
      <div css={[loadingCircleStyle(props), loadingAnimation]}></div>
    </div>
  );
}

export default Loading;