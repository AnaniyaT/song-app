import { css } from "@emotion/react";

const maxWidth = css`
    max-width: 90rem;
    margin: 0 auto;
    `;

const flexBetween = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    `;

const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const flexColumn = css`
    display: flex;
    flex-direction: column;
    `;

const transition = css`
     transition: all 0.3s;
    `;

const scrollbar = css`
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;

    &::-webkit-scrollbar {
        width: 0;
    }
    `;

const inputStyles = css`
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    outline: 'none',
    appearance: 'none',
    fontFamily: 'inherit',
`

const breakpoints = [576, 768, 992, 1200]

const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`)

export { maxWidth,flexBetween, flexCenter, flexColumn, transition, scrollbar, inputStyles, mq };