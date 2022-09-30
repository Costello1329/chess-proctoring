import axios, { AxiosResponse } from "axios";
import { stores, USER_STORE } from "../stores/stores";
import { SESSION_ID_HEADER } from "./constants";
import { notificationService, NotificationType } from "./NotificationService";

const GAME_ENDPOINT: string = 'game/';

interface GameGetReq {}

export interface GameGetRes {
  white_player: string;
  black_player: string;
  fen: string;
}

class GameService {
  async get (gameId: string) {
    const sessionId = stores[USER_STORE].state.sessionId;

    return sessionId === null ? null : await axios.request<
      GameGetRes,
      AxiosResponse<GameGetRes, GameGetReq>,
      GameGetReq
    >({
      method: 'GET',
      baseURL: 'http://localhost:8000/',
      url: GAME_ENDPOINT,
      headers: { [SESSION_ID_HEADER]: sessionId },
      params: { 'game_id': gameId }
    }).then(({ data }) => data).catch(err => {
      notificationService.notify({
        type: NotificationType.ERROR,
        message: err
      });
    }) ?? null;
  }
}

export const gameService = new GameService();
