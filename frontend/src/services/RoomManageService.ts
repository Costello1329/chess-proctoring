import axios, { AxiosResponse } from "axios";
import { stores, USER_STORE } from "../stores/stores";
import { SESSION_ID_HEADER } from "./constants";
import { notificationService, NotificationType } from "./NotificationService";

const ROOM_MANAGE_ENDPOINT: string = 'manage_rooms/';

export type Relation = 'creator' | 'participant';
export type Result = 'none' | 'win' | 'lose' | 'draw';

export interface Room {
  room_id: string;
  creator: string;
  white_player: string;
  black_player: string;
  created_at: string;
  result: Result;
}

interface RoomManageGetReq {
  relation: Relation
}

interface RoomManageGetRes {
  rooms: Room[]
}

interface RoomManagePostReq {
  white_player_username: string;
  black_player_username: string;
}

interface RoomManagePostRes {
  room_id: string
}

class RoomManageService {
  async list (relation: Relation) {
    const sessionId = stores[USER_STORE].state.sessionId;

    return sessionId === null ? null : await axios.request<
      RoomManageGetRes,
      AxiosResponse<RoomManageGetRes, RoomManageGetReq>,
      RoomManageGetReq
    >({
      method: 'GET',
      baseURL: 'http://localhost:8000/',
      url: ROOM_MANAGE_ENDPOINT,
      headers: { [SESSION_ID_HEADER]: sessionId },
      params: { relation }
    }).then(({ data }) => data.rooms).catch(err => {
      notificationService.notify({
        type: NotificationType.ERROR,
        message: err
      });
    }) ?? null;
  }

  async create (firstUsername: string, secondUsername: string) {
    const sessionId = stores[USER_STORE].state.sessionId;

    return sessionId === null ? null : await axios.request<
      RoomManagePostRes,
      AxiosResponse<RoomManagePostRes, RoomManagePostReq>,
      RoomManagePostReq
    >({
      method: 'POST',
      baseURL: 'http://localhost:8000/',
      url: ROOM_MANAGE_ENDPOINT,
      headers: { [SESSION_ID_HEADER]: sessionId },
      data: {
        white_player_username: firstUsername,
        black_player_username: secondUsername
      }
    }).then(({ data }) => data.room_id).catch(err => {
      notificationService.notify({
        type: NotificationType.ERROR,
        message: err
      });
    }) ?? null;
  }
}

export const roomManageService = new RoomManageService();
