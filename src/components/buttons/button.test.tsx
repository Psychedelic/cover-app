import '@testing-library/jest-dom';
import {describe, expect, it} from 'vitest';

import {customRender, fireEvent, screen} from '@/testUtils';

import {Button} from './button';

describe('Button', () => {
  it('Default', () => {
    customRender(<Button />);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
  it('With children', () => {
    customRender(
      <Button>
        <span>{'children'}</span>
      </Button>
    );
    expect(screen.getByRole('button')).toContainHTML('<span>children</span>');
  });
  it('Handler onClick event', () => {
    let count = 0;
    const onClick = () => (count += 1);
    customRender(<Button onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(count).toEqual(1);
  });
});
