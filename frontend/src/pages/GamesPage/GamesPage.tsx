import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Result, Room, roomManageService } from '../../services/RoomManageService';
import { GAME_PAGE } from '../routes';
import './GamesPage.css';

export function GamesPage () {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<null | Room[]>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const toResult = (result: Omit<Result, 'none'>) => {
    switch (result) {
      case 'win': return <>{highlight('White')} player won</>;
      case 'lose': return <>{highlight('Black')} player won</>;
      case 'draw': return <>{highlight('Draw')} player won</>;
    }
  }

  const highlight = (text: string) => <span className='highlight'>{text}</span>;

  useEffect(() => {
    if (loading)
      roomManageService.list('participant').then(rooms => {
        setLoading(false);
        setRooms(rooms);
      });
  });

  return (
    <div className='games-container'>{
      rooms?.map(({ room_id, creator, white_player, black_player, created_at, result}, i) =>
        <div key={i} className='game-record'>
          <p className='creator-text'>
            Created by {highlight(creator)} at {highlight(new Date(created_at).toUTCString())}
          </p>
          <div className='center'>
            <p className='vs-text'>{highlight(white_player)} VS {highlight(black_player)}</p>
            {
              result === 'none' ?
              <Button
                type={'button'}
                appearance={'secondary'}
                text={'Join game'}
                onClick={() => navigate(GAME_PAGE(room_id))}
              /> :
              <div>{toResult('win')}</div>
            }
          </div>
        </div>
      )
    }</div>
  );
}
