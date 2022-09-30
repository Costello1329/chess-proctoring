export function combineValidators (validators: ((values: string) => (string | null))[]) {
  return function (value: string) {
    for (let i = 0; i < validators.length; ++ i) {
      const res = validators[i](value);
      
      if (res !== null)
        return res;
    }

    return null;
  };
}
