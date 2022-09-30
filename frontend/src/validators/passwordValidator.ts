import { getLengthValidator } from "./lengthValidator";

export function passwordValidator (value: string) {
  return getLengthValidator(8, 64, 'Password')(value);
}
