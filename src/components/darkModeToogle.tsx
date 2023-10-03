import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { changeTheme } from '../features/themeSlice';
import { transition } from '../styles/styles';

function DarkModeToogle() {
    const theme = useAppSelector(state => state.theme.theme);
    const isDarkMode = useAppSelector(state => state.theme.isDarkMode);
    const dispatch = useAppDispatch();

    return(
        <button 
            css={[{
                background: 'transparent',
                outline: 'none',
                border: 'none',
                fontSize: '2rem',
                padding: '0.5rem',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '50%',
                cursor: 'pointer',
                color: theme.colors.text,
                ":hover": {
                    background: theme.colors.primaryHover,
                },

                ":active": {
                    background: theme.colors.gray
                }
                
            },
            transition
        ]}

            onClick={() => dispatch(changeTheme())}
        >
            {isDarkMode ? <MdOutlineLightMode/> : <MdDarkMode/>}
        </button>

    );
}

export default DarkModeToogle;