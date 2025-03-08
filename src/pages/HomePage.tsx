import React from 'react';
import { useSocket } from '../hooks/useSocket';
import { useSocketEvent } from '../hooks/useSocketEvent';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateGame } from '../store/gameSlice';
import { IGamePayload } from '../interfaces';
import { RootState } from '../store';
import GameItem from '../components/GameItem';
import Nav from '../components/Nav';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL || 'http://localhost:8080';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const games = useSelector((state: RootState) => state.game.games);

  useSocket(SOCKET_SERVER_URL);

  useSocketEvent<IGamePayload>('game_update', (data) => {
    dispatch(addOrUpdateGame(data));
  });

  return (
    <>
    <Nav />
      <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Live Games</h1>
          <div className="grid gap-4">
              {Object.values(games).length === 0 && <li>Loading...</li>}
              {Object.values(games).map((g) => (
                  <GameItem key={g.game_id} game={g} />
              ))}
          </div>
      </div>
    </>
  );
};
