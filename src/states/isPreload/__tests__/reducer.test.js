import { describe, it, expect } from 'vitest';
import isPreloadReducer from '../slice';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the boolean when given by setIsPreload action', () => {
    // arrange
    const initialState = true;
    const action = {
      type: 'isPreload/setIsPreload',
      payload: false,
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });
});
