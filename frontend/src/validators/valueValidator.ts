export function getValueValidator (message: string) {
  return function (values: string[]) {
    return (values.find(value => value !== values[0]) === undefined) ? null : message;
  };
}
