import { getLengthValidator } from "./lengthValidator";

export function usernameValidator (value: string) {
  return getLengthValidator(5, 25, 'Username')(value);
}
