export function isNum(value: string) {
  return /^[0-9]+$/.test(value);
}
export function maxLength(value: string) {
  return value.length < 5;
}
export function minLength(value: string) {
  return value.length > 2;
}