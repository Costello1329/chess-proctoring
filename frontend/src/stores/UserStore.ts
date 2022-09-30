import { BehaviorStore } from "@proscom/prostore";
import Cookies from "js-cookie";
import { authenticationService } from "../services/AuthenticationService";

export const SESSION_ID_COOKIE: string = 'session_id';

export type IUserStoreState = {
  loading: boolean;
  sessionId: string | null;
  username: string | null;
}

export class UserStore extends BehaviorStore<IUserStoreState> {
  constructor () {
    super({
      loading: false,
      sessionId: Cookies.get(SESSION_ID_COOKIE) ?? null,
      username: null,
    });

    this.authenticate();
  }

  private authenticate () {
    if (this.state.loading || this.state.sessionId === null)
      return;
    
    this.setState({ loading: true });
    authenticationService.authenticate(this.state.sessionId).then(username => {
      if (username !== null)
        this.setState({ loading: false, username });
      else
        this.setState({ loading: false, sessionId: null });
    });
  }

  login (username: string, password: string) {
    if (this.state.loading)
      return;

    this.setState({ loading: true });
    authenticationService.login(username, password).then(sessionId => {
      if (sessionId !== null) {
        Cookies.set(SESSION_ID_COOKIE, sessionId);
        this.setState({ loading: false, sessionId, username });
      }

      else
        this.setState({ loading: false });
    })
  }

  logout () {
    if (this.state.loading || this.state.sessionId === null)
      return;

    this.setState({ loading: true });
    authenticationService.logout(this.state.sessionId).then(loggedOut => {
      if (loggedOut) {
        Cookies.remove(SESSION_ID_COOKIE);
        this.setState({ loading: false, sessionId: null, username: null });
      }

      else
        this.setState({ loading: false });
    });
  }
}
