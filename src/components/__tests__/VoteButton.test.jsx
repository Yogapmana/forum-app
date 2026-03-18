import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe, it, expect, vi,
} from 'vitest';
import VoteButton from '../VoteButton';

describe('VoteButton component', () => {
  it('should render correct count', () => {
    // arrange & action
    render(<VoteButton type="up" count={10} active={false} onClick={() => {}} disabled={false} />);

    // assert
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should call onClick when clicked', async () => {
    // arrange
    const onClickMock = vi.fn();
    render(<VoteButton type="up" count={10} active={false} onClick={onClickMock} disabled={false} />);

    // action
    const button = screen.getByRole('button');
    await userEvent.click(button);

    // assert
    expect(onClickMock).toHaveBeenCalled();
  });
});
