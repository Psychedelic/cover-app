import '@testing-library/jest-dom';
import {fireEvent} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {Pagination} from '@/components';
import {customRender, screen} from '@/testUtils';

describe('Pagination', () => {
  it('First page', () => {
    customRender(<Pagination lastPage={1} />);
    const input = screen.getByText((_, element) => element?.tagName.toLowerCase() === 'input');
    expect((input as HTMLInputElement).value).toBe('1');

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');
    expect(input).toHaveAttribute('disabled');
  });

  it('When navigate to another page', () => {
    customRender(<Pagination defaultPage={2} lastPage={2} />);
    const input = screen.getByText((_, element) => element?.tagName.toLowerCase() === 'input');
    expect((input as HTMLInputElement).value).toBe('2');

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');

    fireEvent.click(buttons[0]);
    expect((input as HTMLInputElement).value).toBe('1');
    expect(buttons[0]).toHaveAttribute('disabled');
    expect(buttons[1]).not.toHaveAttribute('disabled');

    fireEvent.click(buttons[1]);
    expect((input as HTMLInputElement).value).toBe('2');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');
  });

  it('When input', () => {
    customRender(<Pagination defaultPage={20} lastPage={21} />);
    const input = screen.getByText((_, element) => element?.tagName.toLowerCase() === 'input');
    expect((input as HTMLInputElement).value).toBe('20');

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).not.toHaveAttribute('disabled');

    fireEvent.change(input, {target: {value: '1'}});
    fireEvent.blur(input);
    expect((input as HTMLInputElement).value).toBe('1');
    expect(buttons[0]).toHaveAttribute('disabled');
    expect(buttons[1]).not.toHaveAttribute('disabled');

    fireEvent.change(input, {target: {value: '230'}});
    fireEvent.blur(input);
    expect((input as HTMLInputElement).value).toBe('21');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');

    fireEvent.change(input, {target: {value: '-2'}});
    fireEvent.blur(input);
    expect((input as HTMLInputElement).value).toBe('21');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');

    fireEvent.change(input, {target: {value: 'hello'}});
    fireEvent.blur(input);
    expect((input as HTMLInputElement).value).toBe('21');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');

    fireEvent.change(input, {target: {value: '0'}});
    fireEvent.blur(input);
    expect((input as HTMLInputElement).value).toBe('21');
    expect(buttons[0]).not.toHaveAttribute('disabled');
    expect(buttons[1]).toHaveAttribute('disabled');
  });
});
