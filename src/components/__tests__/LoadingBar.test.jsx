import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingBar from '../LoadingBar';

describe('LoadingBar component', () => {
  it('should not render when loading is false', () => {
    // arrange & action
    const { container } = render(<LoadingBar loading={false} />);

    // assert
    const loadingElement = container.querySelector('.bg-accent');
    expect(loadingElement).toBeNull();
  });

  it('should render when loading is true', () => {
    // arrange & action
    const { container } = render(<LoadingBar loading />);

    // assert
    const loadingElement = container.querySelector('.bg-accent');
    expect(loadingElement).toBeInTheDocument();
  });
});
