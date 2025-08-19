// apps/frontend/src/tests/AvailabilityPicker.test.ts
import { describe, expect, it } from 'vitest';
import { useAvailability } from '../hooks/useAvailability';

describe('useAvailability', () => {
  it('creates ranges from grid', () => {
    const { toggleCell, toRanges } = useAvailability(1, 4);
    toggleCell(0, 1);
    toggleCell(0, 2);
    const ranges = toRanges();
    expect(ranges.length).toBe(1);
  });
});
