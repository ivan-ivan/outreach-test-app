export function calculateDaysBetween(date: number): number {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const differenceMs = Math.abs((new Date()).getTime() - date);
    return Math.round(differenceMs / ONE_DAY);
  }
  