export function hourAfter(h: number) {
  const d = new Date();
  d.setTime(d.getTime() + h * 60 * 60 * 1000);
  return d;
}
