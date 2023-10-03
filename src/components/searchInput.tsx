import { useTheme } from "@emotion/react";
import { Theme } from "../types";
import { mq } from "../styles/styles";

function SearchInput() {
    const theme = useTheme() as Theme;
    return (
        <div>
            <input
                css={{
                    padding: '0.5rem 1rem',
                    border: `1px solid ${theme.colors.grayLight}`,
                    background: theme.colors.background,
                    color: theme.colors.text,
                    fontSize: '1rem',
                    outline: 'none',
                    appearance: 'none',
                    fontFamily: 'inherit',
                    width: '10rem',

                    [mq[1]]: {
                        width: '20rem',
                    },
                }}
                type="text" placeholder="Search..." />
        </div>
    );
}

export default SearchInput;