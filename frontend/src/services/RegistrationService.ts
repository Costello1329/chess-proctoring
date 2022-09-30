import axios, { AxiosResponse } from "axios";
import md5 from "md5";
import { notificationService, NotificationType } from "./NotificationService";

const REGISTER_ENDPOINT: string = 'register/';

interface RegisterReq {
  username: string;
  password_hash: string;
}

interface RegisterRes {}

class RegistrationService {
  async register (username: string, password: string) {
    return await axios.request<
      RegisterRes,
      AxiosResponse<RegisterRes, RegisterReq>,
      RegisterReq
    >({
      method: 'POST',
      baseURL: 'http://localhost:8000/',
      url: REGISTER_ENDPOINT,
      data: {
        username,
        password_hash: md5(password)
      }
    }).then(_ => true).catch(err => {
      notificationService.notify({
        type: NotificationType.ERROR,
        message: err
      });
    }) ?? false;
  }
}

export const registrationService = new RegistrationService();
