// apps/frontend/src/tests/smoke.test.tsx
import { render } from '@testing-library/react';
import Explore from '../pages/Explore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

test('renders explore without crash', () => {
  const qc = new QueryClient();
  render(
    <QueryClientProvider client={qc}>
      <Explore />
    </QueryClientProvider>
  );
});
