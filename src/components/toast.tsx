import { useTheme } from "@emotion/react";
import { Theme } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AiOutlineClose } from "react-icons/ai";
import { closeToast } from "../features/toastSlice";

function Toast() {
    const theme = useTheme() as Theme;
    const visible = useAppSelector((state) => state.toast.isVisible);
    const text = useAppSelector((state) => state.toast.text);
    const dispatch = useAppDispatch();

    return (
        <div
            css={{
                background: theme.colors.background,
                color: theme.colors.text,
                padding: '1.5rem 2rem',
                paddingRight: '3rem',
                border: `1px solid ${theme.colors.grayLight}`,
                position: 'fixed',
                top: '6rem',
                right: visible? '1rem' : '-70rem',
                opacity: visible ? 1 : 0,
                transition: 'all 1s ease-in-out',
                zIndex: 100,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                minWidth: '10rem',

                '&:before': {
                    zIndex: 1,
                    content: '""',
                    position: 'absolute',
                    top: '.5rem',
                    right: '-.45rem',
                    width: '.7rem',
                    height: '.7rem',
                    background: theme.colors.background,
                    transform: 'rotate(45deg)',
                    borderTop: `1px solid ${theme.colors.grayLight}`,
                    borderRight: `1px solid ${theme.colors.grayLight}`,
                }
            }}
        >
            {text}
            <button
                onClick={() => {dispatch(closeToast())}}
                css={{
                    background: 'none',
                    border: 'none',
                    color: theme.colors.text,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    padding: '.5rem .6rem',
                    position: 'absolute',
                    top: '.2rem',
                    right: '.2rem',
                    display: 'grid',
                    placeItems: 'center',
                    '&:hover': {
                        background: theme.colors.primaryHover,
                    }
                }}
            >
                <AiOutlineClose/>
            </button>
        </div>
    )
}

export default Toast;