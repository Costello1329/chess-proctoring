import { useStoreState } from '@proscom/prostore-react';
import { useNavigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form';
import { roomManageService } from '../../services/RoomManageService';
import { USER_STORE } from '../../stores/stores';
import { IUserStoreState } from '../../stores/UserStore';
import { usernameValidator } from '../../validators/usernameValidator';
import { GAME_PAGE } from '../routes';

export function CreateGamePage () {
  const navigate = useNavigate();
  const userStoreState = useStoreState<IUserStoreState>(USER_STORE);

  return (
    <Form
      header='Create game'
      name='create-game'
      submitText='Create'
      size='s'
      inputs={[{
        type: 'text',
        label: 'Other player',
        validator: usernameValidator
      }, {
        label: 'You play with white pieces'
      }]}
      onSubmit={async ([blackPlayer, currentUserHasWhitePieces]) => {
        let whitePlayer = userStoreState.username!;

        if (!currentUserHasWhitePieces)
          [whitePlayer, blackPlayer] = [blackPlayer as string, whitePlayer];

        const roomId = await roomManageService.create(whitePlayer, blackPlayer as string);
        if (roomId !== null) navigate(GAME_PAGE(roomId));
      }}
    />
  );
}
