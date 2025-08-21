// apps/frontend/src/tests/smoke.test.tsx
import { describe, it, expect } from 'vitest';

describe('smoke', () => {
  it('runs test env', () => {
    expect(1 + 1).toBe(2);
  });
});