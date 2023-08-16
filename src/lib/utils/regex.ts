export const passwordElementRegex = {
  lowerCase: /[a-z]/,
  upperCase: /[A-Z]/,
  number: /[0-9]/,
  specialCharacter: /[^A-Za-z0-9]/,
  minLength: /.{8,}/,
};

export function regexElementSatisfied(value: string) {
  return Object.values(passwordElementRegex).filter(regex => regex.test(value))
    .length;
}
