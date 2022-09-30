import { useNavigate } from 'react-router-dom'
import { CREATE_GAME_PAGE, GAMES_PAGE } from '../routes';
import './MainPage.css';

export function MainPage () {
  const navigate = useNavigate();

  return (
    <div className='main-page'>
      <div onClick={() => navigate(CREATE_GAME_PAGE)}>Create game</div>
      <div onClick={() => navigate(GAMES_PAGE)}>Games</div>
    </div>
  );
}
