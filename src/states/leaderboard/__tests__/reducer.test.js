import leaderboardReducer from '../slice';
import { describe, it, expect } from 'vitest';

describe('leaderboardReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given by setLeaderboard action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'leaderboard/setLeaderboard',
      payload: [
        {
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image.url/jpg'
          },
          score: 10
        }
      ],
    };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });
});
