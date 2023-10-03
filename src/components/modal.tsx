import { useTheme } from "@emotion/react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Theme } from "../types";
import { AiOutlineClose } from "react-icons/ai";
import { closeModal } from "../features/modalSlice";
import { useEffect, useRef } from "react";

function Modal() {
    const content = useAppSelector(state => state.modal.component);
    const isOpen = useAppSelector(state => state.modal.isVisible);
    const dispatch = useAppDispatch();
    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const theme = useTheme() as Theme;

    useEffect(() => {
        if (contentRef.current != null && containerRef.current != null) {
            containerRef.current.addEventListener('click', (e) => { 
                if (e.target === containerRef.current) {
                    dispatch(closeModal());
                }
            });
        }
    }, [isOpen]);

    return (
        <div
            ref={containerRef}
            css={{
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'all' : 'none',
                transitionProperty: 'all',
                transitionDuration: '300ms',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100,
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
            }}
        >
            <div 
                ref={contentRef} 
                css={
                    {position: "relative", 
                    transitionProperty: 'all',
                    transitionDuration: '300ms',
                    transform: isOpen ? 'scale(1)' : 'scale(0)',
                }}>
                {content}
                <button
                    onClick={() => dispatch(closeModal())}
                    css={{
                        padding: '.5rem',
                        display: isOpen ? 'grid' : 'none',
                        placeItems: 'center',
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transitionProperty: 'all',
                        transitionDuration: '300ms',
                        borderRadius: '50%',

                        '&:hover': {
                            background: theme.colors.primaryHover,
                        }
                    }}
                >
                    <AiOutlineClose
                        size={22}
                        color={theme.colors.text}
                    />
                </button>
            </div>
        </div>
    );
}

export default Modal;