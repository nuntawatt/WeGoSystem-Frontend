// apps/frontend/src/hooks/useAvailability.ts
import dayjs from 'dayjs';

export function useAvailability(days = 7, hours = 24) {
  const grid = Array.from({ length: days }, () => Array<boolean>(hours).fill(false));

  const toggleCell = (d: number, h: number) => {
    grid[d][h] = !grid[d][h];
  };

  const toRanges = () => {
    const ranges: { start: Date; end: Date }[] = [];
    for (let d = 0; d < days; d++) {
      let start: Date | null = null;
      for (let h = 0; h < hours; h++) {
        if (grid[d][h] && !start) start = dayjs().day(d).hour(h).minute(0).second(0).toDate();
        if ((!grid[d][h] || h === hours - 1) && start) {
          const end = dayjs().day(d).hour(grid[d][h] ? h + 1 : h).minute(0).second(0).toDate();
          ranges.push({ start, end });
          start = null;
        }
      }
    }
    return ranges;
  };

  return { grid, toggleCell, toRanges };
}
