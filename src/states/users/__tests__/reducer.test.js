import { describe, it, expect } from 'vitest';
import usersReducer from '../slice';

describe('usersReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the users when given by setUsers action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'users/setUsers',
      payload: [
        {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image.url/jpg',
        },
      ],
    };

    // action
    const nextState = usersReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });
});
