import { UserStore } from "./UserStore";

export const USER_STORE = 'USER_STORE';

export const stores = {
  [USER_STORE]: new UserStore()
};
