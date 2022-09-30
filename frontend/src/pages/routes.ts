export const LOGIN_PAGE = '/login';
export const REGISTER_PAGE = '/register';
export const HOME_PAGE = '/';
export const CREATE_GAME_PAGE = '/create-game';
export const GAMES_PAGE = '/games';
export const GAME_PAGE = (id: string) => `${GAMES_PAGE}/${id}`;
