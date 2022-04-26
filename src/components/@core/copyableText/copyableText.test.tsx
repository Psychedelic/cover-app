import '@testing-library/jest-dom';
import {describe, expect, it} from 'vitest';

import {Core} from '@/components';
import {customRender, fireEvent, screen, userEvent} from '@/testUtils';

describe('Core.CopyableText', () => {
  it('Default', () => {
    customRender(<Core.CopyableText>{'hello'}</Core.CopyableText>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.queryByText((_, element) => element?.tagName.toLowerCase() === 'svg')).not.toBeInTheDocument();
  });

  it('When hovered', () => {
    customRender(<Core.CopyableText>{'hello'}</Core.CopyableText>);
    fireEvent.mouseEnter(screen.getByText('hello'));
    expect(screen.getByText((_, element) => element?.tagName.toLowerCase() === 'svg')).toHaveAttribute(
      'data-icon',
      'copy'
    );
  });

  it('When clicked', () => {
    userEvent.setup();
    customRender(<Core.CopyableText>{'hello'}</Core.CopyableText>);
    fireEvent.click(screen.getByText('hello'));

    const icon = screen.getByText((_, element) => element?.tagName.toLowerCase() === 'svg');
    expect(icon).toHaveAttribute('data-icon', 'check');
  });
});
