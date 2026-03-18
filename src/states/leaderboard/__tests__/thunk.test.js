import { describe, beforeEach, it, vi, expect } from 'vitest';
import * as api from '../../../utils/api';
import { asyncGetLeaderboard } from '../slice';

vi.mock('../../../utils/api');

const fakeLeaderboardResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image.url/jpg'
    },
    score: 10
  }
];

describe('asyncGetLeaderboard thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getLeaderboard.mockResolvedValue(fakeLeaderboardResponse);
    const dispatch = vi.fn();

    // action
    const action = await asyncGetLeaderboard()(dispatch, () => ({}), {});

    // assert
    expect(action.payload).toEqual(fakeLeaderboardResponse);
    expect(api.getLeaderboard).toHaveBeenCalled();
  });

  it('should not dispatch action and throw error when data fetching failed', async () => {
    // arrange
    api.getLeaderboard.mockRejectedValue(new Error('Fetching failed'));
    const dispatch = vi.fn();

    // action
    const action = await asyncGetLeaderboard()(dispatch, () => ({}), {});

    // assert
    expect(action.error.message).toBe('Fetching failed');
  });
});
