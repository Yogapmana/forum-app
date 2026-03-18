import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LeaderboardItem from '../LeaderboardItem';

describe('LeaderboardItem component', () => {
  const user = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image.url/jpg',
  };

  it('should render user details correctly', () => {
    // arrange & action
    render(<LeaderboardItem user={user} score={150} rank={1} />);

    // assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  it('should render rank 2 badge properly', () => {
    // arrange & action
    render(<LeaderboardItem user={user} score={100} rank={2} />);

    // assert
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
