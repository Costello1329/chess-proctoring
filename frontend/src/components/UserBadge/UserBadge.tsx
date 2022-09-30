import { useStore } from "@proscom/prostore-react";
import { USER_STORE } from "../../stores/stores";
import { UserStore } from "../../stores/UserStore";
import { Button } from "../Button/Button";
import './UserBadge.css';

export function UserBadge () {
  const [userStoreState, userStore] = useStore<UserStore>(USER_STORE);

  if (userStoreState.sessionId === null)
    return null;

  return (
    <div className='user-badge'>
      <h3>{userStoreState.username}</h3>
      <div onClick={async () => void(await userStore.logout())}></div>
      <Button
        appearance='secondary'
        type='button'
        text='logout'
        onClick={async () => void(await userStore.logout())}
      />
    </div>
  );
}
