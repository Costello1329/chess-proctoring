import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import md5 from "md5";
import { SESSION_ID_HEADER } from "./constants";
import { notificationService, NotificationType } from "./NotificationService";

const AUTHENTICATION_ENDPOINT: string = 'authenticate/';

interface AuthenticateReq {}

interface AuthenticateRes {
  username: string;
}

interface LoginReq {
  username: string;
  password_hash: string;
}

interface LoginRes {
  session_id: string;
}

interface LogoutReq {
  session_id: string;
}

interface LogoutRes {}

class AuthenticationService {
  async authenticate (sessionId: string) {
    return await axios.request<
      AuthenticateRes,
      AxiosResponse<AuthenticateRes, AuthenticateReq>,
      AuthenticateReq
    >({
      method: 'GET',
      baseURL: 'http://localhost:8000/',
      url: AUTHENTICATION_ENDPOINT,
      headers: { [SESSION_ID_HEADER]: sessionId }
    }).then(res => res.data.username).catch(err => {
      Cookies.remove(SESSION_ID_HEADER);
      notificationService.notify({
        type: NotificationType.ERROR,
        message: err
      });
    }) ?? null;
  }

  async login (username: string, password: string) {
    return await axios.request<
      LoginRes,
      AxiosResponse<LoginRes, LoginReq>,
      LoginReq
    >({
      method: 'POST',
      baseURL: 'http://localhost:8000/',
      url: AUTHENTICATION_ENDPOINT,
      data: {
        username,
        password_hash: md5(password)
      }
    }).then(res => res.data.session_id).catch(err => {
      notificationService.notify({
        type: NotificationType.ERROR,
        message: err
      });
    }) ?? null;
  }

  async logout (sessionId: string) {
    return await axios.request<
      LogoutRes,
      AxiosResponse<LogoutRes, LogoutReq>,
      LogoutReq
    >({
      method: 'DELETE',
      baseURL: 'http://localhost:8000/',
      url: AUTHENTICATION_ENDPOINT,
      headers: { [SESSION_ID_HEADER]: sessionId }
    }).then(() => true).catch(err => {
      notificationService.notify({
        type: NotificationType.ERROR,
        message: err
      });
    }) ?? false;
  }
}

export const authenticationService = new AuthenticationService();
