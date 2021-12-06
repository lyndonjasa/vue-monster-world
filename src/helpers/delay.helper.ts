export const delayAction = (ms: number) => {
  return new Promise(res => setTimeout(res, ms));
}