import '@testing-library/jest-dom';
import {fireEvent} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {SearchBar} from '@/components';
import {customRender, screen} from '@/testUtils';

describe('SearchBar', () => {
  it('Default', () => {
    customRender(<SearchBar />);
    const icons = screen.getAllByText((_, element) => element?.tagName.toLowerCase() === 'svg');
    expect(icons).toHaveLength(1);
    expect(icons[0]).toHaveAttribute('data-icon', 'magnifying-glass');
  });

  it('When input', () => {
    customRender(<SearchBar />);

    const input = screen.getByText((_, element) => element?.tagName.toLowerCase() === 'input');
    fireEvent.input(input, {target: {value: 'hello'}});
    expect((input as HTMLInputElement).value).toBe('hello');

    let icons = screen.getAllByText((_, element) => element?.tagName.toLowerCase() === 'svg');
    expect(icons).toHaveLength(2);
    expect(icons[1]).toHaveAttribute('data-icon', 'xmark');

    fireEvent.input(input, {target: {value: ''}});
    expect((input as HTMLInputElement).value).toBe('');

    icons = screen.getAllByText((_, element) => element?.tagName.toLowerCase() === 'svg');
    expect(icons).toHaveLength(1);
    expect(icons[0]).toHaveAttribute('data-icon', 'magnifying-glass');
  });

  it('When delete value', () => {
    customRender(<SearchBar />);

    const input = screen.getByText((_, element) => element?.tagName.toLowerCase() === 'input');
    fireEvent.input(input, {target: {value: 'hello'}});
    expect((input as HTMLInputElement).value).toBe('hello');

    const deleteButton = screen.getByRole('button');

    fireEvent.click(deleteButton);
    expect((input as HTMLInputElement).value).toBe('');

    const icons = screen.getAllByText((_, element) => element?.tagName.toLowerCase() === 'svg');
    expect(icons).toHaveLength(1);
  });
});
