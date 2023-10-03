import { ThemeProvider, css } from '@emotion/react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import TopNav from './components/topNav';
import HomePage from './pages/homePage';
import { transition } from './styles/styles';
import Modal from './components/modal';
import { useEffect } from 'react';
import { fetchSongsRequest } from './features/songSlice';
import Loading from './components/loading';
import Toast from './components/toast';

function App() {
  const theme = useAppSelector(state => state.theme.theme);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.song.isLoading);

  useEffect(() => {
    dispatch(fetchSongsRequest())
    document.body.style.background = theme.colors.background;
  }, [])

  const fadeIn = css`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const appearAnimation = css`
  animation: fadeIn 0.5s ease-in-out;
`;

  return (
    <ThemeProvider theme={theme}>
      {
        isLoading ? <div css={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: theme.colors.background,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Loading/>
        </div> : 
        <div
        css={[{
          background: theme.colors.background,
        },
        appearAnimation,
        fadeIn,
        transition
      ]}
      >
        <TopNav/>
        <HomePage/>
        <Modal/>
        <Toast/>
      </div>
      }    
    </ThemeProvider>
  )
}

export default App
