import { useContextStore } from '@proscom/prostore-react';
import { UserStore } from '../../stores/UserStore';
import { USER_STORE } from '../../stores/stores';
import { Form } from '../../components/Form/Form';
import { usernameValidator } from '../../validators/usernameValidator';
import { getValueValidator } from '../../validators/valueValidator';
import { passwordValidator } from '../../validators/passwordValidator';
import { registrationService } from '../../services/RegistrationService';
import { LOGIN_PAGE } from '../routes';
import { BottomRedirectionLine } from '../BottomRedirectionLine/BottomRedirectionLine';

export function RegisterPage () {
  const userStore = useContextStore<UserStore>(USER_STORE);

  return (
    <Form
      header='Register'
      name='register'
      submitText='Register'
      size='s'
      bottomChildren={<BottomRedirectionLine
        mainText='Already have an account?'
        redirectText='Sign in'
        redirectPath={LOGIN_PAGE}
      />}
      inputs={[{
        type: 'text',
        label: 'Username',
        validator: usernameValidator
      }, {
        type: 'password',
        label: 'Password',
        validator: passwordValidator
      }, {
        type: 'password',
        label: 'Confirmation'
      }]}
      validator={
        ([_, password, confirmation]: (string | boolean)[]) =>
          getValueValidator('Confirmation should match the password')([password as string, confirmation as string])
      }
      onSubmit={async ([username, password]) => {
        if (await registrationService.register(username as string, password as string))
          userStore.login(username as string, password as string);
      }}
    />
  );
}
