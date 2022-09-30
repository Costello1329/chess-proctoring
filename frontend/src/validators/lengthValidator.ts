export function getLengthValidator (min: number, max: number, name: string) {
  return function (value: string) {
    if (value.length < min)
      return `${name} should contain at least ${min} symbols`;
    else if (value.length > max)
      return `${name} should contain at most ${max} symbols`;
    
    return null;
  };
}
