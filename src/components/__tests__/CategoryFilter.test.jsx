import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe, it, expect, vi,
} from 'vitest';
import CategoryFilter from '../CategoryFilter';

describe('CategoryFilter component', () => {
  const categories = ['react', 'redux', 'vitest'];

  it('should render all categories properly', () => {
    // arrange
    render(<CategoryFilter categories={categories} selected="" onSelect={() => {}} />);

    // assert
    expect(screen.getByText('Semua')).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#redux')).toBeInTheDocument();
    expect(screen.getByText('#vitest')).toBeInTheDocument();
  });

  it('should call onSelect function when a category is clicked', async () => {
    // arrange
    const onSelectMock = vi.fn();
    render(<CategoryFilter categories={categories} selected="" onSelect={onSelectMock} />);

    // action
    const reactCategoryButton = screen.getByText('#react');
    await userEvent.click(reactCategoryButton);

    // assert
    expect(onSelectMock).toHaveBeenCalledWith('react');
  });
});
