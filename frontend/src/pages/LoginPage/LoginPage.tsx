import { useContextStore } from '@proscom/prostore-react';
import { UserStore } from '../../stores/UserStore';
import { USER_STORE } from '../../stores/stores';
import { Form } from '../../components/Form/Form';
import { usernameValidator } from '../../validators/usernameValidator';
import { passwordValidator } from '../../validators/passwordValidator';
import { BottomRedirectionLine } from '../BottomRedirectionLine/BottomRedirectionLine';
import { REGISTER_PAGE } from '../routes';

export function LoginPage () {
  const userStore = useContextStore<UserStore>(USER_STORE);

  return (
    <Form
      header='Login'
      name='login'
      submitText='Login'
      size='s'
      bottomChildren={<BottomRedirectionLine
        mainText='Do not have an account?'
        redirectText='Sign up'
        redirectPath={REGISTER_PAGE}
      />}
      inputs={[{
        type: 'text',
        label: 'Username',
        validator: usernameValidator
      }, {
        type: 'password',
        label: 'Password',
        validator: passwordValidator
      }]}
      onSubmit={
        async ([username, password]) =>
          void(await userStore.login(username as string, password as string))
      }
    />
  );
}
