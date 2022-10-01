import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GameGetRes, gameService } from '../../services/GameService';
import { Chessboard } from 'react-chessboard';
import { Chess, Move, PartialMove } from 'chess.ts'
import * as lodash from 'lodash';
import './GamePage.css';
import { HOME_PAGE } from '../routes';
import { useStoreState } from '@proscom/prostore-react';
import { IUserStoreState } from '../../stores/UserStore';
import { USER_STORE } from '../../stores/stores';

function setIntervalImmediately<Args extends any[]>(
  callback: (...args: Args) => void,
  interval?: number,
  ...args: Args
): NodeJS.Timer {
  callback(...args);
  return setInterval(callback, interval, ...args);
}

const UPDATE_TIME = 1000;

export function GamePage () {
  const roomId = useParams().roomId!;
  const navigate = useNavigate();
  const [thisPlayer, setThisPlayer] = useState<string | null>(null);
  const [otherPlayer, setOtherPlayer] = useState<string | null>(null);
  const [pulse, setPulse] = useState<boolean>(false);
  const [currentUserPlaysWhite, setCurrentUserPlaysWhite] = useState<boolean | null>(null);
  const [game, setGame] = useState<Chess | null>(null);
  const userStoreState = useStoreState<IUserStoreState>(USER_STORE);

  useEffect(() => {
    if (pulse) return;

    setPulse(true);
    const intervalId = setIntervalImmediately(
      async () => {
        const res = await gameService.get(roomId!);
        if (res === null || userStoreState.username === null) {
          navigate(HOME_PAGE);
          return;
        }

        const currentUserPlaysWhite = userStoreState.username === res.white_player;
        setThisPlayer(currentUserPlaysWhite ? res.white_player : res.black_player);
        setOtherPlayer(!currentUserPlaysWhite ? res.white_player : res.black_player);
        setCurrentUserPlaysWhite(userStoreState.username === res.white_player);
        setGame(new Chess(res.fen));
      },
      UPDATE_TIME
    );

    return () => clearInterval(intervalId);
  }, [navigate, roomId]); /// pulse should NOT be included!

  if (roomId === undefined) return null;

  function makeAMove(move: string | PartialMove): string | null {
    if (game === null) return null;
    const gameCopy = lodash.cloneDeep(game);
    const result = gameCopy.move(move);
    if (
      (result === null) ||
      (result.color === 'w') !== currentUserPlaysWhite
    ) return null;
    
    setGame(gameCopy);
    return gameCopy.fen();
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const fen = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });

    if (fen === null) return false;

    gameService.set(roomId, fen);
    return true;
  }

  return game === null || thisPlayer === null || otherPlayer === null ? null : (
    <div className='chessboard-wrapper'>
      <span className='player-name'>{otherPlayer}</span>
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        boardOrientation={currentUserPlaysWhite ? 'white' : 'black'}
      />
      <span className='player-name'>{thisPlayer}</span>
    </div>
  );
}
