// apps/frontend/src/tests/TagSelector.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import TagSelector from '../components/TagSelector';

test('toggles tags', () => {
  const onChange = vi.fn();
  render(<TagSelector available={['a', 'b']} value={[]} onChange={onChange} />);
  fireEvent.click(screen.getByText('#a'));
  expect(onChange).toHaveBeenCalledWith(['a']);
});
