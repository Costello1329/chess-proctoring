import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GameGetRes, gameService } from '../../services/GameService';
import { Chessboard } from 'react-chessboard';
import { Chess, PartialMove } from 'chess.ts'
import * as lodash from 'lodash';
import './GamePage.css';

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
  const { roomId } = useParams();
  const [pulse, setPulse] = useState<boolean>(false);
  const [gameData, setGameData] = useState<GameGetRes | null>(null);

  useEffect(() => {
    if (pulse) return;

    setPulse(true);
    const intervalId = setIntervalImmediately(
      async () => setGameData(await gameService.get(roomId!)),
      UPDATE_TIME
    );

    return () => clearInterval(intervalId);
  }, [gameData?.fen, gameData?.white_player, gameData?.black_player, pulse, roomId]);

  const [game, setGame] = useState(new Chess());

  function makeAMove(move: string | PartialMove) {
    const gameCopy = lodash.cloneDeep(game);
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result;
  }

  // function makeRandomMove() {
  //   const possibleMoves = game.moves();
  //   if (game.gameOver() || game.inDraw() || possibleMoves.length === 0)
  //     return;
  //   const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  //   makeAMove(possibleMoves[randomIndex]);
  // }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });

    if (move === null) return false;
    // setTimeout(makeRandomMove, 200);
    return true;
  }

  return (
    <div className='chessboard-wrapper'>
      <span className='player-name'>{gameData?.black_player}</span>
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      <span className='player-name'>{gameData?.white_player}</span>
    </div>
  );
}
