import { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ProstoreContext, useStoreState } from '@proscom/prostore-react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RedirectIf } from '../utils/RedirectIf';
import { IUserStoreState } from '../../stores/UserStore';
import { stores, USER_STORE } from '../../stores/stores';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { MainPage } from '../../pages/MainPage/MainPage';
import { GamesPage } from '../../pages/GamesPage/GamesPage';
import { CreateGamePage } from '../../pages/CreateGamePage/CreateGamePage';
import { CREATE_GAME_PAGE, HOME_PAGE, GAMES_PAGE, LOGIN_PAGE, REGISTER_PAGE } from '../../pages/routes';
import { GamePage } from '../../pages/GamePage/GamePage';
import classNames from 'classnames';
import './App.css';

export function AppInner () {
  const userStoreState = useStoreState<IUserStoreState>(USER_STORE);
  const authenticated = useMemo(() => userStoreState.sessionId !== null, [userStoreState]);
  const location = useLocation();

  return (
    <>
      <Header />
      <div className={classNames('app', location.pathname === '/' ? 'app-tall' : null)}>{
        userStoreState.loading ? 
        <div style={{ position: 'fixed', top: 500 }}>LOADING</div> :
        <>
          <Routes>
            <Route path={HOME_PAGE} element={
              <RedirectIf
                condition={!authenticated}
                path={LOGIN_PAGE}
                children={<MainPage />}
              />
            }/>
            <Route path={CREATE_GAME_PAGE} element={
              <RedirectIf
                condition={!authenticated}
                path={LOGIN_PAGE}
                children={<CreateGamePage />}
              />
            }/>
            <Route path={GAMES_PAGE} element={
              <RedirectIf
                condition={!authenticated}
                path={LOGIN_PAGE}
                children={<GamesPage />}
              />
            }/>
            <Route path={`${GAMES_PAGE}/:roomId`} element={
              <RedirectIf
                condition={!authenticated}
                path={HOME_PAGE}
                children={<GamePage />}
              />
            }/>
            <Route path={LOGIN_PAGE} element={
              <RedirectIf
                condition={authenticated}
                path={HOME_PAGE}
                children={<LoginPage />}
              />
            }/>
            <Route path={REGISTER_PAGE} element={
              <RedirectIf
                condition={authenticated}
                path={HOME_PAGE}
                children={<RegisterPage />}
              />
            }/>
            <Route path='*' element={<Navigate to={HOME_PAGE} />} />
          </Routes>
        </>
      }</div>
      <Footer />
    </>
  );
}

export function App () {
  return (
    <ProstoreContext.Provider value={stores}>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </ProstoreContext.Provider>
  );
}
